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
        <FormItem
          v-model="user.password"
          @validate="$v.user.password.$touch"
          :validation="manageValidation('password')"
          name="Password"
          id="password"
          type="password"
        />
        <div class="genPass">
          <label>Generate password</label>
          <div class="genPass-in">
            <div class="genPass-preview">{{genPass}}</div>
            <div class="btn genPass-btn" @click="generatePassword()">Generate</div>
          </div>
        </div>
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
      validation: {},
      mode: "new",
      showDialog: false,
      dialogData: {},
      genPass: "",
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
      password: { required },
      last_name: { required }
    }
  },
  methods: {
    getRand(values) {
      return values.charAt(Math.floor(Math.random() * values.length));
    },
    generatePassword() {
      var lcLetters = "abcdefghijklmnopqrstuvwxyz";
      var ucLetters = lcLetters.toUpperCase();
      var numbers = "0123456789";
      var special = "!?=#*$@+-.";
      var pass = [];
      for (var i = 0; i < 2; ++i) {
        pass.push(this.getRand(lcLetters));
        pass.push(this.getRand(ucLetters));
        pass.push(this.getRand(numbers));
        pass.push(this.getRand(special));
      }
      this.genPass = pass.join("");
      this.user.password = this.genPass;
    },
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
        this.addUser(this.user)
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
  .genPass {
    width: 320px;
    padding: 10px;
    label {
      font-weight: bold;
    }
    &-in {
      display: flex;
      align-items: center;
    }
    &-preview {
      border: 1px solid $color1;
      padding: 10px;
      width: 100px;
      height: 40px;
      margin-right: 10px;
      font-weight: bold;
    }
    &-btn {
      margin: 0;
      padding: 0.6em;
    }
  }
}
</style>
