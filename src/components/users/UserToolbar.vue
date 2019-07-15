<template>
  <div class="users-toolbar">
    <button class="btn users-toolbar-item" @click="showNewUser = true">Add new user</button>
    <select @change="setUserRole($event.target.value)" class="users-toolbar-item">
      <option disabled selected>Permission level</option>
      <option :value="null">All</option>
      <option :value="1">User</option>
      <option :value="2">Admin</option>
    </select>
    <input
      placeholder="Search"
      @change="setUserFilter($event.target.value)"
      class="users-toolbar-item"
    />

    <select @change="setUserOrder($event.target.value)" class="users-toolbar-item">
      <option disabled selected>Sort</option>
      <option value="1">The latest</option>
      <option value="2">The oldest</option>
    </select>
    <Modal title="Add new user" v-if="showNewUser" @closed="showNewUser = false">
      <UserForm @closed="showNewUser = false" />
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import UserForm from "@/components/users/UserForm.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      showNewUser: false
    };
  },
  components: {
    Modal,
    UserForm
  },
  methods: {
    ...mapActions(["getCategories"]),
    ...mapMutations(["setUserOrder", "setUserRole", "setUserFilter"])
  },
  computed: {
    ...mapGetters(["categories"])
  },
  created() {
    this.getCategories();
  }
};
</script>
<style lang="scss" scoped>
.users-toolbar {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &-item {
    width: 200px;
    padding: 9px 15px;
  }
  @media (max-width: 1100px) {
    justify-content: center;
    &-item {
      margin: 10px;
    }
  }
}
select,
input {
  border: 1px solid $color1;
  border-radius: 4px;
  color: $color1;
  box-shadow: none;
}
</style>

