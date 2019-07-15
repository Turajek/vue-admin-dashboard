<template>
  <div class="home">
    <div class="home-intro">
      <h2>Welcome in Grocery Store Admin Dashboard!</h2>
      <p>This is simple project made to present my sample code in Vue.js.</p>
    </div>

    <div class="home-tiles">
      <router-link v-for="(item,key) in items" :key="key" :to="'/' + item">
        <div class="home-tiles-item">
          <div class="home-tiles-item-icon">
            <img :src="logo(item)" />
          </div>
          <div class="home-tiles-item-name">{{item.charAt(0).toUpperCase() + item.slice(1)}}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      items: ["products", "orders", "users"]
    };
  },
  methods: {
    logo(name) {
      return require("../assets/images/menu/" + name + ".png");
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  &-intro {
    text-align: center;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 450px) {
      // padding-top: 50px;
      height: 30%;
    }
  }
  &-tiles {
    max-width: 600px;
    display: flex;
    height: 70%;
    flex-direction: column;
    justify-content: space-around;
    margin: 0 auto;
    font-size: 1.4em;
    &-item {
      display: flex;
      padding: 40px;
      max-width: 90vw;
      justify-content: center;
      align-items: center;
      border: 1px solid $color1;
      &:hover {
        background: $color1;
        color: white;
      }
      &-icon {
        margin-right: 10px;
      }
    }
  }
}
</style>

