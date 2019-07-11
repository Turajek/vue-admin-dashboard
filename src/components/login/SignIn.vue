<template>
  <div class="sign-in">
    <h2>Sign in</h2>
    <form>
      <FormItem v-model="userData.email" name="Email" id="email" type="text" />
      <FormItem v-model="userData.password" name="Password" id="password" type="password" />
      <button class="btn" @click="manageSignIn">Sign in</button>
    </form>
  </div>
</template>
<script>
import FormItem from "@/components/ui/FormItem.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      userData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    manageSignIn(e) {
      e.preventDefault();
      this.signIn(this.userData).then(res => {
        if ((res.status = 201)) {
          this.$router.push("/");
        }
      });
    }
  },
  components: {
    FormItem
  }
};
</script>
<style lang="scss" scoped>
.sign-in {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em 0;
  h2 {
    margin: 0.5em;
  }
}
</style>
