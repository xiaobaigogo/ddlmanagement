<template>
  <div class="add-event-button" @click="openDialog">
    <span>添加DDL</span>
    <add-one class="icon" theme="outline" size="25" fill="#868383" :strokeWidth="2" strokeLinejoin="miter" />
    <change-event v-if="show" @closeDialog="closeDialog"></change-event>
  </div>
</template>

<script setup>
  import { AddOne } from "@icon-park/vue-next";
  import { useStore } from "vuex";
  import { ref } from "vue";
  import ChangeEvent from "./ChangeEvent";

  const store = useStore();

  let show = ref(false);
  function openDialog() {
    console.log('opendialog')
    show.value = true;
  }
  function closeDialog() {
    show.value = false;
  }
</script>

<style scoped lang="scss">
  .add-event-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    width: 90%;
    height: 40px;
    border: 1px solid #eee;
    border-radius: 20px;
    box-shadow: 1px 1px 5px rgba(1, 1, 1, 1/17);
    cursor: pointer;
    transition: all .3s;

    &:hover {
      box-shadow: 1px 1px 10px rgba(1, 1, 1, 1/17);
      transition: all .3s;
    }

    .icon {
      position: relative;
      top: 2px;
    }
  }
</style>