<template>
  <div class="user-form">
    <Dialog v-if="showDialog" :dialogData="dialogData" @closed="showDialog = false" />
    <form>
      <div class="user-form-row">
        <FormItem
          v-model="user.role_id"
          @validate="$v.user.role_id.$touch"
          :validation="manageValidation('role_id')"
          name="Permission level"
          id="permission"
          type="select"
          :options="[{id:1, name:'User'},{id:2, name:'Admin'}]"
        />
        <FormItem
          v-model="user.email"
          @validate="$v.user.email.$touch"
          :validation="manageValidation('email')"
          name="Email"
          id="email"
          type="text"
        />
        <FormItem
          v-model="user.first_name"
          @validate="$v.user.first_name.$touch"
          :validation="manageValidation('first_name')"
          name="First name"
          id="first_name"
          type="text"
        />
        <FormItem
          v-model="user.last_name"
          @validate="$v.user.last_name.$touch"
          :validation="manageValidation('last_name')"
          name="Last name"
          id="last_name"
          type="text"
        />
      </div>

      <button class="btn" @click="manageAddUser" v-if="mode == 'new'">Zapisz</button>
      <button class="btn" @click="manageEditUser" v-if="mode == 'edit'">Zapisz</button>
    </form>
  </div>
</template>
<script>
import FormItem from "@/components/ui/FormItem.vue";
import Dialog from "@/components/ui/Dialog.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      user: {},
      formData: {},
      validation: {},
      mode: "new",
      showDialog: false,
      dialogData: {},
      validationMsg: {
        required: "This field is required",
        email: "Please enter correct email"
      }
    };
  },
  props: {
    userProp: { default: null }
  },
  validations: {
    user: {
      role_id: { required },
      email: { required, email },
      first_name: { required },
      last_name: { required }
    }
  },
  methods: {
    manageValidation(property) {
      var resultArr = [];
      if (this.$v.user[property].$error) {
        Object.keys(this.$v.user[property].$params).forEach(key => {
          if (!this.$v.user[property][key]) {
            resultArr.push(this.validationMsg[key]);
          }
        });
        return resultArr;
      } else {
        return resultArr;
      }
    },
    manageAddUser(e) {
      e.preventDefault();
      this.$v.$touch();
      if (!this.$v.user.$invalid) {
        var sendData = {
          params: this.user
        };
        this.addUser(sendData)
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
    manageEditUser(e) {
      e.preventDefault();
      this.$v.$touch();
      if (!this.$v.user.$invalid) {
        var sendData = {
          params: this.user,
          id: this.userProp.id
        };

        this.editUser(sendData)
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
    ...mapActions(["addUser", "editUser"]),
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
    if (this.userProp != null) {
      this.user = this.userProp;
      this.mode = "edit";
    }
  }
};
</script>
<style lang="scss" scoped>
.user-form {
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
