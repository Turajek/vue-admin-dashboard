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
    <div class="product-item-cell">
      <b>Title:</b>
      {{product.title}}
    </div>
    <div class="product-item-cell">
      <b>Bar code:</b>
      {{product.barCode}}
    </div>
    <div class="product-item-cell">
      <b>Price:</b>
      {{product.price.toFixed(2)}} PLN
      <template v-if="product.priceType == 1">/ kg</template>
      <template v-else>/ ppc.</template>
    </div>
    <div class="product-item-cell">
      <b>Vat rate:</b>
      {{Number(product.vatRate) * 100}} %
    </div>
    <div class="product-item-cell">
      <b>Price brutto:</b>
      {{(Number(product.vatRate) * Number(product.price) + Number(product.price)).toFixed(2)}}
      PLN
      <template
        v-if="product.priceType == 1"
      >/ kg</template>
      <template v-else>/ szt.</template>
    </div>
    <div class="product-item-cell btns" v-if="mode != 'order'">
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
import { mapActions, mapMutations } from "vuex";
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
    },
    mode: {
      default: "normal"
    }
  },
  methods: {
    ...mapActions(["deleteProduct"]),
    ...mapMutations(["setNotificationData"]),
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
        this.deleteProduct(this.product.id).then(res => {
          if (res.status === 200) {
            this.setNotificationData({
              msg: "Product was deleted successfully",
              type: "alert"
            });
          }
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
  flex-wrap: wrap;
  min-height: 52px;

  b {
    display: none;
    width: 50%;
  }
  &-img {
    flex: 1;
    text-align: center;
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
  @media (max-width: 850px) {
    text-align: left;
    padding: 10px;
    width: 100%;
    max-width: 300px;
    margin: 5px auto;
    b {
      display: inline-block;
    }
    &-img,
    &-cell {
      flex: 1 100%;
      margin: 3px;
      img {
        height: 150px;
      }
      &.btns {
        display: flex;
        justify-content: center;
        padding: 10px 0;
        .btn {
          padding: 10px 20px;
          width: 40%;
        }
      }
    }
  }
}
</style>
