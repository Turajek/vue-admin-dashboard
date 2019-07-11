<template>
  <div id="app">
    <Menu :showItems="auth.isLogged" />
    <router-view class="router-view" />
    <Loader v-if="loader" />
    <Notification v-if="showNotification" />
  </div>
</template>
<script>
import Menu from "@/components/menu/Menu.vue";
import Loader from "@/components/ui/Loader.vue";
import Notification from "@/components/ui/Notification.vue";

import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Menu,
    Loader,
    Notification
  },
  methods: {
    ...mapMutations(["checkIfLogged", "setLoader"])
  },
  computed: {
    ...mapGetters(["loader", "showNotification", "auth"])
  },
  created() {
    this.setLoader(true);
    this.checkIfLogged();
    if (!this.auth.isLogged) {
      this.$router.push("/login");
    }
    this.setLoader(false);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/_generic.scss";
.router-view {
  margin-left: 200px;
  padding: 20px;
  background: $color2;
  min-height: 100vh;
  @media (max-width: 1100px) {
    margin-left: 0;
  }
}
</style>
