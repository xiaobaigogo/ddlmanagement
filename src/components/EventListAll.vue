<template>
  <div class="event-all">
    <event-list :kind="showkind"></event-list>
    <ul class="mark">
      <li v-for="item in 4" @click="showItem(item)" :class="{show: active(item)}">
        {{getKindofEvent(item) + '的DDL'}}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { computed, ref } from "vue";
  import EventList from "./EventList.vue";
  import { getKindofEvent } from "@/common/utils";

  let showkind = ref(1);

  function showItem(kind) {
    showkind.value = kind;
  }

  function active(item) {
    return item == showkind.value;
  }

</script>

<style lang="scss" scoped>
  .event-all {
    display: flex;

    .mark {
      li {
        top: 14px;
        right: -133px;
        background: #fff;
        padding: 10px 20px;
        margin: 15px 0;
        border: 1px solid #eee;
        border-radius: 3px;
        box-shadow: 1px 1px 3px rgb(1 1 1 / 17%);
        z-index: 1;
        transition: all 0.3s;
        /* min-width: 96.588px; */

        &:hover {
          box-shadow: 1px 1px 20px rgb(1 1 1 / 17%);
          transition: all 0.3s;
          cursor: pointer;
        }
      }

      .show {
        background-color: #eee;
      }
    }


  }
</style>