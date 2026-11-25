import { create } from 'zustand';
import * as configs from './../constands/Config';
import axios from 'axios';

const defaultState = {

    /* Các trạng thái kết nối - lấy csdl từ backend */
    dataStore:          null,
    loading:            false,
    error:              null,
    loadingComplete:    false,

    /* Chi tiết một ca sĩ */
    artist:         null,
    albumsArtis:    null,
    artistLoading:  false,
    artistError:    null,
    genresArtist:   [],

    /* Chi tiết một album */
    album:              null,
    tracks:             null,
    albumLoading:       false,
    albumError:         null,
    
    /* Các state phục vụ tìm kiếm - sắp xếp */
    strSearch: "",
    searchField: "name",   // thêm mới: để store tự chủ, không cần truyền qua tham số hàm

    /* Phân trang */
    page: 1,
    limit: 4,

};

const Store = create((set, get) => ({
    ...defaultState,

    // Action giao tiếp với fetch để lấy data
    setDataStore: (data) => set({ dataStore: data }), 
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),

    // Actions cho search / sort / form
    //Thêm action, đồng thời đưa page về 1 khi tìm kiếm mới:
    setStrSearch: (value) => set({ strSearch: value, page: 1 }),
    setSearchField: (value) => set({ searchField: value, page: 1 }),
    setPage: (value) => set({ page: value }),

    // Action fetch: chuyển toàn bộ logic gọi API từ useTasks.jsx vào đây
    fetchStore: async () => {
        set({ loading: true, error: null });

        // get() luôn trả về state MỚI NHẤT tại thời điểm gọi, kể cả sau await
        const { strSearch, searchField, page, limit } = get();

        let params = {
            limit:        4,
            offset:       (page - 1) * limit
        }

        console.log("params:",params,"page:",page);

        // chỉ thêm tham số tìm kiếm khi có từ khóa
        if (strSearch !== "" && strSearch !== null) {
            params.search_value = strSearch;
            params.search_field = searchField;

            // params.search_value = encodeURIComponent(strSearch);
            // params.search_field = encodeURIComponent(searchField);
            /*
                Khi dùng encodeURIComponent("Tom & Jerry"), chuỗi đổi thành "Tom%20%26%20Jerry"
            */
        }

        //Chuyển params thành chuỗi yêu cầu queryString để đặt phía sau url:
        const queryString = new URLSearchParams(params).toString();

        const url = configs.BASE_URL + `artists` + `?`+ `${queryString}`;

        /* Cách cũ:

            let url = configs.BASE_URL + `artists?`;
            if(strSearch !=="" && strSearch !== null){
                    url = configs.BASE_URL + `artists` + `?` +
                                `search_value=${encodeURIComponent(strSearch)}&` +
                                `search_field=${encodeURIComponent(searchField)}&` +
                                `limit=8&`+
                                `offset=0`;
            }
        */
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log('Data:',data);
            set({ dataStore: data });
            set({ loadingComplete:true});
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    /* Lấy MỘT ca sĩ theo id (id truyền từ component) */
    fetchArtist: async (id) => {

        set({ artist: null, artistLoading: true, artistError: null, loadingComplete: false });
        const url = configs.BASE_URL + `artists/${id}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Lỗi ${res.status}`);
            const json = await res.json();
            // console.log(json);
            set({ artist: json.data ?? json });
            set({ albumsArtis: json.data.albums ?? json });
            set({ loadingComplete:true});
            set({ genresArtist:json.data.genres});
        } catch (err) {
            set({ artistError: err.message });
        } finally {
            set({ artistLoading: false });
        }
    },

    /* Lấy MỘT ca sĩ theo id với Axios (id truyền từ component) */
    AxiosArtist: async (id) => {
        set({ artist: null, artistLoading: true, artistError: null, loadingComplete: false });
        const url = configs.BASE_URL + `artists/${id}`;

        try {
            const res = await axios.get(url);
            const json = res.data; // tương đương json trong bản fetch

            set({ artist: json.data ?? json });
            set({ albumsArtis: json.data.albums ?? json });
            set({ loadingComplete: true });
            set({ genresArtist: json.data.genres });
        } catch (err) {
            const message = err.response
                ? `Lỗi ${err.response.status}`   // server trả 4xx/5xx
                : err.message;                   // lỗi mạng, timeout...
            set({ artistError: message });
        } finally {
            set({ artistLoading: false });
        }
    },

    // Lấy MỘT album theo id (id truyền từ component)
    fetchAlbum: async (id) => {
        set({ artist: null, artistLoading: true, artistError: null, loadingComplete: false});

        const url = configs.BASE_URL + `album/${id}`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Lỗi ${res.status}`);

            const json = await res.json();

            set({ album: json.data ?? json });
            set({ tracks: json.data.tracks ?? json });
            set({ loadingComplete:true});

        } catch (err) {
            set({ albumError: err.message });
        } finally {
            set({ albumLoading: false });
        }
    },

    reset: () => set(defaultState),     // Reset về trạng thái mặc định
}));

export default Store;