<template>
  <div class="modal">
    <div class="modal-in">
      <div class="modal-header">
        <h2>{{title}}</h2>
        <div class="modal-close" @click="$emit('closed')">
          <img src="@/assets/images/close.svg" />
        </div>
      </div>
      <div class="modal-wrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba($color1, 0.8);
  z-index: 1000;
  &-in {
    width: 700px;
    height: 90vh;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
  }
  &-close {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 2em;
    width: 40px;
    cursor: pointer;
  }
  &-header {
    height: 50px;
    border-bottom: 1px solid $color3;
    text-align: center;
    padding: 10px;
  }
}
</style>
