<script>
import NavBar from "./components/NavBar.vue";
import index from "./views/index.vue";
import Footer from "./components/Footer.vue";
export default {
  components: { NavBar, index, Footer },
  setup() {},
};
</script>

<template>
  <NavBar />
  <router-view :key="$route.fullPath"></router-view>
  <Footer />
</template>

<style scoped>
</style>
