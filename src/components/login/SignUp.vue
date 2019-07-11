<template>
  <div class="sign-up">
    <h2>Sign up</h2>
    <form>
      <FormItem v-model="userData.first_name" name="First name" id="firstname" type="text" />
      <FormItem v-model="userData.last_name" name="Last name" id="lastname" type="text" />
      <FormItem v-model="userData.email" name="Email" id="email" type="text" />
      <FormItem v-model="userData.password" name="Password" id="password" type="password" />
      <button class="btn" @click="manageSignUp">Sign up</button>
    </form>
  </div>
</template>
<script>
import FormItem from "@/components/ui/FormItem.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      sent: false,
      userData: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    manageSignUp(e) {
      e.preventDefault();
      this.signUp(this.userData).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    FormItem
  }
};
</script>
<style lang="scss" scoped>
.sign-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  h2 {
    margin: 0.5em;
  }
}
</style>
