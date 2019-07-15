<template>
  <div class="userList">
    <div class="userList-columns">
      <div class="item">Email</div>
      <div class="item">First name</div>
      <div class="item">Last name</div>
      <div class="item">Permission level</div>
      <div class="item">Created at</div>
      <div class="item"></div>
    </div>
    <UserItem v-for="(user,key) in users.users" :key="key" :user="user" />
    <paginate
      :page-count="Number(users.page_all)"
      :click-handler="paginateHandler"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
    ></paginate>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import UserItem from "@/components/users/UserItem.vue";
export default {
  methods: {
    ...mapMutations(["setUserPage"]),
    ...mapActions(["getUsers"]),
    paginateHandler(nr) {
      this.setUserPage(nr);
    }
  },
  computed: {
    ...mapGetters(["users"])
  },
  components: {
    UserItem
  },
  created() {
    this.getUsers();
  }
};
</script>
<style lang="scss" scoped>
.userList {
  padding: 10px;
  &-columns {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 10px;
    box-shadow: 0px 0px 2px 1px $color3;
    @media (max-width: 850px) {
      display: none;
    }
    .item {
      flex: 1;
    }
  }
}
</style>
