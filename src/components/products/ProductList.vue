<template>
  <div class="product-list">
    <h1>Products</h1>
    <ProductItem v-for="(product,key) in products" :key="key" :product="product"/>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProductItem from "@/components/products/ProductItem.vue";
export default {
  methods: {
    ...mapActions(["getProducts"])
  },
  computed: {
    ...mapGetters(["products"])
  },
  components: {
    ProductItem
  },
  created() {
    this.getProducts();
  }
};
</script>
<style lang="scss" scoped>
.product-list {
  color: black;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  h1 {
    text-align: center;
    padding: 2em;
  }
}
</style>