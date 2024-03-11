export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    token: null,
    role: [],
  }),
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
    isAdmin() {
      return !!this.token && this.role.includes("admin");
    },
  },
});
