<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center fs-7 fs-sm-5">
      <li class="page-item" :class="{ disabled: pages.currentPage === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="$emit('update-page', pages.currentPage - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-show="pages.currentPage > 3">
        <a class="page-link" href="#" @click.prevent="$emit('update-page', 1)">
          1
        </a>
      </li>
      <li class="page-item" v-show="pages.currentPage > 4">
        <span class="mx-2 text-primary">...</span>
      </li>
      <li
        class="page-item"
        v-for="page in pages.totalPages"
        :key="page"
        :class="{ active: page === pages.currentPage }"
        v-show="page > pages.showPageStart && page < pages.showPageEnd"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('update-page', page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" v-show="pages.totalPages - pages.currentPage > 3">
        <span class="mx-2 text-primary">...</span>
      </li>
      <li class="page-item" v-show="pages.totalPages - pages.currentPage > 2">
        <a
          class="page-link border"
          href="#"
          @click.prevent="$emit('update-page', pages.totalPages)"
        >
          {{ pages.totalPages }}
        </a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.currentPage === pages.totalPages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="$emit('update-page', pages.currentPage + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
  
  <script>
export default {
  props: ["pages"],
};
</script>
  
  <style lang="scss" scoped>
.page-link {
  padding: 0.25rem 0.4rem;
  margin: 0 0.25rem;
  border-radius: 0.25rem;
}
</style>