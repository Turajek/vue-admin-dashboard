<template>
  <div class="products-toolbar">
    <button class="btn products-toolbar-item" @click="showNewProduct = true">Add new product</button>
    <select @change="setProductCategory($event.target.value)" class="products-toolbar-item">
      <option disabled selected>Category</option>
      <option :value="null">All</option>
      <option v-for="(category,key) in categories" :key="key" :value="category.id">{{category.name}}</option>
    </select>
    <input
      placeholder="Search"
      @change="setProductFilter($event.target.value)"
      class="products-toolbar-item"
    />

    <select @change="setProductOrder($event.target.value)" class="products-toolbar-item">
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
import { mapActions, mapMutations, mapGetters } from "vuex";
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
    ...mapMutations(["setProductOrder", "setProductCategory", "setProductFilter"])
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
.products-toolbar {
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

