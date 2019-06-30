<template>
  <div class="products-toolbar">
    <button class="btn" @click="showNewProduct = true">Add new product</button>
    <Modal title="Add new product" v-if="showNewProduct" @closed="showNewProduct = false">
      <ProductForm @closed="showNewProduct = false" />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import { mapActions } from "vuex";
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
    ...mapActions(["getCategories"])
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
}
</style>

