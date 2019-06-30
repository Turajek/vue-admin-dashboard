<template>
  <div class="product-item">
    <div class="product-item-img">
      <img :src="product.imageUrl">
    </div>
    <div class="product-item-cell">{{product.title}}</div>
    <div class="product-item-cell">{{product.barCode}}</div>
    <div class="product-item-cell">
      {{product.price.toFixed(2)}} PLN netto
      <template v-if="product.priceType == 1">/ kg</template>
      <template v-else>/ szt.</template>
    </div>
    <div class="product-item-cell">{{Number(product.vatRate) * 100}} %</div>
    <div class="product-item-cell">
      {{(Number(product.vatRate) * Number(product.price) + Number(product.price)).toFixed(2)}}
      PLN brutto
      <template
        v-if="product.priceType == 1"
      >/ kg</template>
      <template v-else>/ szt.</template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      default: () => {}
    }
  }
};
</script>
<style lang="scss" scoped>
.product-item {
  display: flex;
  align-items: center;
  text-align: center;
  background: white;
  justify-content: space-between;
  box-shadow: 0px 0px 2px 1px $color3;
  margin: 5px 0;
  padding: 0 10px;
  &-img {
    flex: 1;
    img {
      height: 50px;
    }
  }
  &-cell {
    flex: 1;
  }
}
</style>
