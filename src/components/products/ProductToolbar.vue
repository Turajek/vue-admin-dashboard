<template>
  <div class="products-toolbar">
    <button class="btn" @click="showNewProduct = true">Add new product</button>
    <select @change="setCategory($event.target.value)">
      <option disabled selected>Category</option>
      <option :value="null">All</option>
      <option value="1">Fruits</option>
      <option value="2">Vegetables</option>
    </select>

    <select @change="setOrder($event.target.value)">
      <option disabled selected>Sort</option>
      <option value="1">The cheapest</option>
      <option value="2">The most expensive</option>
      <option value="3">The latest</option>
      <option value="4">The oldest</option>
    </select>
    <Modal title="Add new product" v-if="showNewProduct" @closed="showNewProduct = false">
      <ProductForm @closed="showNewProduct = false" />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      showNewProduct: false
    };
  },
  components: {
    Modal,
    ProductForm
  },
  methods: {
    ...mapActions(["getCategories"]),
    ...mapMutations(["setOrder", "setCategory"])
  },
  created() {
    this.getCategories();
  }
};
</script>
<style lang="scss" scoped>
.products-toolbar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
select {
  width: 200px;
  padding: 9px 15px;
  border: 1px solid $color1;
  border-radius: 4px;
  color: $color1;
  font-size: 14.4px;
  box-shadow: none;
}
</style>

