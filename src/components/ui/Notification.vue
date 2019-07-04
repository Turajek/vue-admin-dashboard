<template>
  <div>
    <div v-if="notificationData.type == 'alert'" class="alert success">
      {{ notificationData.msg }} .
      <div @click="setShowNotification(false)" class="close">
        <svg
          class="alert__icon"
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="aalert__icon-path"
            cx="32"
            cy="32"
            r="25.0"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            class="alert__icon-path alert__icon-path--type"
            d="M20 44L44 20"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            class="alert__icon-path alert__icon-path--type"
            d="M44 44L20 20"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
    <div v-if="notificationData.type == 'error'" class="alert danger">
      <strong>{{ notificationData.msg }}</strong>
      <div @click="setShowNotification(false)" class="close">
        <svg
          class="alert__icon"
          width="48"
          height="48"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="aalert__icon-path"
            cx="32"
            cy="32"
            r="25.0"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            class="alert__icon-path alert__icon-path--type"
            d="M20 44L44 20"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            class="alert__icon-path alert__icon-path--type"
            d="M44 44L20 20"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["notificationData"])
  },
  methods: {
    ...mapMutations(["setShowNotification"])
  },
  created() {
    if (this.notificationData.type == "alert") {
      setTimeout(() => {
        this.setShowNotification(false);
      }, 5000);
    }
  }
};
</script>
<style lang="scss" scoped>
.alert {
  position: fixed;
  padding: 20px 0;
  top: 10px;
  left: 210px;
  width: calc(100% - 200px);
  text-align: center;
  color: red;
  z-index: 1200;
  &.danger {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
  }
  &.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  .close {
    position: absolute;
    right: 20px;
    cursor: pointer;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

