
<template>
  <div class="users">
    <h1>Users</h1>
    <UserToolbar />
    <UserList />
  </div>
</template>

<script>
import UserList from "@/components/users/UserList.vue";
import UserToolbar from "@/components/users/UserToolbar.vue";
export default {
  components: {
    UserList,
    UserToolbar
  }
};
</script>

<style>
</style>
