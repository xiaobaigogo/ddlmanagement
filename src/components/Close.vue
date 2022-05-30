<template>
  <span id="close" @click="func">
  </span>
</template>

<script setup>
const props = defineProps({
  func: Function
});
</script>

<style scoped>
#close {
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url(@/assets/icon/close.svg);
}
</style>