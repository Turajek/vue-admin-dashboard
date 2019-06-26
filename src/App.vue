<template>
  <div id="app">
    <Menu/>
    <router-view class="router-view"/>
  </div>
</template>
<script>
import Menu from "@/components/menu/Menu.vue";
export default {
  components: {
    Menu
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
