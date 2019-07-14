<template>
  <div class="product-list">
    <div class="product-list-columns">
      <div class="item">Photo</div>
      <div class="item">Title</div>
      <div class="item">Bar code</div>
      <div class="item">Price netto</div>
      <div class="item">VAT rate</div>
      <div class="item">Price Brutto</div>
      <div class="item"></div>
    </div>
    <ProductItem v-for="(product,key) in products.products" :key="key" :product="product" />
    <paginate
      :page-count="Number(products.page_all)"
      :click-handler="paginateHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    ></paginate>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ProductItem from "@/components/products/ProductItem.vue";
export default {
  methods: {
    ...mapActions(["getProducts"]),
    ...mapMutations(["setPage"]),
    paginateHandler(page) {
      this.setPage(page);
      // this.getProducts();
    }
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

  &-columns {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px;
    box-shadow: 0px 0px 2px 1px $color3;
    @media (max-width: 850px) {
      display: none;
    }
    .item {
      flex: 1;
    }
  }
}
</style>
<style lang="scss" >
</style>