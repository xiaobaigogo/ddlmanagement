<template>
  <!-- 遮罩层 -->
  <div class="cover" v-if="show">
    <!-- 正式层 -->
    <form action="" class="dialog">
      <header>设置DDL</header>
      <close id="close" :func="closeDialog"></close>
      <label for="title">标题</label>
      <input type="text" id="title" v-model="title" onkeydown="if(event.keyCode == 13) return false;">
      <div class="content">
        <label for="content">内容</label>
        <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
      </div>

      <label for="day">DDL</label>
      <input type="date" id="day" v-model="days">

      时：<input list="hour" v-model="hours">
      <datalist id="hour">
        <option v-for="(item, index) in hour" :value="index" :key="index">{{index}}</option>
      </datalist>

      <br>

      <div class="btns">
        <input type="reset" value="清空" @click="clearobj">
        <input type="submit" value="确定" @click="changeevent">
      </div>

    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, toRefs, defineComponent, computed, ref } from "vue";
import Close from "./Close";
import {
  strToTime,
  timeToStr,
  checkTime,
  checkEvent,
  Toast,
  exchange
} from "@/common/utils";

export default defineComponent({
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  components: {
    Close
  },
  setup(props) {
    const store = useStore();
    // 决定是否渲染
    const show = computed(() => {
      return store.state.contact.showDialog;
    });
    // console.log(props.id);
    // 先找有无对应id，有就是编辑，无就是添加
    const tmp = computed(() => {
      return store.getters.findEvent(props.id);
    });

    // console.log(tmp.value);
    let obj = {
      // plain-Show对象
      title: "",
      content: "",
      days: timeToStr(Date.now())["days"],
      hours: 0
    };
    // flag 为true表示是添加事件，false表示是编辑事件
    let res, flag;
    if (tmp.value === undefined) {
      res = reactive(obj);
      flag = true;
    } else {
      obj = exchange(tmp.value); // 把state对象转成Show形式的对象
      res = reactive(obj);
      console.log("exchange");
      flag = false;
    }
    // 设定小时
    const hour = new Array(24);

    // 发出改变事件
    function changeevent(e) {
      console.log(e);
      e.preventDefault();
      console.log("提交");

      // 校验事件内容
      if (!checkEvent(res)) {
        return;
      }

      const eve = exchange(res); // 把Show对象转成state对象
      if (flag) {
        // 如果是添加事件
        store.dispatch("addevent", eve);
      } else {
        // 如果是编辑事件
        console.log("edit");
        store.dispatch("editevent", eve);
      }
    }

    // 重置按钮
    function clearobj(e) {
      obj.title = "";
      obj.content = "";
      obj.days = timeToStr(Date.now())["days"];
      obj.hours = 0;
    }

    // 关闭组件
    function closeDialog() {
      store.commit("closeDialog");
    }

    return { hour, changeevent, closeDialog, clearobj, ...toRefs(res), show, input };
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/index";

@mixin common() {
  border-radius: 5px;
  border: 1px solid rgb(121, 118, 118);
  height: 1.5rem;
  margin: 2rem 0;
  vertical-align: center;
}

.cover {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 0.4);
  width: 100%;
  height: 100vh;

  .dialog {
    @include common;
    height: 70%;
    width: 70%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    // text-align: center;
    header {
      text-align: center;
      margin: 2rem 0;
      background-color: $theme1-bgc;
      color: $theme1-color;
    }

    #close {
      position: absolute;
      top: 1%;
      right: 1%;
    }

    label {
      display: inline-block;
      width: 20%;
      text-align: right;
      padding-right: 10px;
      margin: 2rem 0;
      // vertical-align: center;
    }

    input:focus {
      outline-color: $theme1-bgc;
    }

    textarea:focus {
      outline-color: $theme1-bgc;
    }

    .content {
      display: flex;
    }

    input[type="text"] {
      @include common;
      width: 60%;
    }

    textarea {
      @include common;
      height: 5rem;
      width: 60%;
      resize: none;
    }

    input[type="date"] {
      @include common;
      width: 15%;
    }

    input[list="hour"] {
      @include common;
      width: 2rem;
    }

    input[type="reset"] {
      @include common;
      width: 10%;
      min-width: 40px;
    }

    input[type="submit"] {
      @include common;
      width: 10%;
      min-width: 40px;
      background-color: $theme1-bgc;
      color: $theme1-color;
    }

    .btns {
      display: flex;
      justify-content: space-evenly;
    }
  }
}
</style>