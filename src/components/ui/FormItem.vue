<template>
  <div class="formItem" :class="{input: type != 'textarea'}">
    <label :for="id">{{ name }}</label>
    <select
      v-if="type == 'select'"
      :type="type"
      :id="id"
      :value="value"
      :name="name"
      @input="$emit('change', $event.target.value)"
      @blur="$emit('validate')"
      :class="{invalid}"
    >
      <option v-for="(option, key) in options" :key="key" :value="option.id">{{option.name}}</option>
    </select>
    <textarea
      v-if="type == 'textarea'"
      :id="id"
      :value="value"
      :name="name"
      rows="4"
      @input="$emit('change', $event.target.value)"
      @blur="$emit('validate')"
      :class="{invalid}"
    />
    <input
      v-if="type != 'textarea' && type!= 'select'"
      :type="type"
      :id="id"
      :value="value"
      :name="name"
      @input="$emit('change', $event.target.value)"
      @blur="$emit('validate')"
      :class="{invalid}"
    />
    <div class="formItem-validation" v-for="(value,key) in validation" :key="key">
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: { default: "" },
    name: { default: "", required: true },
    validation: { default: "" },
    type: { default: "", required: true },
    className: { default: "" },
    id: { default: "" },
    options: { default: () => {} }
  },
  computed: {
    invalid() {
      return this.validation.length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
input,
select,
textarea {
  width: 100%;
  min-height: 42px;
  padding: 9px 15px;
  border: 1px solid $color3;
  border-radius: 4px;
  background: #ffffff;
  color: #2f3538;
  font-size: 14.4px;
  line-height: 22.5px;
  box-shadow: none;
  &.invalid {
    border: 1px solid red;
  }
}

label {
  font-weight: bold;
  text-align: center;
}
.formItem {
  padding: 10px;
  text-align: center;
  &.input {
    width: 320px;
  }
  &-validation {
    color: red;
    font-weight: bold;
  }
}
</style>
