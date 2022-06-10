<template>
  <div>
    <!-- 首页/查阅DDL/导入DDL/导出DDL -->
    <nav>
      <a href="javascript:void(0)" v-for="(_, tab) in tabs" :key="tab"
        :class="['tab-link', { active: currentTab === tab }]" @click="currentTab = tab">{{alias[tab]}}</a>
    </nav>

    <keep-alive include="Datas,Home">
      <component :is="tabs[currentTab]" class="tab"></component>
    </keep-alive>
  </div>
</template>

<script setup>
  import "element-plus/dist/index.css";

  import Home from "@/view/Home";
  import Datas from "@/view/Datas";
  import Output from "@/view/Output";
  import Input from "@/view/Input";
  import { useStore } from "vuex";
  import { ref, onMounted, watch, nextTick, onUnmounted } from "vue";

  const currentTab = ref('Home');
  const store = useStore();

  const tabs = {
    Home,
    Datas,
    Output,
    Input,
  }

  const alias = {
    'Home': '首页',
    'Datas': '查阅DDL',
    'Output': '导出DDL',
    'Input': '导入DDL'
  }


  let activeLink, active, activecoords;
  let timer, intervalTimer;
  onMounted(() => {
    let activeBackground = document.createElement('span');
    activeBackground.setAttribute('class', 'highlignt');
    document.body.appendChild(activeBackground);
    activeBackground.style.display = 'none';

    let links = document.querySelectorAll('a');
    // console.log(links);

    // 当前被选中的a标签
    activeLink = document.querySelector('a.active');
    active = activeLink.getBoundingClientRect();
    activecoords = {
      height: active.height,
      width: active.width,
      left: window.scrollX + active.left,
      top: window.scrollY + active.top
    }
    activeBackground.style.height = `${activecoords.height}px`;
    activeBackground.style.width = `${activecoords.width}px`;
    activeBackground.style.left = `${activecoords.left}px`;
    activeBackground.style.top = `${activecoords.top}px`;
    activeBackground.style.display = 'inline';

    window.addEventListener('resize', () => {
      // activeLink = document.querySelector('a.active');
      active = activeLink.getBoundingClientRect();
      activecoords = {
        height: active.height,
        width: active.width,
        left: window.scrollX + active.left,
        top: window.scrollY + active.top
      }
      activeBackground.style.height = `${activecoords.height}px`;
      activeBackground.style.width = `${activecoords.width}px`;
      activeBackground.style.left = `${activecoords.left}px`;
      activeBackground.style.top = `${activecoords.top}px`;
      activeBackground.style.display = 'inline';
    })

    // console.log(activecoords);

    function lightOn(e) {
      let link = e.target.getBoundingClientRect();
      let coords = {
        height: link.height,
        width: link.width,
        left: window.scrollX + link.left,
        top: window.scrollY + link.top
      }
      activeBackground.style.height = `${coords.height}px`;
      activeBackground.style.width = `${coords.width}px`;
      activeBackground.style.left = `${coords.left}px`;
      activeBackground.style.top = `${coords.top}px`;
      activeBackground.style.display = 'inline';
    }

    function lightOff() {
      activeBackground.style.height = `${activecoords.height}px`;
      activeBackground.style.width = `${activecoords.width}px`;
      activeBackground.style.left = `${activecoords.left}px`;
      activeBackground.style.top = `${activecoords.top}px`;
      activeBackground.style.display = 'inline';
      // console.log('lightoff')
    }

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('mouseenter', lightOn);
      links[i].addEventListener('mouseleave', lightOff);
    }

    // 每到一个整点，更新一次ddl，把未完成的过期事件放入已过期
    function updateDDL() {
      const now = new Date();
      let nextHour = new Date();
      nextHour.setHours(now.getHours() + 1);
      nextHour.setMinutes(0);
      nextHour.setSeconds(0);
      // console.log(now, nextHour, nextHour - now);

      timer = setTimeout(() => {
        store.dispatch('eveexpired');
        intervalTimer = setInterval(() => {
          store.dispatch('eveexpired');
        }, 1000 * 60 * 60)
      }, nextHour - now);
    }
    store.dispatch('eveexpired');
    updateDDL();
  })

  onUnmounted(() => {
    clearTimeout(timer);
    clearInterval(intervalTimer);
  })

  watch(currentTab, () => {
    nextTick(() => {
      activeLink = document.querySelector('a.active');
      active = activeLink.getBoundingClientRect();
      activecoords = {
        height: active.height,
        width: active.width,
        left: window.scrollX + active.left,
        top: window.scrollY + active.top
      }
      // console.log(activeLink);
    })

  })

</script>

<style lang="scss">
  @import "@/assets/normal.css";

  .highlignt {
    background-color: #fff;
    position: absolute;
    z-index: -1;
    transition: all 0.2s;
    top: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 50px;
  }

  nav {
    display: flex;
    margin-bottom: 20px;

    .tab-link {
      text-decoration: none;
      color: black;
      padding: 10px 20px;
      background-color: transparent;
      margin: 0 30px;

      &:visited {
        color: black;
      }
    }
  }

  .tab {
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 25px;
  }
</style>