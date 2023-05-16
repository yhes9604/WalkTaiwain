<script>
import { computed, onMounted, ref } from "vue";
import { defineEmits } from "vue";

import Collapse from "bootstrap/js/dist/collapse";
export default {
  setup(_, context) {
    const emit = defineEmits(["send-city"]);
    const cities = ref([
      { name: "全部縣市", value: "" },
      { name: "基隆市", value: "Keelung" },
      { name: "台北市", value: "Taipei" },
      { name: "新北市", value: "NewTaipei" },
      { name: "桃園市", value: "Taoyuan" },
      { name: "新竹縣", value: "HsinchuCounty" },
      { name: "新竹市", value: "Hsinchu" },
      { name: "苗栗縣", value: "MiaoliCounty" },
      { name: "台中市", value: "Taichung" },
      { name: "彰化縣", value: "ChanghuaCounty" },
      { name: "雲林縣", value: "YunlinCounty" },
      { name: "南投縣", value: "NantouCounty" },
      { name: "嘉義縣", value: "ChiayiCounty" },
      { name: "嘉義市", value: "Chiayi" },
      { name: "台南市", value: "Tainan" },
      { name: "高雄市", value: "Kaohsiung" },
      { name: "屏東縣", value: "PingtungCounty" },
      { name: "台東縣", value: "TaitungCounty" },
      { name: "花蓮縣", value: "HualienCounty" },
      { name: "宜蘭縣", value: "YilanCounty" },
      { name: "澎湖縣", value: "PenghuCounty" },
      { name: "金門縣", value: "KinmenCounty" },
      { name: "連江縣", value: "LienchiangCounty" },
    ]);
    const selectedCity = ref("");

    const defaultSelect = computed(() => {
      return cities.value[0].name;
    });
    function selectHandler(item) {
      selectedCity.value = item.name;
      context.emit("send-city", item.value);
    }

    return { cities, selectHandler, selectedCity, defaultSelect };
  },
};
</script>
<template>
  <!-- <div class="dropdown-list position-relative mb-2">
    <div
      class="dropdown-input border rounded bg-light position-relative dropdown"
    >
      <span v-if="selectedCity" class="text-primary">{{ selectedCity }}</span>
      <span v-else class="text-primary">{{ defaultSelect }}</span>
      <button
        type="button"
        class="btn p-0 d-flex fs-6 text-secondary dropdown-toggle"
        id="dropdownMenu"
        data-bs-toggle="dropdown"
        data-bs-target="#dropdownCity"
        aria-expanded="false"
        aria-controls="dropdownCity"
      ></button>
    </div>
    <div
      class="collapse pt-1 position-absolute w-100"
      id="dropdownCity"
      aria-labelledby="dropdownMenu"
    >
      <div class="card card-body p-0">
        <ul class="list-unstyled mb-0">
          <li
            v-for="city in cities"
            :key="city.name"
            class="dropdown-list-item"
          >
            <a
              href="#"
              class="d-block w-100"
              @click.prevent="selectHandler(city)"
              >{{ city.name }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div> -->
  <div class="dropdown">
    <button
      class="btn dropdown-toggle"
      type="button"
      id="dropdownMenuButton2"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span v-if="selectedCity" class="text-primary">{{ selectedCity }}</span>
      <span v-else class="text-primary">{{ defaultSelect }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
      <li v-for="city in cities" :key="city.name" class="dropdown-list-item">
        <a class="d-block w-100" @click.prevent="selectHandler(city)">{{
          city.name
        }}</a>
      </li>
    </ul>
  </div>
</template>