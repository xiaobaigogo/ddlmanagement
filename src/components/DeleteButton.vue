<template>
  <i class="delete" style="font-style: normal" @click="delEvent()">
    <delete theme="outline" size="25" fill="#868383" :strokeWidth="2" strokeLinejoin="miter" class="icon" />
  </i>
</template>

<script setup>
  import { Delete } from "@icon-park/vue-next";
  import { useStore } from "vuex";

  const props = defineProps({
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  })

  const store = useStore();

  // 删除按钮
  function delEvent() {
    console.log('delete')
    store.dispatch("delevent", props.item);
  }
</script>

<style scoped lang="scss">
  $delete: "删除";

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

  .delete {
    position: relative;

    &::after {
      @include content($delete);
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