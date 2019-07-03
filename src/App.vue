<template>
  <div id="app">
    <Menu />
    <router-view class="router-view" />
    <Loader v-if="loader" />
    <Notification v-if="showNotification" />
  </div>
</template>
<script>
import Menu from "@/components/menu/Menu.vue";
import Loader from "@/components/ui/Loader.vue";
import Notification from "@/components/ui/Notification.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    Menu,
    Loader,
    Notification
  },
  computed: {
    ...mapGetters(["loader", "showNotification"])
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
}
</style>
