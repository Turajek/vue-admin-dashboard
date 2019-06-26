<template>
  <div class="menu">
    <router-link to="/">
      <div class="menu-logo">
        <img src="@/assets/images/logo.png">
      </div>
    </router-link>
    <MenuItem v-for="(item, key) in items" :key="key" :name="item"/>
  </div>
</template>
<script>
import MenuItem from "@/components/menu/MenuItem.vue";
export default {
  data() {
    return {
      items: ["products", "orders", "users"]
    };
  },
  components: {
    MenuItem
  }
};
</script>
<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  box-shadow: 5px -10px 20px rgba(0, 0, 0, 0.1);
  background: $color1;
  color: white;
  &-logo {
    padding: 20px;
  }
}
</style>

