<template>
  <div>
    <h2>数据预览</h2>
    <table ref="table">
      <thead>
        <tr>
          <th class="index">序号</th>
          <th class="kind">类型</th>
          <th class="title">标题</th>
          <th class="content">内容</th>
          <th class="ddldate">DDL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event,index) in events" :key="event.id">
          <td class="index">{{index + 1}}</td>
          <td class="kind">{{getKindofEvent(event.kind)}}</td>
          <td class="title">{{event.title}}</td>
          <td class="content">{{event.content}}</td>
          <td class="ddldate">{{getTime(event.timestamp)}}</td>
        </tr>
        <tr v-if="events.length == 0" style="display: flex; justify-content: center;">
          <el-empty description="这里空空如也哦"></el-empty>
        </tr>
      </tbody>
    </table>
    <button @click="exportExcelFile(table)">导出</button>
  </div>
</template>

<script setup>
  import FileSaver from 'file-saver'
  import * as XLSX from 'xlsx'
  import { useStore } from "vuex";
  import { getKindofEvent, getTime } from "@/common/utils";
  import { computed, ref } from "vue";

  function exportExcelFile(dom, sheetName = 'ddl', fileName = 'ddl.xlsx') {
    const options = { raw: true, cellDates: true }
    const workBook = XLSX.utils.table_to_book(dom, options);
    // console.log(workBook);
    return XLSX.writeFile(workBook, fileName, { type: 'binary' });
  }

  const store = useStore();
  const events = computed(() => {
    return store.getters.showEvents();
  })
  const table = ref("");
</script>

<style scoped lang="scss">
  div {
    &:after {
      content: "";
      clear: both;
      display: block;
    }

    h2 {
      text-align: center;
      margin: 0 0 10px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      border: 1px solid #eee;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgba(1, 1, 1, 1/20);

      thead {
        background-color: #eee;
      }

      tr {
        display: flex;
        align-items: center;
        min-height: 50px;

        .index {
          flex-basis: 40px;
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
          flex-basis: 130px;
          flex-shrink: 0;
          flex-grow: 1;
        }

        .operate {
          flex-basis: 60px;
          flex-shrink: 0;
          flex-grow: 1;
          display: flex;
          justify-content: space-around;
        }
      }
    }

    button {
      border: 1px solid #eee;
      border-radius: 30px;
      box-shadow: 0 0 10px rgba(1, 1, 1, 1/20);
      background-color: transparent;
      padding: 10px 20px;
      margin-top: 10px;
      float: right;
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>