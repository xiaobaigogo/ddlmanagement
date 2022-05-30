<template>
  <div>
    <header>
      <span v-for="(label,index) in labels" :key="index" @click="showGraph(index)"
        :class="{current: active(index)}">{{label}}</span>
    </header>
    <section>
      <div id="main" style="height:300px; width:400px"></div>
    </section>
  </div>
</template>

<script setup>
  import * as echarts from "echarts";
  import { onMounted, reactive, ref, computed } from "vue";
  import { useStore } from "vuex";
  const labels = ['最近一天', '最近一周', '最近一月'];
  let curindex = ref(0);

  // 生成初始x轴数据：时间戳
  function showXTimestamp(index = 0) {
    const next = (index) => {
      switch (index) {
        case 0:
          return 1
          break;
        case 1:
          return 7;
        case 2:
          return 30;
        default:
          break;
      }
    }

    const tmpStart = new Date();
    const [syear, smonth, sdate] = [tmpStart.getFullYear(), tmpStart.getMonth(), tmpStart.getDate()];
    const start = +new Date(syear, smonth, sdate, 0)

    const tmpEnd = new Date(tmpStart.getTime() + 3600 * 1000 * 24 * next(index));
    const [eyear, emonth, edate] = [tmpEnd.getFullYear(), tmpEnd.getMonth(), tmpEnd.getDate()];
    const end = +new Date(eyear, emonth, edate, 23);
    //console.log([start, end])

    return [start, end];
  }
  let curTimeRange = computed(() => { return showXTimestamp(curindex.value) });
  // 判断时间间隔是否小于两天
  const flag = computed(() => curTimeRange.value[1] - curTimeRange.value[0] >= 3600 * 1000 * 48);

  // 生成初始数据：事件
  const store = useStore();
  const events = computed(() => {
    return store.getters.showEvents(0, curTimeRange.value).sort((a, b) => a.timestamp - b.timestamp);
  })

  // 生成初始x轴数据：时间标签
  // 判断：时间戳大于两天的都按照天来计算坐标，小于两天则按小时来计算坐标
  const xdataraw = computed(() => {
    let arr = [];
    if (flag.value) {
      for (let i = curTimeRange.value[0]; i <= curTimeRange.value[1]; i += 3600 * 1000 * 24) {
        arr.push(i);
      }
      return arr;
    } else {
      for (let i = curTimeRange.value[0]; i <= curTimeRange.value[1]; i += 3600 * 1000) {
        arr.push(i);
      }
      return arr;
    }
  })

  // 将events转换成对应坐标轴需要的数据: x轴:某月某日：y轴:数量
  let xdata = computed(() => {
    if (flag.value) {
      return xdataraw.value.map((item) => {
        const itemTime = new Date(item);
        const [year, month, date] = [itemTime.getFullYear(), itemTime.getMonth() + 1, itemTime.getDate()]
        return year + "-" + month + "-" + date + " ";
      })
    } else {
      return xdataraw.value.map((item) => {
        const itemTime = new Date(item);
        const [year, month, date, hour] = [itemTime.getFullYear(), itemTime.getMonth() + 1, itemTime.getDate(), itemTime.getHours()]
        return year + "-" + month + "-" + date + " " + hour + "时";
      })
    }

  })

  const ydata = computed(() => {
    // y数据应与x坐标轴的数保持一致
    let cnts = new Array(4).fill().map(() => { return new Array(xdataraw.value.length).fill(0) });
    function checkSameDate(item1, item2, day) {
      if (item1.getFullYear() == item2.getFullYear() && item1.getMonth() == item2.getMonth() && item1.getDate() == item2.getDate()) {
        if (!day) {
          console.log('hour');
          return item1.getHours() == item2.getHours();
        }
        return true;
      } else {
        return false;
      }
    }
    let pointer = 0; // pointer 指向时间
    for (let i = 0; i < events.value.length; i++) {
      // 横坐标轴的时间和事件发生的时间一致
      while (!checkSameDate(new Date(xdataraw.value[pointer]), new Date(events.value[i].timestamp), flag.value)) {
        pointer++;
      }
      cnts[events.value[i].kind - 1][pointer]++;
    }
    return cnts;
  })



  //let xdata = reactive()
  let option = reactive({
    title: { text: '总用户量' },
    xAxis: {
      data: xdata,
    },
    yAxis: {

    },
    series: [
      {
        name: '用户量',
        type: 'line',
        data: [5, 20, 10, 40]
      }
    ],
    smooth: true,
  });

  let mychart;
  onMounted(() => {
    mychart = echarts.init(document.querySelector('#main'));
    mychart.setOption(option);
  })

  function showGraph(index) {
    curindex.value = index;
    // option.xAxis.data = createXAxis();
    mychart.setOption(option); // 重新加载图表
    // xdata = 
  }

  function active(index) {
    return index == curindex.value;
  }
</script>

<style scoped lang="scss">
  .current {
    color: blue;
  }
</style>