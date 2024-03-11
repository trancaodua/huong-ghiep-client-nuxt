<template>
  <header>
    <!-- <base-spinner v-if="isLoading"></base-spinner> -->
    <div class="navbar">
      <div class="logo">
        <NuxtLink to="/"><img src="@/assets/logo.jpg"></NuxtLink>
      </div>
      <div class="search-contianer">
        <form>
          <label for="search-input"><i class="fas fa-search"></i></label>
          <input name="search-input" id="search-input" type="text">
        </form>
      </div>
      <ul v-if="isAdmin" class="links">
        <li>
          <NuxtLink class="link" to="/">Admin</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Create Profile</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Config Major</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Config Country</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Admin Message</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Mentor Message</NuxtLink>
        </li>
      </ul>
      <ul v-else class="links">
        <li>
          <NuxtLink class="link" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink class="link" to="/">Create Profile</NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <NuxtLink class="link" to="/">My Profile</NuxtLink>
        </li>
        <li v-else>
          <NuxtLink class="link" to="/">Register</NuxtLink>
        </li>
      </ul>
      <button @click="logout" v-if="isLoggedIn" class="action_btn"><i
          class="fa-solid fa-right-to-bracket"></i>Logout</button>
      <NuxtLink v-else class="action_btn" to="/login"><i class="fa-solid fa-right-to-bracket"></i>Login</NuxtLink>
      <div class="toggle_btn" @click="toggleOpenMobileNav">
        <i :class="[isOpenMobileNav ? 'fa-solid fa-xmark' : 'fa-solid fa-bars']"></i>
      </div>
    </div>

    <transition name="dropdown_menu">
      <div class="dropdown_menu" v-if="isOpenMobileNav">
        <div class="dropdown_toggle_btn" @click="toggleOpenMobileNav">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div v-if="isAdmin">
          <div class="logo">
            <NuxtLink to="/"><img src="@/assets/logo.jpg"></NuxtLink>
          </div>
          <li>
            <NuxtLink class="link" to="/">Admin</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Create Profile</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Config Major</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Config Country</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Admin Message</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Mentor Message</NuxtLink>
          </li>
        </div>
        <div v-else>
          <div class="logo">
            <NuxtLink to="/"><img src="@/assets/logo.jpg"></NuxtLink>
          </div>
          <li>
            <NuxtLink class="link" to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/">Create Profile</NuxtLink>
          </li>
          <li v-if="isLoggedIn">
            <NuxtLink class="link" to="/">My Profile</NuxtLink>
          </li>
          <li v-else>
            <NuxtLink class="link" to="/">Register</NuxtLink>
          </li>
        </div>
        <li>
          <button class="link" @click="logout" v-if="isLoggedIn">Logout</button>
          <NuxtLink v-else class="link" to="/login">Login</NuxtLink>
        </li>
      </div>
    </transition>
  </header>
</template>

<script>
import useLogout from '@/hooks/logout.js';

export default {
  setup() {
    const isOpenMobileNav = ref(false);
    const isLoading = ref(false);
    const route = useRoute();
    //const router = useRouter();
    const store = useNuxtApp().$store;
    const [logoutHook] = useLogout();

    function toggleOpenMobileNav() {
      isOpenMobileNav.value = !isOpenMobileNav.value;
    }

    const logout = async () => {
      try {
        await logoutHook();
      }
      finally {
        isLoading.value = false;
      }
    }


    const isLoggedIn = computed(() => store.getters['isAuthenticated']);

    const isAdmin = computed(() => store.getters['isAdmin']);

    watch(route, () => {
      console.log('Wa');
      isOpenMobileNav.value = false;
    })


    return {
      isOpenMobileNav,
      toggleOpenMobileNav,
      isLoggedIn,
      logout,
      isLoading,
      isAdmin
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

a,
button {
  text-decoration: none;
  color: #0A1229;
  font-weight: 500;
  font-size: 1rem;
  font-family: "Rubik", sans-serif;
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.link:hover {
  color: #1F9F96;
}

/* HEADER */
header {
  position: relative;
  padding: 0.2rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.navbar {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  height: 60px;
}

.logo a {
  height: 100%;
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo img {
  height: 100%;
  transition: 0.5s ease all;
}

.navbar .links {
  display: flex;
  gap: 2rem;
  margin-right: 2rem;
}

.links li {
  width: max-content;
}

.navbar .toggle_btn {
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
}

.navbar .toggle_btn i {
  color: #1F9F96;
}

.action_btn {
  background-color: #1F9F96;
  color: #fff;
  width: 10rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
}

/* DROP MENU */
.dropdown_menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0.5px 0 0.5rem #888888;
  padding-top: 2rem;
}

.dropdown_menu-enter-from,
.dropdown_menu-leave-to {
  transform: translateX(-100%);
}

.dropdown_menu-enter-active {
  transition: 0.8s ease all;
}

.dropdown_menu-leave-active {
  transition: 0.8s ease all;
}

.dropdown_menu-enter-to,
.dropdown_menu-leave-from {
  transform: translateX(0);
}

.dropdown_menu li {
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #ececec;
}

.dropdown_menu .action_btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* RESPONSIVE DESIGN */
@media (max-width: 992px) {

  .navbar .links,
  .navbar .action_btn {
    display: none;
  }

  .navbar .toggle_btn {
    display: block;
  }

}

section#hero {
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
}

#hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.dropdown_toggle_btn {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  color: #1F9F96;
  font-size: 1.5rem;
  cursor: pointer;
}

.search-contianer {
  width: 100%;
  padding: 2rem;
  position: relative;
}

.search-contianer form {
  width: 100%;
}

.search-contianer label {
  position: absolute;
}

.search-contianer input {
  width: 100%;
  padding: 0.5rem;
}
</style>