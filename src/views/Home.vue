<template>
  <div class="container max-w-xl mx-auto mb-4 px-4">
    <div class="flex flex-wrap">
      <div class="w-full">
        <div class="cards">
          <div
          class="product flex overflow-hidden bg-white"
          v-for="product in products"
          :id="product._id"
          :key="product._id">
          <Product :product="product" />
        </div>
      </div>
      <div class="text-center mt-6">
        <a
        href="#"
        class="w-full rounded inline-block px-4 py-3 bg-blue-dark text-white no-underline rounded"
        @click.prevent="loadMoreProduct"
        v-if="isLoadMoreBtn">Load more</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ProductService from '@/services/product';
import Product from '@/components/Product.vue';
import Pagination from '@/components/Pagination.vue';
import Categories from '@/components/Categories.vue';

export default {
  components: { Product, Pagination, Categories },
  data() {
    return {
      bottom: false,
      products: [],
      currentPage: 0,
      pages: 0,
      isLoadMoreBtn: false,
      isLoadMoreFinish: false
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isAuthenticated',
      cart: 'getCart'
    })
  },
  watch: {
    cart: function (oldVal, newVal) {
      var addedElement = JSON.parse(localStorage.getItem('last-add')) || newVal[newVal.length]
      const productEl = document.getElementById(addedElement.id || addedElement._id)
      const img = productEl.querySelector("img")
      const animatedClonedEl = img.cloneNode(true)
      animatedClonedEl.classList.add("animable")
      img.parentNode.insertBefore(animatedClonedEl, img);
      animatedClonedEl.style.top = img.offsetTop
      animatedClonedEl.style.right = img.offsetRight
      animatedClonedEl.classList.add("animated")
      setTimeout(() => {
        animatedClonedEl.remove()
      }, 1000)
    },
    bottom(bottom) {
      if (bottom && !this.isLoadMoreFinish) {
        this.loadMoreProduct();
      }
    }
  },
  created() {
    ProductService.getProducts({ month: (new Date).getMonth() }).then(res => {
      this.products = res.data.products;
      this.currentPage = res.data.currentPage;
      this.pages = res.data.pages;
    });
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible();
    });
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    clickHandlerPage(page) {
      ProductService.getProductsByPage(page).then(res => {
        const { data } = res;
        this.products = data.products;
        this.currentPage = data.currentPage;
        this.pages = data.pages;
      });
    },
    loadMoreProduct() {
      const page = this.currentPage + 1;
      ProductService.getProductsByPage(page).then(res => {
        const { data } = res;

        if (!data.products.length) {
          this.isLoadMoreBtn = false;
          this.isLoadMoreFinish = true;
          return;
        }

        data.products.forEach(product => {
          this.products.push(product);
        });

        this.currentPage = page;
      });
    }
  }
};
</script>

<style>
.product {
  box-shadow: 1px 1px 15px #999;
}

.product img {
  width: 100%;
  max-width: 100%;
}

.product .animable {
  position: fixed;
  -webkit-transition-duration: 1s;
  -webkit-transition-timing-function: ease;
  transition-property: width height top right;
  transition-duration: 1s;
  transition-timing-function: ease;
  right: 45%;
  top: 45%;
  width: 200px;
  height: 200px;
}

.product .animated {
  right: 40px;
  top: 27px;
  width: 0;
  height: 0;
}
</style>
