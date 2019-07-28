<template>
  <div class="products">
    <div class="container">
      <h1>Products</h1>
      <ProductToolbar />
      <ProductList :products="products.products" mode="normal" :page_all="products.page_all" />
    </div>
  </div>
</template>
<script>
import ProductList from "@/components/products/ProductList.vue";
import ProductToolbar from "@/components/products/ProductToolbar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ProductList,
    ProductToolbar
  },
  methods: {
    ...mapActions(["getProducts"])
  },
  computed: {
    ...mapGetters(["products"])
  },
  created() {
    this.getProducts();
  }
};
</script>
<style lang="scss" scoped>
</style>
