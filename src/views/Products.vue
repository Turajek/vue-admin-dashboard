<template>
  <div class="products">
    <div class="container">
      <h1>Products</h1>
      <ProductToolbar />
      <ProductList />
    </div>
  </div>
</template>
<script>
import ProductList from "@/components/products/ProductList.vue";
import ProductToolbar from "@/components/products/ProductToolbar.vue";
export default {
  components: {
    ProductList,
    ProductToolbar
  }
};
</script>
<style lang="scss" scoped>
h1 {
  text-align: center;
  padding: 2em;
}
</style>
