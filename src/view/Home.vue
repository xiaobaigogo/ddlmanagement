<template>
  <div>
    <add-event class="add"></add-event>
    <div class="both">
      <graph class="graph"></graph>
      <event-list-all class="list"></event-list-all>
    </div>
  </div>
</template>

<script setup>
  import Graph from "@/components/Graph.vue";
  import EventListAll from "@/components/EventListAll.vue";
  import AddEvent from "@/components/AddEvent.vue";
</script>

<style scoped lang="scss">
  .both {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    .graph {
      flex-basis: 60%;
      /* min-width: 500px; */
      flex-grow: 1;
      flex-shrink: 1;
      margin-right: 20px;
    }
  }
</style>