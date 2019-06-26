<template>
  <div class="product-item">
    <div class="product-item-img">
      <img :src="product.imageUrl">
    </div>
    <div class="product-item-cell">{{product.title}}</div>
    <div class="product-item-cell">{{product.description}}</div>
    <div class="product-item-cell">{{product.price.toFixed(2)}} PLN netto</div>
    <div class="product-item-cell">{{new Date(product.createdAt).toLocaleDateString('pl')}}</div>
    <div class="product-item-cell">{{new Date(product.updatedAt).toLocaleDateString('pl')}}</div>
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
  background: white;
  justify-content: space-between;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.35);
  margin: 10px;
  padding: 10px;
  &-img {
    flex: 1;
    img {
      width: 40%;
    }
  }
  &-cell {
    flex: 1;
  }
}
</style>
