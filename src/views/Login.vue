<template>
  <div class="login">
    <Modal>
      <div class="login-nav">
        <button class="btn reverse" v-if="showSignIn" @click="showSignIn = false">Sign Up ?</button>
        <button class="btn reverse" v-else @click="showSignIn = true">Sign In ?</button>
      </div>
      <SignIn v-if="showSignIn" />
      <SignUp v-else />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import SignIn from "@/components/login/SignIn.vue";
import SignUp from "@/components/login/SignUp.vue";
export default {
  data() {
    return {
      showSignIn: true
    };
  },
  components: {
    Modal,
    SignIn,
    SignUp
  }
};
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
  position: relative;
  &-nav {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 10px;
  }
}
</style>
