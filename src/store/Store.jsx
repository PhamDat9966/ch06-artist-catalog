import { create } from 'zustand';

const defaultState = {
    /* Các trạng thái kết nối - lấy csdl từ backend */
    tasks: null,
    loading: false,
    error: null,

    /* Các state phục vụ tìm kiếm - sắp xếp */

    strSearch: "",
    searchField: "name",   // thêm mới: để store tự chủ, không cần truyền qua tham số hàm

};

const Store = create((set, get) => ({
    ...defaultState,

    // Action giao tiếp với fetch để lấy data
    setTasks: (data) => set({ tasks: data }),
    setLoading: (value) => set({ loading: value }),
    setError: (value) => set({ error: value }),

    // Actions cho search / sort / form
    setStrSearch: (value) => set({ strSearch: value }),
    setSearchField: (value) => set({ searchField: value }),

    reset: () => set(defaultState),     // Reset về trạng thái mặc định
}));

export default Store;