<template>
  <div>
    <div v-if="dialogData.type == 'confirm'" class="c-dialog-big">
      <div class="c-dialog">
        <div class="c-dialog-msg">{{ dialogData.msg }}</div>
        <div class="c-dialog-Btns">
          <div @click="answerYes()" class="btn">Yes</div>
          <div @click="answerCancel()" class="btn">Cancel</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialogData: {
      default: () => {}
    }
  },
  methods: {
    answerYes() {
      this.$emit("setAnswer", true);
    },
    answerCancel() {
      this.$emit("setAnswer", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-dialog {
  min-width: 250px;
  position: fixed;
  top: 20vh;
  left: 50%;
  padding: 20px 30px 10px 30px;
  text-align: center;
  transform: translate(-50%);
  background: #ffffff;
  box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.1);

  &-Btns {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  &-big {
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0);
    z-index: 100000;
  }
  .btn {
    width: 80px;
    padding: 10px 0;
    margin: 10px;
  }
}
</style>
