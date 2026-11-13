import { create } from 'zustand';
import * as configs from './../constands/Config';

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

    /* Chi tiết một album */
    album:              null,
    tracks:             null,
    albumLoading:       false,
    albumError:         null,
    
    /* Các state phục vụ tìm kiếm - sắp xếp */
    strSearch: "",
    searchField: "name",   // thêm mới: để store tự chủ, không cần truyền qua tham số hàm

};

const Store = create((set, get) => ({
    ...defaultState,

    // Action giao tiếp với fetch để lấy data
    setDataStore: (data) => set({ dataStore: data }), 
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),

    // Actions cho search / sort / form
    setStrSearch: (value) => set({ strSearch: value }),
    setSearchField: (value) => set({ searchField: value }),

    // Action fetch: chuyển toàn bộ logic gọi API từ useTasks.jsx vào đây
    fetchStore: async () => {
        // get() luôn trả về state MỚI NHẤT tại thời điểm gọi, kể cả sau await
        const { strSearch, searchField } = get();

        set({ loading: true, error: null });

        let url = configs.BASE_URL + `artists?`;
            // `search=${encodeURIComponent(strSearch)}&` +
            // `search_field=${encodeURIComponent(searchField)}&` +
            // `order_by=${encodeURIComponent(orderBy)}&` +
            // `order_dir=${encodeURIComponent(orderDir)}`;

        if(strSearch !=="" && strSearch !== null){
            url = configs.BASE_URL + `artists?` +
                        `search_value=${encodeURIComponent(strSearch)}&` +
                        `search_field=${encodeURIComponent(searchField)}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            set({ dataStore: data });
            set({ loadingComplete:true});
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // Lấy MỘT ca sĩ theo id (id truyền từ component)
    fetchArtist: async (id) => {
        set({ artist: null, artistLoading: true, artistError: null, loadingComplete: false });
        const url = configs.BASE_URL + `artists/${id}`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Lỗi ${res.status}`);
            const json = await res.json();

            set({ artist: json.data ?? json });
            set({ albumsArtis: json.data.albums ?? json });
            set({ loadingComplete:true});
        } catch (err) {
            set({ artistError: err.message });
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