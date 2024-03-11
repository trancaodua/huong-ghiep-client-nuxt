
export const useProfileStore = defineStore("ProfileStore", {
  state: () => ({
    profiles: [],
    currentPage: 1,
    limit: 2,
    pages: 1,
    query: null,
  }),
  // getters:{
  //   setCurrentPage(page){
  //     this= currentPage = page;
  //   },
  // },
  actions: {
    setCurrentPage(page){
      this.currentPage = page;
    },
    async get(payload) {
      let url = `/api/profile/get?page=${this.currentPage}&limit=${this.limit}`;
      let queries = this.query;
      if (queries) {
        url += `&${queries}`;
      }

      if (payload && payload.isAdmin) {
        url += `&isAdmin=true`;
      }

      const config = useRuntimeConfig();

      const data = await $fetch(url, { baseURL: config.public.baseURL });
      console.log(data.country[0]);
      data.country.forEach((country) => this.profiles.push(country));
      
      this.pages = data.pages;
    },
  },
});
