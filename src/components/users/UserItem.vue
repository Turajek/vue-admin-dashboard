<template>
  <div class="user-item">
    <Dialog
      v-if="showDialog"
      @setAnswer="manageDeleteuser"
      :dialogData="dialogData"
      @closed="showDialog = false"
    />

    <div class="user-item-cell">
      <b>Email:</b>
      {{user.email}}
    </div>
    <div class="user-item-cell">
      <b>First name:</b>
      {{user.first_name}}
    </div>
    <div class="user-item-cell">
      <b>Last name:</b>
      {{user.last_name}}
    </div>
    <div class="user-item-cell">
      <b>Created at:</b>
      {{new Date(user.createdAt).toLocaleDateString()}}
    </div>

    <div class="user-item-cell btns">
      <button class="btn" @click="showEditUser = true">Edit</button>
      <button class="btn" @click="showDeleteDialog()">Delete</button>
    </div>
    <Modal title="Edit user" v-if="showEditUser" @closed="showEditUser = false">
      <UserForm @closed="showEditUser = false" :userProp="user" />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import Dialog from "@/components/ui/Dialog.vue";
import UserForm from "@/components/users/UserForm.vue";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      showEditUser: false,
      showDialog: false,
      dialogData: {}
    };
  },
  props: {
    user: {
      default: () => {}
    }
  },
  methods: {
    ...mapActions(["deleteUser"]),
    ...mapMutations(["setNotificationData"]),
    showDeleteDialog() {
      this.dialogData = {
        msg: "Are you sure you want to delete this user?",
        type: "confirm"
      };
      this.showDialog = true;
    },
    manageDeleteuser(answer) {
      this.showDialog = false;

      if (answer) {
        this.deleteUser(this.user.id).then(res => {
          if (res.status === 200) {
            this.setNotificationData({
              msg: "User was deleted successfully",
              type: "alert"
            });
          }
        });
      }
    }
  },
  components: {
    Modal,
    UserForm,
    Dialog
  }
};
</script>
<style lang="scss" scoped>
.user-item {
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
