<script>
import getAuthorizationHeader from "../methods/getAuthorizationHeader.js";
import axios from "axios";
import EventCard from "../components/EventCard.vue";
import GeneralCard from "../components/GeneralCard.vue";
import GeneralRes from "../components/GeneralRes.vue";
import Carousel from "../components/Carousel.vue";
import shuffleArray from "../methods/shuffleArray";
import DropdownList from "../components/DropdownList.vue";
import { ref } from "vue";
export default {
  components: { EventCard, GeneralCard, GeneralRes, Carousel, DropdownList },
  setup() {
    const events = ref([]);
    const scenicSpots = ref([]);
    const restaurants = ref([]);
    const thems = ref([
      { name: "探索景點" },
      { name: "節慶活動" },
      { name: "品嘗美食" },
    ]);
    getEvent();
    getScenicSpots();
    getRestaurants();
    function getEvent() {
      console.log("AA");
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON",
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth();
          const data = [];
          res.data.forEach((item) => {
            const startTime = new Date(item.StartTime);
            const endTime = new Date(item.EndTime);
            if (endTime < new Date()) return;
            if (startTime.getFullYear() === currentYear) {
              if (startTime.getMonth() === currentMonth) {
                data.push(item);
              }
            }
          });
          console.log(data);
          const filteredData = data.filter(
            (item) =>
              typeof item.Picture === "object" &&
              Object.keys(item.Picture).length !== 0
          );
          shuffleArray(filteredData);
          console.log(filteredData);
          events.value = filteredData.slice(0, 4);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getScenicSpots() {
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON",
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          const data = res.data;
          shuffleArray(data);

          scenicSpots.value = data.slice(0, 4);
          console.log(scenicSpots.value);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getRestaurants() {
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON",
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          const data = res.data;
          shuffleArray(data);

          restaurants.value = data.slice(0, 4);
          console.log(restaurants.value);
          console.log("AA");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      getEvent,
      events,
      getScenicSpots,
      scenicSpots,
      getRestaurants,
      restaurants,
      thems,
    };
  },
};
</script>

<template>
  <div class="pt-md-1">
    <div class="container py-2 px-1">
      <header class="mb-5 px-4 mt-3 p-5">
        <div class="row gx-1 gy-3 justify-coontent-center">
          <div class="col-md-8 col-lg-7">
            <div class="text-center text-md-start">
              <h1 class="lh-base fw-light fs-2 fs-sm-1">
                探索
                <span class="text-decoration-underline text-warning">
                  <span class="text-dark">台灣之美</span>
                </span>
                <br />
                讓我們更接近這片土地
              </h1>
              <span class="text-secondary fs-6 fs-sm-4">
                <i class="fa-solid fa-location-dot text-warning"></i>
                台灣旅遊景點遊覽<span class="ms-2 font-noto-seif fw-bolder"
                  >Taiwan Travel Guide</span
                >
              </span>
            </div>
          </div>
          <div class="col-md-4 col-lg-5">
            <form>
              <DropdownList :listItems="thems"></DropdownList>

              <input
                type="text"
                class="border rounded bg-light fs-5 px-3 py-2 w-100 mb-2"
                placeholder="你想去哪裡？請輸入關鍵字"
              />
              <button type="button" class="btn btn-primary text-white w-100">
                <i class="fa-sharp fa-solid fa-magnifying-glass"></i>搜尋
              </button>
            </form>
          </div>
        </div>
      </header>
      <section class="home-carousel mb-5">
        <Carousel />
      </section>
      <section class="home-activity mb-5">
        <div class="d-flex justify-content-between align-items-end mb-3">
          <h2 class="fw-light mb-0">近期活動</h2>

          <router-link to="/activity" class="text-end activity-more"
            >查看更多活動<i class="fa-sharp fa-solid fa-chevron-right"></i>
          </router-link>
        </div>
        <div class="row row-cols-1 row-cols-md-2 gy-3">
          <div class="col" v-for="event in events" :key="event.ActivityID">
            <EventCard :event="event"> </EventCard>
          </div>
        </div>
      </section>
      <section class="home-scenic-spot mb-5">
        <div class="d-flex justify-content-between align-items-end mb-3">
          <h2 class="fw-light mb-0">熱門打卡景點</h2>
          <router-link class="activity-more text-end" to="/scenic-spots"
            >查看更多景點 <i class="fa-sharp fa-solid fa-chevron-right"></i
          ></router-link>
        </div>
        <div class="row gy-3">
          <div
            class="col-6 col-md-3"
            v-for="scenicSpot in scenicSpots"
            :key="scenicSpot.scenicSpotID"
          >
            <GeneralCard :item="scenicSpot" :cardPath="'scenicspots'" />
          </div>
        </div>
      </section>
      <section class="home-resaurant mb-5">
        <div class="d-flex justify-content-between align-items-end mb-3">
          <h2 class="fw-light mb-0">一再回訪美食</h2>
          <router-link class="activity-more text-end" to="/restaurants"
            >查看更多美食 <i class="fa-sharp fa-solid fa-chevron-right"></i
          ></router-link>
        </div>
        <div class="row gy-3">
          <div
            v-for="restaurant in restaurants"
            :key="restaurant.RestaurantID"
            class="col-6 col-md-3"
          >
            <GeneralRes
              :item="restaurant"
              :cardPath="'restaurants'"
            ></GeneralRes>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.activity-more {
  color: #ff725e;
  font-size: 16px;
  text-decoration: none;
}
button {
  background-color: #65895f;
  border: none;
}
button:hover {
  background-color: #53714e;
}
</style>
