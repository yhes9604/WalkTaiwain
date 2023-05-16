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
        name: "地方特產",
        imgUrl:
          "https://images.unsplash.com/photo-1589553288887-3ee1f709e119?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=ˋㄢ&q=80",
        value: "地方特產",
      },
      {
        name: "中式美食",
        imgUrl:
          "https://images.unsplash.com/photo-1551851300-1fd39219a668?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=ˋ400&q=80",
        value: "中式美食",
      },
      {
        name: "異國料理",
        imgUrl:
          "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        value: "異國料理",
      },
      {
        name: "素食",
        imgUrl:
          "https://images.unsplash.com/photo-1610348716634-e0428d922116?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        value: "素食",
      },
      {
        name: "甜點冰品",
        imgUrl:
          "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        value: "甜點冰品",
      },
      {
        name: "伴手禮",
        imgUrl:
          "https://images.unsplash.com/photo-1630859288268-d11728472a25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        value: "伴手禮",
      },
    ];
    const search = ref(false);
    const currentCategory = ref("");
    const tempCategory = ref({});
    const tempCity = ref("");
    const date = ref("");
    const keyword = ref("");
    const restaurant = ref([]);
    const tempRestaurants = ref([]);
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
        getCityRestaurants();
      } else {
        getRestaurants();
      }
    }
    function categoryHanlder(category) {
      search.value = true;
      updateTempCategory(category);
      currentCategory.value = category.name;
      filterRestaurants();
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
    function getRestaurants() {
      //   let url =
      //     "https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$format=JSON";
      //   if (Object.keys(position.value).length) {
      //     url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$spatialFilter=nearby(${this.position.value.lat},${this.position.value.lon},2000)&$format=JSON`;
      //     search.value = true;
      //   }
      axios({
        method: "get",
        url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON",
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          restaurant.value = res.data;
          filterRestaurants();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function getCityRestaurants() {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${tempCity.value}?$format=JSON`,
        headers: getAuthorizationHeader(),
      })
        .then((res) => {
          restaurant.value = res.data;
          filterRestaurants();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function filterRestaurants(page = 1) {
      tempRestaurants.value = restaurant.value;
      if (tempCategory.value.value) {
        tempRestaurants.value = tempRestaurants.value.filter((item) => {
          return item.Class === tempCategory.value.value;
        });
      }

      if (keyword.value) {
        tempRestaurants.value = tempRestaurants.value.filter((item) => {
          return item.ActivityName.match(keyword.value);
        });
      }
      //   if (date.value) {
      //     tempActivities.value = tempActivities.filter((item) => {
      //       const startTime = new Date(item.StartTime).getTime();
      //       const endTime = new Date(item.EndTime).getTime();
      //       return date.value >= startTime && date.value <= endTime;
      //     });
      //   }
      pagination.value.totalResult = tempRestaurants.value.length;
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
      tempRestaurants.value = tempRestaurants.value.slice(
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
    getRestaurants();
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
      restaurant,
      tempRestaurants,
      pagination,
      position,
      categoryHanlder,
      filterRestaurants,
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
            <router-link to="/">首頁</router-link>
          </li>
          <template v-if="currentCategory">
            <li class="breadcrumb-item text-primary">
              <router-link to="/restaurants">品嚐美食</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ currentCategory }}
            </li>
          </template>
          <li v-else class="breadcrumb-item active" aria-current="page">
            品嚐美食
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
        <template v-if="tempRestaurants.length">
          <div class="row gy-3 mb-6">
            <div
              v-for="restaurant in tempRestaurants"
              :key="restaurant.RestaurantID"
              class="col-sm-6 col-md-4 col-lg-3"
            >
              <GeneralCard
                :item="restaurant"
                cardPath="restaurants"
              ></GeneralCard>
            </div>
          </div>
          <Pagination
            :pages="pagination"
            @update-page="filterRestaruants"
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