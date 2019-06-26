<template>
  <router-link :to="'/' + name">
    <div class="menu-item">
      <div class="menu-item-icon">
        <img :src="logo()">
      </div>
      <div class="menu-item-name">{{displayName}}</div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    name: {
      default: "",
      required: true
    }
  },
  methods: {
    logo() {
      return require("../../assets/images/menu/" + this.name + ".png");
    }
  },
  computed: {
    displayName() {
      var name = this.name;
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  }
};
</script>
<style lang='scss' scoped>
.menu-item {
  display: flex;
  align-items: center;
  padding: 0.2em 2em;
  margin: 0.2em 0;
  transition: background 1s;
  cursor: pointer;
  &-name {
    margin-left: 10px;
  }
  &.active,
  &:hover,
  .router-link-active & {
    background: $color2;
    color: $color1;
  }
}
</style>
