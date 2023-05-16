<template>
  <router-link class="event-card" :to="`/activities/${event.ActivityID}`">
    <div class="card rounded-3 shadow">
      <div class="row g-0 h-100">
        <div class="col-4 overflow-hidden">
          <img
            class="object-fit-cover"
            :src="imgUrl"
            :alt="event.Name"
            :onerror="defaultImg"
          />
        </div>
        <div class="col-8">
          <div class="card-body h-100 d-flex flex-column">
            <span class="mb-1 card-time">{{ startTime }} - {{ endTime }}</span>
            <h3 class="card-title fw-bolder">
              {{ event.ActivityName }}
            </h3>
            <div class="d-flex justify-content-between mt-auto">
              <span v-if="event.City" class="card-place"
                ><i class="fa-solid fa-location-dot"></i> {{ event.City }}</span
              >
              <span class="ms-auto card-more"
                >詳細介紹 <i class="fa-sharp fa-solid fa-chevron-right"></i
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
  <script>
export default {
  props: {
    event: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    imgUrl() {
      return this.event.Picture.PictureUrl1 || "src/assets/NoImage-255x200.png";
    },
    startTime() {
      return new Date(this.event.StartTime).toLocaleDateString();
    },
    endTime() {
      return new Date(this.event.EndTime).toLocaleDateString();
    },
  },
};
</script>
  
<style lang="scss" scoped>
.event-card {
  text-decoration: none;
  .card {
    overflow: hidden;
    background-color: #e5e5e5;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
  }
  img {
    height: 200px;
    width: 100%;
    transition: all 0.6s;
  }
  &:hover img {
    transform: scale(1.1, 1.1);
  }
}
.card-time {
  font-size: 16px;
  text-decoration: none;
  color: #646464;
}
.card-title {
  font-size: 20px;
  color: #2f2f2f;
}
.card-place {
  font-size: 16px;
  color: #646464;
}
.card-more {
  font-size: 16px;
  color: #7f977b;
}
</style>