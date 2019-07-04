<template>
  <div class="product-form">
    <Dialog v-if="showDialog" :dialogData="dialogData" @closed="showDialog = false" />
    <form>
      <div class="product-form-row">
        <FormItem
          v-model="product.categoryId"
          @validate="$v.product.categoryId.$touch"
          :validation="manageValidation('categoryId')"
          name="Category"
          id="category"
          type="select"
          :options="categories"
        />
        <FormItem
          v-model="product.title"
          @validate="$v.product.title.$touch"
          :validation="manageValidation('title')"
          name="Title"
          id="title"
          type="text"
        />
        <FormItem
          v-model="product.barCode"
          @validate="$v.product.barCode.$touch"
          :validation="manageValidation('barCode')"
          name="Bar code"
          id="barcode"
          type="text"
        />

        <FormItem
          v-model="product.price"
          @validate="$v.product.price.$touch"
          :validation="manageValidation('price')"
          name="Price netto"
          id="price"
          type="number"
        />
        <FormItem
          v-model="product.priceType"
          @validate="$v.product.priceType.$touch"
          :validation="manageValidation('priceType')"
          name="Price type"
          id="price_type"
          type="select"
          :options="[{id: 1, name: 'per kilogram'}, {id:2, name: 'per piece'}]"
        />
        <FormItem
          v-model="product.vatRate"
          @validate="$v.product.vatRate.$touch"
          :validation="manageValidation('vatRate')"
          name="Vat rate"
          id="vat rate"
          type="select"
          :options="[{id: 0.05, name: '5 %'}, {id:0.08, name: '8 %'}, {id:0.23, name: '23 %'}]"
        />
        <div class="product-form-photo">
          <label for="upload">Photo</label>
          <input
            id="file"
            type="file"
            @change="manageFileUpload($event.target.files[0])"
            accept="image/*"
          />
          <div class="product-form-validation" v-if="showImgValidation">{{validationMsg.image}}</div>
        </div>
      </div>
      <FormItem
        v-model="product.description"
        @validate="$v.product.description.$touch"
        :validation="manageValidation('description')"
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
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      product: {},
      formData: {},
      validation: {},
      mode: "new",
      showDialog: false,
      dialogData: {},
      validationMsg: {
        required: "This field is required",
        length5: "This field should be at least 5 char long",
        length10: "This field should be at least 10 char long",
        image: "Please attach a photo"
      },
      showImgValidation: false
    };
  },
  props: {
    productProp: { default: null }
  },
  validations: {
    product: {
      title: {
        required,
        length5: minLength(5)
      },
      categoryId: { required },
      price: { required },
      priceType: { required },
      barCode: {
        required,
        length5: minLength(5)
      },
      vatRate: { required },
      description: {
        required,
        length10: minLength(10)
      }
    }
  },
  methods: {
    manageValidation(property) {
      var resultArr = [];
      if (this.$v.product[property].$error) {
        Object.keys(this.$v.product[property].$params).forEach(key => {
          if (!this.$v.product[property][key]) {
            resultArr.push(this.validationMsg[key]);
          }
        });
        return resultArr;
      } else {
        return resultArr;
      }
    },
    manageFileUpload(file) {
      this.showImgValidation = false;
      let formData = new FormData();
      formData.append("image", file);
      this.formData = formData;
    },
    manageAddProduct(e) {
      e.preventDefault();
      var fileValidate = document.querySelector("#file").files.length > 0;
      this.showImgValidation = !fileValidate;
      this.$v.$touch();
      if (!this.$v.product.$invalid && fileValidate) {
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
      }
    },
    manageEditProduct(e) {
      e.preventDefault();
      e.preventDefault();
      var fileValidate = document.querySelector("#file").files.length > 0;
      this.showImgValidation = !fileValidate;
      this.$v.$touch();
      if (!this.$v.product.$invalid && fileValidate) {
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
      }
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
    justify-content: center;
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
  &-validation {
    color: red;
    font-weight: bold;
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
