<template>
  <div class="burger">
    <div class="burger-open" @click="show = true" v-if="!show">&#9776;</div>
    <div class="burger-in" :class="{show}" @click="show = false">
      <div class="burger-close">x</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>
<style lang="scss" scoped>
.burger {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  &-open {
    font-size: 3em;
    width: 50px;
    padding-left: 10px;
    cursor: pointer;
  }
  &-close {
    font-size: 2em;
    padding: 0 0 10px 10px;
    cursor: pointer;
  }
  &-in {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px;
    background-color: rgba($color1, 1);
    color: white;
    transform: translateX(-150vw);
    width: 100vw;
    height: 100vh;
    transition: all 1s;
    &.show {
      transform: translateX(0);
    }
  }
}
</style>
