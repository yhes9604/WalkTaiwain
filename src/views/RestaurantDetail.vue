<template>
  <div class="container py-5 px-4">
    <nav class="breadcrumb fs-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/restaurants">品嚐美食</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ restaurant.RestaurantName }}
        </li>
      </ol>
    </nav>
    <section class="event-carousel mb-3">
      <div class="event-pic">
        <img
          :src="restaurant.Picture.PictureUrl1"
          alt=""
          class="event-pic-detail"
        />
      </div>
    </section>
    <section class="event-detail mb-6">
      <h1 class="fw-light fs-2 mb-3">{{ restaurant.RestaurantName }}</h1>
      <div class="d-flex flex-wrap">
        <span v-if="restaurant.Class1" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ restaurant.Class1 }}</span
        >
        <span v-if="restaurant.Class2" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ restaurant.Class2 }}</span
        >
        <span v-if="restaurant.Class3" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ restaurant.Class3 }}</span
        >
        <div class="description mb-6">
          <span class="fs-4 fw-boler mb-3"> 活動介紹：</span>
          <p class="fw-light lh-lg">{{ restaurant.Description }}</p>
        </div>

        <div class="row gy-4 mapwidth">
          <div class="col-lg-6">
            <div class="spot-information rounded-3 bg-light p-4 fs-5 mb-3">
              <div v-if="restaurant.StartTime" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動時間：</span>
                <span class="col fs-5 fw-light"
                  >{{ startTime }}~{{ endTime }}</span
                >
              </div>
              <div v-if="restaurant.Organizer" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">主辦單位：</span>
                <span class="col fs-5 fw-light">{{
                  restaurant.Organizer
                }}</span>
              </div>
              <div v-if="restaurant.Phone" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">聯絡電話：</span>
                <span class="col fs-5 fw-light">{{
                  restaurant.Phone.replace("886-", "0")
                }}</span>
              </div>
              <div v-if="restaurant.Address" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動地址：</span>
                <span class="col fs-5 fw-light">{{ restaurant.Address }}</span>
              </div>
              <div v-if="restaurant.WebsiteUrl" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動連結：</span>
                <span class="col text-primary"
                  ><a :href="restaurant.WebsiteUrl" target="_blank"
                    >連結<i class="bi bi-link-45deg"></i></a
                ></span>
              </div>
              <div v-if="restaurant.Charge" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動費用：</span>
                <span class="col fs-5 fw-light">{{ restaurant.Charge }}</span>
              </div>
              <div v-if="restaurant.TravelInfo" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">交通資訊：</span>
                <span class="col fs-5 fw-light">{{
                  restaurant.TravelInfo
                }}</span>
              </div>
              <div v-if="restaurant.Remarks" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">注意事項：</span>
                <span class="col fs-5 fw-light">{{ restaurant.Remarks }}</span>
              </div>
            </div>
            <div class="nearby row gy-3">
              <div class="col-sm-4">
                <a href=""></a>
                <img src="../assets/nearby-scene30.svg" alt="" />
                <span class="mt-1 text-primary fs-5 fw-bold">附近景點</span>
              </div>
              <div class="col-sm-4">
                <a href=""></a>
                <img src="../assets/nearby-event30.svg" alt="" />
                <span class="mt-1 text-primary fs-5 fw-bold">附近活動</span>
              </div>
              <div class="col-sm-4">
                <a href=""></a>
                <img src="../assets/nearby-food30.svg" alt="" />
                <span class="mt-1 text-primary fs-5 fw-bold">附近美食</span>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="event-location rounded-3 overflow-hidden">
              <iframe
                width="100%"
                height="300px"
                frameborder="0"
                :src="`https://www.google.com/maps?q=${restaurant.Position.PositionLat},${restaurant.Position.PositionLon}&hl=zh-tw&z=16&output=embed`"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="similar-activties">
      <div class="d-flex justify-content-between align-items-end mb-3">
        <h1 class="fw-light fs-2 mb-0">還有這些不能錯過的活動</h1>
        <router-link to="/restaurants" class="text-danger fs-5 text-end"
          >查看更多活動<i class="fa-sharp fa-solid fa-chevron-right"></i
        ></router-link>
      </div>
      <div class="row">
        <div
          v-for="similar in similarRestaurants"
          :key="similar.RestaurantID"
          class="col-6 col-lg-3"
        >
          <GeneralCard :item="similar" cardPath="'restaurants'"></GeneralCard>
        </div>
      </div>
    </section>
  </div>
