<template>
  <div>
    <search-event ref="searchRef"></search-event>
    <events-table :kind="kind" :keyword="keyword" :daterange="daterange">
    </events-table>
    <button @click="getRef">click</button>
  </div>
</template>

<script setup>
  import { ref, watch, computed } from "vue";
  import SearchEvent from "./SearchEvent.vue";
  import EventsTable from "./EventsTable.vue";

  const searchRef = ref("");

  let kind = computed(() => {
    return searchRef.value.select;
  })

  let keyword = computed(() => {
    return searchRef.value.searchcontent;
  })

  let daterange = computed(() => {
    // 因为daterange返回的最后一天是0时，但是需求是当天的ddl都要显示，所以要改成23时
    return searchRef.value.daterange && searchRef.value.daterange.map((item, index, arr) => {
      if (index == arr.length - 1) {
        return item.getTime() + 1000 * 3600 * 23;
      } else {
        return item.getTime();
      }
    });
  })

</script>

<style scoped>

</style>