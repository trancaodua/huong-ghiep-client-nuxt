export default defineNuxtRouteMiddleware((to, from) => {
  const { $store } = useNuxtApp();
  
  if (!$store.getters['isAuthenticated']) {
    return navigateTo("/login");
  }
});
