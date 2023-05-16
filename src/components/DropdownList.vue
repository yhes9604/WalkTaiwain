<script>
import { computed, ref } from "vue";

export default {
  props: {
    listItems: {
      type: Object,
      default: undefined,
    },
  },
  setup(props) {
    const selectedItem = ref("");

    const defaultSelect = computed(() => {
      return props.listItems[0].name;
    });
    function selectHandler(item) {
      selectedItem.value = item.name;
    }

    return { selectedItem, defaultSelect, selectHandler };
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
      <span v-if="selectedCity" class="text-primary">{{ selectedItem }}</span>
      <span v-else class="text-primary">{{ defaultSelect }}</span>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
      <li v-for="item in listItems" :key="item.name" class="dropdown-list-item">
        <a class="d-block w-100" @click.prevent="selectHandler(item.name)">{{
          item.name
        }}</a>
      </li>
    </ul>
  </div>
</template>