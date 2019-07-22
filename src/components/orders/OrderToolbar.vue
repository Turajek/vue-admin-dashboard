<template>
  <div class="orders-toolbar">
    <button class="btn orders-toolbar-item" @click="showNewOrder = true">Add new order</button>
    <select @change="setOrderCategory($event.target.value)" class="orders-toolbar-item">
      <option disabled selected>Category</option>
      <option :value="null">All</option>
      <option v-for="(category,key) in categories" :key="key" :value="category.id">{{category.name}}</option>
    </select>
    <input
      placeholder="Search"
      @change="setOrderFilter($event.target.value)"
      class="orders-toolbar-item"
    />

    <select @change="setOrderOrder($event.target.value)" class="orders-toolbar-item">
      <option disabled selected>Sort</option>
      <option value="1">The cheapest</option>
      <option value="2">The most expensive</option>
      <option value="3">The latest</option>
      <option value="4">The oldest</option>
    </select>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      showNewOrder: false
    };
  },
  components: {
    Modal
  },
  methods: {
    ...mapActions(["getCategories"]),
    ...mapMutations(["setOrderOrder", "setOrderCategory", "setOrderFilter"])
  },
  computed: {
    ...mapGetters(["categories"])
  },
  created() {
    this.getCategories();
  }
};
</script>
<style lang="scss" scoped>
.orders-toolbar {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-item {
    width: 200px;
    padding: 9px 15px;
  }
  @media (max-width: 1100px) {
    justify-content: center;
    &-item {
      margin: 10px;
    }
  }
}
select,
input {
  border: 1px solid $color1;
  border-radius: 4px;
  color: $color1;
  box-shadow: none;
}
</style>

