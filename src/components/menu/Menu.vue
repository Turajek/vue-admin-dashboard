<template>
  <div class="menu">
    <div class="menu-desktop">
      <router-link to="/">
        <div class="menu-logo">
          <img src="@/assets/images/logo.png" />
        </div>
      </router-link>
      <template v-if="showItems">
        <MenuItem v-for="(item, key) in items" :key="key" :name="item" />
      </template>
    </div>
    <Burger class="menu-burger">
      <MenuItem v-for="(item, key) in items" :key="key" :name="item" />
    </Burger>
  </div>
</template>
<script>
import MenuItem from "@/components/menu/MenuItem.vue";
import Burger from "@/components/ui/Burger.vue";
export default {
  data() {
    return {
      items: ["products", "orders", "users"]
    };
  },
  props: {
    showItems: { default: true }
  },
  components: {
    MenuItem,
    Burger
  }
};
</script>
<style lang="scss" scoped>
.menu {
  &-desktop {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 200px;
    box-shadow: 5px -10px 20px rgba(0, 0, 0, 0.1);
    background: $color1;
    color: white;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &-burger {
    @media (min-width: 1100px) {
      display: none;
    }
  }
  &-logo {
    padding: 20px;
  }
}
</style>

