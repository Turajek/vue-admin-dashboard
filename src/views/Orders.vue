<template>
  <div class="orders">
    <div class="container">
      <h1>Orders</h1>
      <OrderToolbar />
      <OrderList />
    </div>
  </div>
</template>
<script>
import OrderList from "@/components/orders/OrderList.vue";
import OrderToolbar from "@/components/orders/OrderToolbar.vue";
export default {
  components: {
    OrderList,
    OrderToolbar
  }
};
</script>
<style lang="scss" scoped>
</style>
