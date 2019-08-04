<template>
  <div class="login">
    <Modal>
      <div class="login-in">
        <h2>Sign in</h2>
        <div class="login-intro">
          <div>
            Hi! This is demo version.
            <br />You can sign in using:
          </div>
          <div>
            Login:
            <b>admin@admin.pl</b>
          </div>
          <div>
            Password:
            <b>admin</b>
          </div>
        </div>
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
        if (res.status == 200) {
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
  &-intro {
    padding: 1em;
    border: 1px solid black;
    max-width: 300px;
    margin: 0 auto;
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
