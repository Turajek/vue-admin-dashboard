<template>
  <div class="product-form">
    <Dialog v-if="showDialog" :dialogData="dialogData" @closed="showDialog = false" />
    <form>
      <div class="product-form-row">
        <FormItem
          v-model="product.categoryId"
          :validation="validation.categoryId"
          name="Category"
          id="category"
          type="select"
          :options="categories"
        />
        <FormItem
          v-model="product.title"
          :validation="validation.title"
          name="Title"
          id="title"
          type="text"
        />
        <FormItem
          v-model="product.barCode"
          :validation="validation.barCode"
          name="Bar code"
          id="barcode"
          type="text"
        />

        <FormItem
          v-model="product.price"
          :validation="validation.price"
          name="Price netto"
          id="price"
          type="number"
        />
        <FormItem
          v-model="product.priceType"
          :validation="validation.priceType"
          name="Price type"
          id="price_type"
          type="select"
          :options="[{id: 1, name: 'per kilogram'}, {id:2, name: 'per piece'}]"
        />
        <FormItem
          v-model="product.vatRate"
          :validation="validation.vatRate"
          name="Vat rate"
          id="vat rate"
          type="select"
          :options="[{id: 0.05, name: '5 %'}, {id:0.08, name: '8 %'}, {id:0.23, name: '23 %'}]"
        />
        <div class="product-form-photo">
          <label for="upload">Photo</label>
          <input
            id="upload"
            type="file"
            @change="manageFileUpload($event.target.files[0])"
            accept="image/*"
          />
        </div>
      </div>
      <FormItem
        ref="test"
        v-model="product.description"
        :validation="validation.description"
        name="Description"
        id="description"
        type="textarea"
      />
      <button class="btn" @click="manageAddProduct" v-if="mode == 'new'">Zapisz</button>
      <button class="btn" @click="manageEditProduct" v-if="mode == 'edit'">Zapisz</button>
    </form>
  </div>
</template>
<script>
import FormItem from "@/components/ui/FormItem.vue";
import Dialog from "@/components/ui/Dialog.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      product: {},
      formData: {},
      validation: {},
      mode: "new",
      showDialog: false,
      dialogData: {}
    };
  },
  props: {
    productProp: { default: null }
  },
  methods: {
    manageFileUpload(file) {
      let formData = new FormData();
      formData.append("image", file);
      this.formData = formData;
    },
    manageAddProduct(e) {
      e.preventDefault();
      var sendData = {
        file: this.formData,
        params: this.product
      };
      this.addProduct(sendData)
        .then(r => {
          if (r.status == 201) {
            this.$emit("closed");
            this.setNotificationData({
              msg: r.data.message,
              type: "alert"
            });
          }
        })
        .catch(err => {
          this.setNotificationData({
            msg: err.response.data.message,
            type: "error"
          });
        });
    },
    manageEditProduct(e) {
      e.preventDefault();
      var sendData = {
        file: this.formData,
        params: this.product,
        id: this.productProp.id
      };
      this.editProduct(sendData)
        .then(r => {
          if (r.status == 201) {
            this.$emit("closed");
            this.setNotificationData({
              msg: err.response.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          this.setNotificationData({
            msg: err.response.data.message,
            type: "error"
          });
        });
    },
    ...mapActions(["addProduct", "editProduct"]),
    ...mapMutations(["setNotificationData"])
  },
  computed: {
    ...mapGetters(["categories"])
  },
  components: {
    FormItem,
    Dialog
  },
  created() {
    if (this.productProp != null) {
      this.product = this.productProp;
      this.mode = "edit";
    }
  }
};
</script>
<style lang="scss" scoped>
.product-form {
  padding: 20px;
  text-align: center;
  &-row {
    display: flex;
    flex-wrap: wrap;
  }
  &-photo {
    margin: 10px auto;
    text-align: center;
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
