<template>
  <div class="product-item">
    <Dialog
      v-if="showDialog"
      @setAnswer="manageDeleteProduct"
      :dialogData="dialogData"
      @closed="showDialog = false"
    />

    <div class="product-item-img">
      <img :src="product.imageUrl" />
    </div>
    <div class="product-item-cell">{{product.title}}</div>
    <div class="product-item-cell">{{product.barCode}}</div>
    <div class="product-item-cell">
      {{product.price.toFixed(2)}} PLN
      <template v-if="product.priceType == 1">/ kg</template>
      <template v-else>/ szt.</template>
    </div>
    <div class="product-item-cell">{{Number(product.vatRate) * 100}} %</div>
    <div class="product-item-cell">
      {{(Number(product.vatRate) * Number(product.price) + Number(product.price)).toFixed(2)}}
      PLN
      <template
        v-if="product.priceType == 1"
      >/ kg</template>
      <template v-else>/ szt.</template>
    </div>
    <div class="product-item-cell flex">
      <button class="btn" @click="showEditProduct = true">Edit</button>
      <button class="btn" @click="showDeleteDialog()">Delete</button>
    </div>
    <Modal title="Edit product" v-if="showEditProduct" @closed="showEditProduct = false">
      <ProductForm @closed="showEditProduct = false" :productProp="product" />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import Dialog from "@/components/ui/Dialog.vue";
import ProductForm from "@/components/products/ProductForm.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showEditProduct: false,
      showDialog: false,
      dialogData: {}
    };
  },
  props: {
    product: {
      default: () => {}
    }
  },
  methods: {
    ...mapActions(["deleteProduct"]),
    showDeleteDialog() {
      this.dialogData = {
        msg: "Are you sure you want to delete this product?",
        type: "confirm"
      };
      this.showDialog = true;
    },
    manageDeleteProduct(answer) {
      this.showDialog = false;

      if (answer) {
        this.deleteProduct(this.product.id).then(() => {
          this.dialogData = {
            msg: "Product was deleted successfully",
            type: "alert"
          };
          this.showDialog = true;
        });
      }
    }
  },
  components: {
    Modal,
    ProductForm,
    Dialog
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

    .btn {
      padding: 0.2em 0;
      width: 80px;
    }
  }
}
</style>
