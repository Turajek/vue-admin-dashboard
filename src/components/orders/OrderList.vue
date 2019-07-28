<template>
  <div class="order-list">
    <div class="order-list-columns">
      <div class="item">Name</div>
      <div class="item bigger">User email</div>
      <div class="item">Created at</div>
      <div class="item">Price netto</div>
      <div class="item">Vat</div>
      <div class="item">Price brutto</div>
      <div class="item"></div>
    </div>
    <OrderItem v-for="(order,key) in orders.orders" :key="key" :order="order" />
    <paginate
      :page-count="Number(orders.page_all)"
      :click-handler="paginateHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    ></paginate>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import OrderItem from "@/components/orders/OrderItem.vue";
export default {
  methods: {
    ...mapActions(["getOrders"]),
    ...mapMutations(["setOrderPage"]),
    paginateHandler(page) {
      this.setOrderPage(page);
      // this.getOrders();
    }
  },
  computed: {
    ...mapGetters(["orders"])
  },
  components: {
    OrderItem
  },
  created() {
    this.getOrders();
  }
};
</script>
<style lang="scss" scoped>
.order-list {
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
      &.bigger {
        flex: 2;
      }
    }
  }
}
</style>
<style lang="scss" >
</style>