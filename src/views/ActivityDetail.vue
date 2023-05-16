<template>
  <div class="container py-5 px-4">
    <nav class="breadcrumb fs-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="/">首頁</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="/activity">節慶活動</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ event.ActivityName }}
        </li>
      </ol>
    </nav>
    <section class="event-carousel mb-3">
      <div class="event-pic">
        <img :src="event.Picture.PictureUrl1" alt="" class="event-pic-detail" />
      </div>
    </section>
    <section class="event-detail mb-6">
      <h1 class="fw-light fs-2 mb-3">{{ event.ActivityName }}</h1>
      <div class="d-flex flex-wrap">
        <span v-if="event.Class1" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ event.Class1 }}</span
        >
        <span v-if="event.Class2" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ event.Class2 }}</span
        >
        <span v-if="event.Class3" class="rounded-pill fs-5 fw-light mb-3"
          >#{{ event.Class3 }}</span
        >
        <div class="description mb-6">
          <span class="fs-4 fw-boler mb-3"> 活動介紹：</span>
          <p class="fw-light lh-lg">{{ event.Description }}</p>
        </div>

        <div class="row gy-4 mapwidth">
          <div class="col-lg-6">
            <div class="spot-information rounded-3 bg-light p-4 fs-5 mb-3">
              <div v-if="event.StartTime" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動時間：</span>
                <span class="col fs-5 fw-light"
                  >{{ startTime }}~{{ endTime }}</span
                >
              </div>
              <div v-if="event.Organizer" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">主辦單位：</span>
                <span class="col fs-5 fw-light">{{ event.Organizer }}</span>
              </div>
              <div v-if="event.Phone" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">聯絡電話：</span>
                <span class="col fs-5 fw-light">{{
                  event.Phone.replace("886-", "0")
                }}</span>
              </div>
              <div v-if="event.Address" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動地址：</span>
                <span class="col fs-5 fw-light">{{ event.Address }}</span>
              </div>
              <div v-if="event.WebsiteUrl" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動連結：</span>
                <span class="col text-primary"
                  ><a :href="event.WebsiteUrl" target="_blank"
                    >連結<i class="bi bi-link-45deg"></i></a
                ></span>
              </div>
              <div v-if="event.Charge" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">活動費用：</span>
                <span class="col fs-5 fw-light">{{ event.Charge }}</span>
              </div>
              <div v-if="event.TravelInfo" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">交通資訊：</span>
                <span class="col fs-5 fw-light">{{ event.TravelInfo }}</span>
              </div>
              <div v-if="event.Remarks" class="row g-1 mb-2">
                <span class="col-auto fw-bolder">注意事項：</span>
                <span class="col fs-5 fw-light">{{ event.Remarks }}</span>
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
                :src="`https://www.google.com/maps?q=${event.Position.PositionLat},${event.Position.PositionLon}&hl=zh-tw&z=16&output=embed`"
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
        <router-link to="/activity" class="text-danger fs-5 text-end"
          >查看更多活動<i class="fa-sharp fa-solid fa-chevron-right"></i
        ></router-link>
      </div>
      <div class="row">
        <div
          v-for="similar in similarEvents"
          :key="similar.ActivityID"
          class="col-6 col-lg-3"
        >
          <GeneralCard :item="similar" cardPath="'activities'"></GeneralCard>
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
    const event = ref({});
    const position = ref({});
    const router = useRouter();

    const eventPic = ref([]);
    const similarEvents = ref([]);

    function getEvent() {
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON",
        headers: getAuthorizationHeader(),
      }).then((res) => {
        event.value = res.data.find((item) => item.ActivityID === id.value);
        console.log(event.value);
        position.value = event.Position;
        console.log(event.Position);
        // get similars
        const classArray = [];
        for (let i = 1; i < 3; i++) {
          if (Object.prototype.hasOwnProperty.call(event.value, `Class${i}`)) {
            classArray.push(event.value[`Class${i}`]);
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
              similarEvents.value.push(item);
            }
          });
        });
        if (Object.keys(similarEvents.value).length == 0) {
          const filteredData = res.data.filter(
            (item) =>
              typeof item.Picture === "object" &&
              Object.keys(item.Picture).length !== 0
          );
          shuffleArray(filteredData);
          similarEvents.value = filteredData.splice(0, 5);
        }
        console.log(similarEvents.value);
        //活動介紹 判斷event屬性中是否有class1~3 有的話加入classArray
        // similarEvents.value = similarEvents.value.filter((item, i) => {
        //   similarEvents.value.indexOf(item) === i;
        // });
        // console.log(similarEvents.value);
        const index = similarEvents.value.indexOf(
          similarEvents.value.find((item) => item.ActivityID === id.value)
        );
        console.log(index);
        similarEvents.value.splice(index, 1);
        //把自己移除 相似活動清單
        shuffleArray(similarEvents.value);

        similarEvents.value = similarEvents.value.slice(0, 4);
        console.log(similarEvents.value);
        //get Pic
        if (Object.keys(event.value.Picture).length) {
          const length = Object.keys(event.value.Picture).length / 2;
          for (let i = 1; i <= length; i++) {
            const picture = {};
            picture.url = event.value.Picture[`PictureUrl${i}`];
            picture.description = event.value.Picture[`PictureDescription${i}`];
            eventPic.value.push(picture);
          }
        } else {
          eventPic.value.push({
            url: "src/assets/NoImage-255x200.png",
          });
        }
        console.log(eventPic.value);
      });
    }
    id.value = router.currentRoute.value.params.id;
    getEvent();
    const startTime = computed(() => {
      return new Date(event.value.StartTime).toLocaleDateString();
    });
    const endTime = computed(() => {
      return new Date(event.value.EndTime).toLocaleDateString();
    });

    return { id, event, eventPic, startTime, endTime, similarEvents };
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