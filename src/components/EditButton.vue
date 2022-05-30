<template>
  <i class="edit" style="font-style: normal">
    <editor class="icon" theme="outline" size="25" fill="#868383" :strokeWidth="2" strokeLinejoin="miter" />
  </i>
</template>

<script setup>
  import { Editor } from "@icon-park/vue-next";
  import { useStore } from "vuex";

</script>

<style scoped lang="scss">
  $edit: "编辑";

  @mixin content($cont) {
    position: absolute;
    cursor: pointer;
    /* background-color: #fff; */
    /* top: -7px; */
    width: 140%;
    height: 120%;
    content: $cont;
    left: -7px;
    text-align: center;
    line-height: 150%;
    z-index: 999;
  }

  .edit {
    position: relative;

    &::after {
      @include content($edit);
      visibility: hidden;
    }

    /* :hover */
    &:hover {
      .icon {
        visibility: hidden;
      }

      &::after {
        visibility: visible;
      }
    }
  }
</style>