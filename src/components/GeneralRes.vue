<template>
  <router-link class="general-card" :to="`/${cardPath}/${item.RestaurantID}`">
    <div class="card border-0">
      <div class="general-card-img rounded-3 shadow">
        <img
          class="object-fit-cover"
          :src="imgUrl"
          :alt="imgDescription"
          :onerror="defaultImg"
        />
      </div>
      <div class="card-body px-1 py-3">
        <h4 class="card-title fw-bolder mb-1">{{ item.RestaurantName }}</h4>
        <span v-if="item.Address" class="card-place"
          ><i class="fa-solid fa-location-dot"></i> {{ item.Address }}</span
        >
      </div>
    </div>
  </router-link>
</template>
  
  <script>
export default {
  props: {
    item: {
      type: Object,
      default: undefined,
    },
    cardPath: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    imgUrl() {
      return this.item.Picture.PictureUrl1 || "src/assets/NoImage-255x200.png";
    },
    imgDescription() {
      return this.item.Picture.PictureDescription1 || this.item.Name;
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.general-card-img {
  overflow: hidden;
  width: 100%;
  height: 200px;
}

.general-card {
  text-decoration: none;
  img {
    transition: all 0.6s;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  &:hover img {
    transform: scale(1.1, 1.1);
  }
}
.card-title {
  font-size: 22px;
  color: #2f2f2f;
}
.card-place {
  font-size: 16px;
  color: #646464;
}
</style>