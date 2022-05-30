<template>
  <div class="search">
    <el-select v-model="select" class="m-2 kind" placeholder="全部" clearable>
      <el-option v-for="item in 4" :key="item" :label="getKindofEvent(item)" :value="item" />
    </el-select>
    <el-date-picker v-model="daterange" style="padding: 0 10px; flex-basis: 220px;
      flex-grow: 0; flex-shrink: 0;" type="daterange" unlink-panels range-separator="To" start-placeholder="初始"
      end-placeholder="最后" :shortcuts="shortcuts" />
    <el-input v-model="searchcontent" placeholder="请输入关键词" />
  </div>
</template>

<script setup>
  import { getKindofEvent } from "@/common/utils";
  import { ref } from "vue";
  import { ElSelect, ElOption, ElInput, ElDatePicker } from "element-plus";

  const select = ref("");
  const searchcontent = ref("");
  const daterange = ref("");

  const shortcuts = [
    {
      text: '最近一天',
      value: () => {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 3600 * 1000 * 24);
        const [year, month, date] = [tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()];
        const start = now;
        const end = new Date(year, month, date);
        return [start, end]
      }
    },
    {
      text: '最近一周',
      value: () => {
        const now = new Date();
        const nextweek = new Date(now.getTime() + 3600 * 1000 * 24 * 7);
        const [year, month, date] = [nextweek.getFullYear(), nextweek.getMonth(), nextweek.getDate()];
        const start = now;
        const end = new Date(year, month, date);
        return [start, end]
      }
    },
    {
      text: '最近一个月',
      value: () => {
        const now = new Date();
        const nextmonth = new Date(now.getTime() + 3600 * 1000 * 24 * 30);
        const [year, month, date] = [nextmonth.getFullYear(), nextmonth.getMonth(), nextmonth.getDate()];
        const start = now;
        const end = new Date(year, month, date);
        return [start, end]
      }
    }
  ]

  // console.log(searchcontent);

  defineExpose({
    select,
    searchcontent,
    daterange
  })
</script>

<style scoped lang="scss">
  .search {
    display: flex;
    align-items: center;

    .kind {
      flex-basis: 100px;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
</style>