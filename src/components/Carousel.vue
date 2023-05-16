<script>
</script>

<template>
  <div class="position">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1583395145517-1e3177037600?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            class="d-block carousel-img"
            alt="..."
          />
          <p class="carousel-caption">台東</p>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1630244024081-dc4039254a46?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            class="d-block carousel-img"
            alt="..."
          />
          <p class="carousel-caption">宜蘭</p>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1635937998083-dde9f462d8ec?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            class="d-block carousel-img"
            alt="..."
          />
          <p class="carousel-caption">蘭嶼</p>
        </div>
        <div class="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1571474004502-c1def214ac6d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80"
            class="d-block carousel-img"
            alt="..."
          />
          <p class="carousel-caption">新北</p>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>


<style scoped>
.position {
  display: flex;
  justify-content: center;
}
.carousel {
  margin: 0 auto;
  height: 400px;
  width: 100%;
}
.carousel-img {
  object-fit: cover;
}
.carousel-inner {
  border-radius: 24px;
}
.carousel-item > img {
  height: 400px;
  width: 100%;
}
.carousel-caption {
  position: absolute;
  width: 40px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 99;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
