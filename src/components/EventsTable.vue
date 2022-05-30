<template>
  <div>
    <table>
      <thead>
        <tr>
          <th class="index"></th>
          <th class="kind">类型</th>
          <th class="title">标题</th>
          <th class="content">内容</th>
          <th class="ddldate">DDL</th>
          <th class="operate" style="justify-content: center;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event,index) in events" :key="event.id" :class="index & 1? 'row-light' : ''">
          <td class="index">{{index + 1}}</td>
          <td class="kind">{{getKindofEvent(event.kind)}}</td>
          <td v-if="props.keyword == ''" class="title">{{event.title}}</td>
          <td v-else class="title" v-html="highlightText(event.title)"></td>
          <td v-if="props.keyword == ''" class="content">{{event.content}}</td>
          <td v-else class="content" v-html="highlightText(event.content)"></td>
          <td class="ddldate">{{getTime(event.timestamp)}}</td>
          <td class="operate">
            <delete-button :item="event"></delete-button>
            <edit-button @click="openDiaglog(event.id)"></edit-button>
          </td>
        </tr>
        <tr v-if="events.length == 0" style="display: flex; justify-content: center;">
          <el-empty description="这里空空如也哦"></el-empty>
        </tr>
      </tbody>
    </table>
    <el-change-event v-if="show" :id="curid" @closeDialog="closeDialog"></el-change-event>
  </div>
</template>

<script setup>
  import { computed, watch, ref } from "vue";
  import { useStore } from "vuex";
  import { getKindofEvent } from "@/common/utils";
  import { ElEmpty } from "element-plus";
  import DeleteButton from "./DeleteButton";
  import EditButton from "./EditButton";

  const props = defineProps({
    keyword: {
      type: String,
      default: ""
    },
    kind: {
      type: Number,
      default: 0
    },
    daterange: {
      type: Array,
      default() {
        return [];
      }
    }
  })

  const store = useStore();

  const events = computed(() => {
    return store.getters.showEvents(props.kind, props.daterange, props.keyword);
  })

  // 搜索结果高亮
  function highlightText(text) {
    const reg = new RegExp(props.keyword, 'gi');
    const hightlight = text.replace(reg, `<span style="color: red">${props.keyword}</span>`)
    return hightlight;
  }

  function getTime(timestamp) {
    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    return year + "-" + month + "-" + day + "  " + hour + "时";
  }

  // 编辑功能
  let show = ref(false);
  let curid = ref(0);
  function openDiaglog(id) {
    curid.value = id;
    show.value = true;
  }
  function closeDialog() {
    curid.value = 0;
    show.value = false;
  }



</script>

<style scoped lang="scss">
  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 10px;
    box-shadow: 1px 1px 10px rgba(1, 1, 1, 1/20);

    tr {
      display: flex;
      align-items: center;
      min-height: 50px;

      .index {
        flex-basis: 20px;
        flex-grow: 0;
        text-align: center;
      }

      .kind {
        flex-basis: 100px;
        flex-grow: 0;
        text-align: center;
      }

      .title {
        flex-basis: 20%;
        flex-grow: 1;
      }

      .content {
        flex-basis: 40%;
        flex-grow: 2;
      }

      .ddldate {
        flex-basis: 120px;
        flex-shrink: 0;
        flex-grow: 1;
      }

      .operate {
        flex-basis: 60px;
        flex-shrink: 0;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
      }
    }

    .row-light {
      background-color: #eee;
    }
  }
</style>