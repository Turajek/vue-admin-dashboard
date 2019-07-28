<template>
  <div class="product-list">
    <div class="product-list-columns">
      <div class="item">Photo</div>
      <div class="item">Title</div>
      <div class="item">Bar code</div>
      <div class="item">Price netto</div>
      <div class="item">VAT rate</div>
      <div class="item">Price Brutto</div>
      <div class="item" v-if="mode != 'order'"></div>
    </div>
    <ProductItem v-for="(product,key) in products" :key="key" :product="product" :mode="mode" />
    <paginate
      v-if="mode == 'normal'"
      :page-count="Number(page_all)"
      :click-handler="paginateHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    ></paginate>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ProductItem from "@/components/products/ProductItem.vue";
export default {
  methods: {
    ...mapMutations(["setProductPage"]),
    paginateHandler(page) {
      this.setProductPage(page);
    }
  },
  props: {
    products: {
      default: () => []
    },
    page_all: {
      default: 1
    },
    mode: {
      default: "normal"
    }
  },

  components: {
    ProductItem
  }
};
</script>
<style lang="scss" scoped>
.product-list {
  color: black;
  &.order {
    padding: 10px;
  }

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