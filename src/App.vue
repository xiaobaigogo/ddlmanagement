<template>
  <div>
    <add-event></add-event>
    <!-- <el-change-event></el-change-event> -->
    <!-- <event-list-all></event-list-all> -->
    <!-- <show-event-table></show-event-table> -->
    <graph></graph>
  </div>
</template>

<script>
  import "element-plus/dist/index.css";
  // import "@icon-park/vue-next/styles/index.css";
  // import HelloWorld from "./components/HelloWorld.vue";
  import ElChangeEvent from "./components/ElChangeEvent.vue";
  import EventListAll from "./components/EventListAll.vue";
  import AddEvent from "./components/AddEvent.vue";
  import ShowEventTable from "./components/ShowEventTable";
  import Graph from "./components/Graph";
  import { useStore } from "vuex";
  import { reactive } from "vue";

  export default {
    name: "App",
    setup() {
      const store = useStore();

      const id = 1;

      // function openDialog() {
      //   store.commit("openDialog");
      // }

      // const eve = reactive({
      //   title: '这是一个标题',
      //   content: '这是一个内容',
      //   ddldate: 'Wed May 25 2022 17:29:42 GMT+0800 (中国标准时间)',
      //   hour: 2,
      // })

      // console.log(eve);

      // store.dispatch("addevent", eve);

      // return { id, openDialog };
    },
    components: {
      // HelloWorld,
      ElChangeEvent,
      EventListAll,
      AddEvent,
      ShowEventTable,
      Graph
    }
  };
</script>

<style lang="scss">
  @import "@/assets/normal.css";
</style>