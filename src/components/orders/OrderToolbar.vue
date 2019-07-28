<template>
  <div class="orders-toolbar">
    <select @change="setOrderOrder($event.target.value)" class="orders-toolbar-item">
      <option disabled selected>Sort</option>
      <option value="3">The latest</option>
      <option value="4">The oldest</option>
    </select>
  </div>
</template>
<script>
import Modal from "@/components/ui/Modal.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      showNewOrder: false
    };
  },
  components: {
    Modal
  },
  methods: {
    ...mapMutations(["setOrderOrder"])
  }
};
</script>
<style lang="scss" scoped>
.orders-toolbar {
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  &-item {
    width: 200px;
    padding: 9px 15px;
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

