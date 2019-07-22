<template>
  <div class="order-item">
    <Dialog
      v-if="showDialog"
      @setAnswer="manageDeleteOrder"
      :dialogData="dialogData"
      @closed="showDialog = false"
    />
    <div class="order-item-cell">
      <b>Name:</b>
      Order {{order.id}}
    </div>
    <div class="order-item-cell">
      <b>User email:</b>
      {{order.users.email}}
    </div>
    <div class="order-item-cell">
      <b>Created at:</b>
      {{new Date(order.createdAt).toLocaleDateString()}}
    </div>
    <div class="order-item-cell">
      <b>Price netto</b>
      {{netto_total.toFixed(2)}} PLN
    </div>
    <div class="order-item-cell">
      <b>Vat</b>
      {{vat_total.toFixed(2)}} PLN
    </div>
    <div class="order-item-cell">
      <b>Price brutto</b>
      {{brutto_total.toFixed(2)}} PLN
    </div>
    <!-- <div class="order-item-cell btns">
      <button class="btn" @click="showEditOrder = true">Edit</button>
      <button class="btn" @click="showDeleteDialog()">Delete</button>
    </div>-->
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import Dialog from "@/components/ui/Dialog.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      showEditOrder: false,
      showDialog: false,
      dialogData: {},
      user: {}
    };
  },
  props: {
    order: {
      default: () => {}
    }
  },
  methods: {
    ...mapActions(["deleteOrder"]),
    ...mapMutations(["setNotificationData"]),
    showDeleteDialog() {
      this.dialogData = {
        msg: "Are you sure you want to delete this order?",
        type: "confirm"
      };
      this.showDialog = true;
    },
    manageDeleteOrder(answer) {
      this.showDialog = false;

      if (answer) {
        this.deleteOrder(this.order.id).then(res => {
          if (res.status === 200) {
            this.setNotificationData({
              msg: "Order was deleted successfully",
              type: "alert"
            });
          }
        });
      }
    }
  },
  computed: {
    ...mapGetters(["users"])
  },
  components: {
    Modal,
    Dialog
  },
  created() {
    var netto_total = 0;
    var vat_total = 0;
    var brutto_total = 0;
    this.order.products.forEach(el => {
      netto_total += el.price;
      brutto_total += el.price * el.vatRate + el.price;
      vat_total += el.vatRate * el.price;
    });
    this.netto_total = netto_total;
    this.brutto_total = brutto_total;
    this.vat_total = vat_total;
  }
};
</script>
<style lang="scss" scoped>
.order-item {
  display: flex;
  align-items: center;
  text-align: center;
  background: white;
  justify-content: space-between;
  box-shadow: 0px 0px 2px 1px $color3;
  margin: 5px 0;
  padding: 0 10px;
  flex-wrap: wrap;

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
