<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img
          src="https://loking23.github.io/TheF2E-TaiwanGoGo/img/Logo-desktop.c217be0c.svg"
          alt=""
      /></router-link>

      <div>
        <ul class="navbar-nav mb-2">
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
@media (max-width: 900px) {
  .navbar-nav {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    align-items: center;
  }
  .nav-item {
    margin: 2px;
  }
}
</style>