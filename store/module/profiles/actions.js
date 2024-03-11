export default {
  async create(context, payload) {
    console.log("dua");
    console.log(context);
    try {
      const res = await this.$axios.$post("/api/profile/create", {
        ...payload,
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async get(context, payload) {
    let url = `/api/profile/get?page=${context.getters["currentPage"]}&limit=${context.getters["limit"]}`;
    let query = context.getters["query"];
    if (query) {
      url += `&${query}`;
    }

    if (payload && payload.isAdmin) {
      url += `&isAdmin=true`;
    }
    try {
      const config = useRuntimeConfig();
      const data = await $fetch(url, { baseURL: config.public.baseURL });
      // context.commit("setProfile", data.country);
      // context.commit("setPages", data.pages);
    } catch (error) {
      throw new Error(error);
    }
  },
};
