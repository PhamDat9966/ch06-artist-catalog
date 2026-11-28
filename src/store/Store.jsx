import { create } from 'zustand';
import * as configs from './../constands/Config';
import axios from 'axios';

const defaultState = {

    /* Các trạng thái kết nối - lấy csdl từ backend */
    dataStore:          null,
    loading:            false,
    error:              null,
    loadingComplete:    false,
    artistsTotal:   0,
    artistsPage:    1,
    artistsLimit:   4,

    /* Chi tiết một ca sĩ */
    artist:         null,
    artistLoading:  false,
    artistError:    null,
    genresArtist:   [],

    /* Danh sách album của 1 nghệ sĩ */
    albumsArtist:  [],
    albumsLoading: false,
    albumsError:   null,
    albumsTotal:   0,
    albumsPage:    1,
    albumsLimit:   4,

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

    setAlbumsPage: (value) => set({ albumsPage: value }),
    

    // Action AxiosStore: chuyển toàn bộ logic gọi API từ useTasks.jsx vào đây
    AxiosStore: async () => {
        set({ loading: true, error: null });

        // get() luôn trả về state MỚI NHẤT tại thời điểm gọi, kể cả sau await
        const { strSearch, searchField, page, limit, artistsPage, artistsLimit } = get();

        /* chuyển artistsLimit,artistsPage cho giá trị mặc định của pagination là limit và page  */
        // set({limit:artistsLimit});
        // set({page:artistsPage})

        let params = {
            limit:        limit,
            offset:       (page - 1) * limit
        }

        console.log("params:",params,"page:",page);

        // chỉ thêm tham số tìm kiếm khi có từ khóa
        if (strSearch !== "" && strSearch !== null) {
            params.search_value = strSearch;
            params.search_field = searchField;
        }

        //Chuyển params thành chuỗi yêu cầu queryString để đặt phía sau url:
        const queryString = new URLSearchParams(params).toString();

        const url = configs.BASE_URL + `artists` + `?`+ `${queryString}`;

        try {
            const res = await axios.get(url);
            const data = await res.data;
            console.log("axiosStore:",data);

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
            // set({ albumsArtis: json.data.albums ?? json });
            set({ loadingComplete: true });
            set({ genresArtist: json.data.genres });

        } catch (err) {
            const message = err.response
                ? `${err.response.status}`   // server trả 4xx/5xx
                : err.message;     
                set({artistError: message});              // lỗi mạng, timeout...
                console.log("err Massage:",message);
            set({ artistError: message });
        } finally {
            set({ artistLoading: false });
        }
    },

    AxiosArtistAlbums: async (id) => {
        const { albumsPage, albumsLimit, limit, page } = get();
        set({ albumsLoading: true, albumsError: null });

        set({limit:albumsLimit});
        set({page:albumsPage})

        try {
            const res = await axios.get(configs.BASE_URL + `artists/${id}/albums`, {
                params: {
                    limit:  limit,
                    offset: (page - 1) * limit,
                },
            });
            const json = res.data;
            set({
                albumsArtist: json.data ?? [],
                albumsTotal:  json.meta?.total ?? 0,
            });
        } catch (err) {
            set({ albumsError: err.response ? `${err.response.status}` : err.message });
        } finally {
            set({ albumsLoading: false });
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