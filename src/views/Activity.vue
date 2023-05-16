<script>
import { computed, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import GeneralCard from "../components/GeneralCard.vue";
import getAuthorizationHeader from "../methods/getAuthorizationHeader";
import Pagination from "../components/Pagination.vue";
import DropdownCity from "../components/DropdownCity.vue";
export default {
  components: {
    GeneralCard,
    Pagination,
    DropdownCity,
  },
  setup() {
    const router = useRouter();

    const categories = [
      {
        name: "節慶活動",
        imgUrl:
          "https://images.unsplash.com/photo-1555589366-cd6c16cae4e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        value: "節慶活動",
      },
      {
        name: "自行車活動",
        imgUrl:
          "https://images.unsplash.com/photo-1510766461678-4a8420db04d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        value: "自行車活動",
      },
      {
        name: "遊憩活動",
        imgUrl:
          "https://images.unsplash.com/photo-1574674487139-fdefb8f26f69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        value: "遊憩活動",
      },
      {
        name: "產業文化",
        imgUrl:
          "https://images.unsplash.com/photo-1508367231051-dbfe726a5079?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        value: "產業文化活動",
      },
      {
        name: "年度活動",
        imgUrl:
          "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        value: "年度活動",
      },
      {
        name: "四季活動",
        imgUrl:
          "https://images.unsplash.com/photo-1615958354408-c15ad934a549?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        value: "四季活動",
      },
    ];
    const search = ref(false);
    const currentCategory = ref("");
    const tempCategory = ref({});
    const tempCity = ref("");
    const date = ref("");
    const keyword = ref("");
    const activies = ref([]);
    const tempActivities = ref([]);
    const pagination = ref({});
    const position = ref({});

    const categoryList = computed(() => {
      const categoryList = [{ name: "全部主題" }];
      return categoryList.concat(this.categories);
    });
    function searchHandler() {
      search.value = true;
      currentCategory.value = tempCategory.name;
      if (tempCity.value) {
        getCityActivities();
      } else {
        getActivities();
      }
    }
    function categoryHanlder(category) {
      search.value = true;
      updateTempCategory(category);
      currentCategory.value = category.name;
      filterActivities();
    }
    function updateTempCategory(category) {
      tempCategory.value = category;
      console.log(tempCategory.value);
    }
    function updateTempCity(value) {
      tempCity.value = value;
    }
    function updateDate(date) {
      date.value = date.getTime();
    }
    function getActivities() {
      //   let url =
      //     "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON";
      //   if (Object.keys(position.value).length) {
      //     url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$spatialFilter=nearby(${this.position.value.lat},${this.position.value.lon},2000)&$format=JSON`;
      //     search.value = true;
      //   }
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON",
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          activies.value = res.data;
          filterActivities();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getCityActivities() {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${tempCity.value}?$format=JSON`,
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          activies.value = res.data;
          filterActivities();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function filterActivities(page = 1) {
      tempActivities.value = activies.value;
      if (tempCategory.value.value) {
        tempActivities.value = tempActivities.value.filter((item) => {
          return (
            item.Class1 === tempCategory.value.value ||
            item.Class2 === tempCategory.value.value ||
            item.Class3 === tempCategory.value.value
          );
        });
      }

      //   if (keyword.value) {
      //     tempActivities.value = tempActivities.value.filter((item) =>
      //       item.ActivityName.match(keyword.value)
      //     );
      //   }
      //   if (date.value) {
      //     tempActivities.value = tempActivities.filter((item) => {
      //       const startTime = new Date(item.StartTime).getTime();
      //       const endTime = new Date(item.EndTime).getTime();
      //       return date.value >= startTime && date.value <= endTime;
      //     });
      //   }
      pagination.value.totalResult = tempActivities.value.length;
      pagination.value.perPage = 20;
      pagination.value.totalPages = Math.ceil(
        pagination.value.totalResult / pagination.value.perPage
      );
      pagination.value.currentPage = page;

      if (pagination.value.currentPage > pagination.value.totalPages) {
        pagination.currentCategory = pagination.totalPages;
      }
      //判斷當前頁面超過總頁面 = 最後一頁
      pagination.value.showPageStart = page - 3;
      pagination.value.showPageEnd = page + 3;

      const firstItem =
        pagination.value.currentPage * pagination.value.perPage -
        pagination.value.perPage;
      const lastItem =
        pagination.value.currentPage * pagination.value.perPage - 1;
      tempActivities.value = tempActivities.value.slice(
        firstItem,
        lastItem + 1
      );
    }
    // if (router.query.lat && router.query.lon) {
    //   position.value = {
    //     lat: Number(router.query.lat),
    //     lon: Number(router.query.lon),
    //   };
    // }
    getActivities();
    return {
      currentCategory,
      categories,
      pagination,
      search,
      currentCategory,
      tempCategory,
      tempCity,
      date,
      keyword,
      activies,
      tempActivities,
      pagination,
      position,
      categoryHanlder,
      filterActivities,
      updateTempCity,
      searchHandler,
    };
  },
};
</script>
<template>
  <div class="activities pt-md-5">
    <div class="container py-5">
      <nav aria-label="breadcrumb mb-6">
        <ol class="breadcrumb fs-5">
          <li class="breadcrumb-item text-primary">
            <router-link to="/">>首頁</router-link>
          </li>
          <template v-if="currentCategory">
            <li class="breadcrumb-item text-primary">
              <router-link to="/activity"> 節慶活動</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ currentCategory }}
            </li>
          </template>
          <li v-else class="breadcrumb-item active" aria-current="page">
            節慶活動
          </li>
        </ol>
      </nav>
      <section class="filter-sction mb-6">
        <div class="row gx-3">
          <div class="col-lg-2">
            <DropdownCity @send-city="updateTempCity"></DropdownCity>
          </div>
          <div class="col-lg-4">
            <input
              type="text"
              class="border rounded bg-light fs-5 px-3 py-2 w-100 mb-2"
              placeholder="你想去哪裡？請輸入關鍵字"
              v-model="keyword"
            />
          </div>
          <div class="col-lg-2">
            <button
              type="button"
              class="btn btn-primary fs-5 text-white w-100"
              @click="searchHandler"
            >
              <i class="fa-solid fa-magnifying-glass"></i>搜 尋
            </button>
          </div>
        </div>
      </section>
      <section v-if="!search" class="category-section mb-6">
        <h1 class="fs-2 fw-light mb-3">熱門主題</h1>
        <div class="row g-3">
          <div
            v-for="category in categories"
            :key="category.name"
            class="col-sm-6 col-md-4 col-lg-3"
          >
            <a
              href="#"
              class="category-img rounded-3 position-relative"
              @click.prevent="categoryHanlder(category)"
            >
              <img :src="category.imgUrl" class="object-fit-cover" />
              <h2 class="fs-3 fw-bold text-white position-absolute">
                {{ category.name }}
              </h2>
            </a>
          </div>
        </div>
      </section>
      <section v-if="search" class="filter-results mb-6">
        <h1 class="fs-2 fw-light mn-3">
          搜尋結果
          <span class="fs-4 text-secondary">
            共有
            <span class="text-warning">{{ pagination.totalResult }}</span>
            筆</span
          >
        </h1>
        <template v-if="tempActivities.length">
          <div class="row gy-3 mb-6">
            <div
              v-for="activies in tempActivities"
              :key="activies.ActivityID"
              class="col-sm-6 col-md-4 col-lg-3"
            >
              <GeneralCard :item="activies" cardPath="activities"></GeneralCard>
            </div>
          </div>
          <Pagination
            :pages="pagination"
            @update-page="filterActivities"
          ></Pagination>
        </template>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.category-img {
  display: block;
  background-color: #000000;
  overflow: hidden;
  width: 100%;
  height: 140px;
  img {
    opacity: 0.6;
    transition: all 0.6s;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h2 {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover img {
    transform: scale(1.1, 1.1);
  }
}
button {
  background-color: #65895f;
  border: none;
}
button:hover {
  background-color: #53714e;
}
a {
  text-decoration: none;
  color: black;
}
</style>