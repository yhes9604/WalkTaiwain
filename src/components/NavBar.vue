<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          src="https://loking23.github.io/TheF2E-TaiwanGoGo/img/Logo-desktop.c217be0c.svg"
          alt=""
      /></router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria
        dev-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/scenic-spots"
              >探索景點</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/activity">節慶活動</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/restaurants"
              >品嚐美食</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  setup() {},
};
</script>
<style scoped>
</style>