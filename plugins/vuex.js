import store from "../store/index.js";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      store
    }
  }
})