</template>
  <script>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import getAuthorizationHeader from "../methods/getAuthorizationHeader";
import { useRouter } from "vue-router";
import GeneralCard from "../components/GeneralCard.vue";
import shuffleArray from "../methods/shuffleArray";

export default {
  components: { GeneralCard },
  setup() {
    const id = ref("");
    const restaurant = ref({});
    const position = ref({});
    const router = useRouter();

    const restaurantPic = ref([]);
    const similarRestaurants = ref([]);

    function getRestaurant() {
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON",
        headers: getAuthorizationHeader(),
      }).then((res) => {
        restaurant.value = res.data.find(
          (item) => item.RestaurantID === id.value
        );
        console.log(restaurant.value);
        position.value = restaurant.Position;
        console.log(restaurant.Position);
        // get similars
        const classArray = [];
        for (let i = 1; i < 3; i++) {
          if (
            Object.prototype.hasOwnProperty.call(restaurant.value, `Class${i}`)
          ) {
            classArray.push(restaurant.value[`Class${i}`]);
          }
        }
        console.log(classArray);
        res.data.forEach((item) => {
          classArray.forEach((category) => {
            if (
              item.Class1 === category ||
              item.Class2 === category ||
              item.Class3 === category
            ) {
              similarRestaurants.value.push(item);
            }
          });
        });
        if (Object.keys(similarRestaurants.value).length == 0) {
          const filteredData = res.data.filter(
            (item) =>
              typeof item.Picture === "object" &&
              Object.keys(item.Picture).length !== 0
          );
          shuffleArray(filteredData);
          similarRestaurants.value = filteredData.splice(0, 5);
        }
        console.log(similarRestaurants.value);
        //活動介紹 判斷event屬性中是否有class1~3 有的話加入classArray
        // similarEvents.value = similarEvents.value.filter((item, i) => {
        //   similarEvents.value.indexOf(item) === i;
        // });
        // console.log(similarEvents.value);
        const index = similarRestaurants.value.indexOf(
          similarRestaurants.value.find(
            (item) => item.RestaurantID === id.value
          )
        );
        console.log(index);
        similarRestaurants.value.splice(index, 1);
        //把自己移除 相似活動清單
        shuffleArray(similarRestaurants.value);

        similarRestaurants.value = similarRestaurants.value.slice(0, 4);
        console.log(similarRestaurants.value);
        //get Pic
        if (Object.keys(restaurant.value.Picture).length) {
          const length = Object.keys(restaurant.value.Picture).length / 2;
          for (let i = 1; i <= length; i++) {
            const picture = {};
            picture.url = restaurant.value.Picture[`PictureUrl${i}`];
            picture.description =
              restaurant.value.Picture[`PictureDescription${i}`];
            restaurantPic.value.push(picture);
          }
        } else {
          restaurantPic.value.push({
            url: "src/assets/NoImage-255x200.png",
          });
        }
        console.log(restaurantPic.value);
      });
    }
    id.value = router.currentRoute.value.params.id;
    getRestaurant();
    const startTime = computed(() => {
      return new Date(restaurant.value.StartTime).toLocaleDateString();
    });
    const endTime = computed(() => {
      return new Date(restaurant.value.EndTime).toLocaleDateString();
    });

    return {
      id,
      restaurant,
      restaurantPic,
      startTime,
      endTime,
      similarRestaurants,
    };
  },
};
</script>
  <style scoped>
.breadcrumb-item > a {
  text-decoration: none;
}
.event-pic {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 400px;
}
.event-pic-detail {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.mapwidth {
  width: 100%;
}
</style>