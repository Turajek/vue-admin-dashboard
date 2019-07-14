<template>
  <div class="login">
    <Modal>
      <div class="login-in">
        <h2>Sign in</h2>
        <form>
          <FormItem v-model="userData.email" name="Email" id="email" type="text" />
          <FormItem v-model="userData.password" name="Password" id="password" type="password" />
          <button class="btn" @click="manageSignIn">Sign in</button>
        </form>
      </div>
    </Modal>
  </div>
</template>
<script>
import FormItem from "@/components/ui/FormItem.vue";
import Modal from "@/components/ui/Modal.vue";
import { mapActions, mapMutations } from "vuex";
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
    ...mapMutations(["setIsLogged"]),
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
    FormItem,
    Modal
  },
  created() {
    this.setIsLogged(false);
  }
};
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
  &-in {
    padding: 1em;
  }
  h2 {
    margin: 0.5em;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
