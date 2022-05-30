<template>
  <div class="father-box">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{getKindofEvent(props.kind) + "的DDL"}}</span>
          <full-selection v-if="props.kind == 1" theme="outline" size="25" fill="#868383" :strokeWidth="2"
            strokeLinejoin="miter" class="full-selection" @click="fullselect" />
        </div>
      </template>
      <ul>
        <li v-for="(item, index) in events" :key="item.id" class="text item">
          <div class="event">
            <div>
              <square-small class="no-check" theme="outline" size="32" fill="#868383" :strokeWidth="2"
                strokeLinejoin="miter" v-if="item.kind == 1" @click="moveToDone(item)" />
              <check-correct class="checked" theme="outline" size="20" fill="#868383" :strokeWidth="3"
                strokeLinejoin="miter" v-else-if="item.kind == 2" @click="moveToDo(item)" />
              <span class="title" :class="{'textline': item.kind == 4}">{{item.title}}</span>
              <p :class="{'textline': item.kind == 4}">{{item.content}}</p>
            </div>
            <div>
              <undo class="resume" theme="outline" size="25" fill="#868383" :strokeWidth="2" strokeLinejoin="miter"
                @click="moveToDo(item)" v-if="item.kind == 4" />
              <delete class="delete" theme="outline" size="25" fill="#868383" :strokeWidth="2" strokeLinejoin="miter"
                @click="delEvent(item)" v-if="item.kind == 4" />
              <delete-two class="cancel" theme="outline" size="32" fill="#868383" :strokeWidth="2"
                strokeLinejoin="miter" @click="moveToCancel(item)" v-else />
            </div>
          </div>
          <el-divider v-if="index != events.length - 1"></el-divider>
        </li>
        <li v-if="events.length == 0">
          <el-empty description="这里空空如也哦" />
        </li>
      </ul>
    </el-card>
  </div>

</template>

<script setup>
  import { useStore } from "vuex";
  import { computed } from "vue";
  import { ElCard, ElButton, ElDivider, ElEmpty } from "element-plus";
  import { CheckCorrect, SquareSmall, Undo, Delete, DeleteTwo, FullSelection } from "@icon-park/vue-next";
  import { getKindofEvent } from "@/common/utils";

  const props = defineProps({
    kind: {
      type: Number,
      default: 0
    }
  });
  const store = useStore();
  const events = computed(() => {
    return store.getters.findEventByKind(props.kind);
  });



  function moveToDone(item) {
    store.dispatch("evetodone", item);
  }

  function moveToDo(item) {
    // 先判断时间，如果当前时间大于DDL时间，统一扔到已过期
    const now = Date.now();
    if (now > item.timestamp) {
      console.log('到已过期去');
      store.dispatch("evetoexpired", item);
    } else {
      console.log('到待完成去');
      store.dispatch("evetodo", item);
    }
  }

  function moveToCancel(item) {
    store.dispatch("evetocancel", item);
  }

  function delEvent(item) {
    store.dispatch("delevent", item);
  }

  function fullselect() {
    store.dispatch("fullselect");
  }
</script>

<style scoped lang="scss">
  $resume: "撤回";
  $delete: "删除";
  $cancel: "取消";
  $fullselect: "全选";

  @mixin content($cont) {
    position: absolute;
    cursor: pointer;
    background-color: #fff;
    top: -10px;
    width: 140%;
    height: 120%;
    content: $cont;
    left: -10px;
    text-align: center;
    line-height: 150%;
    z-index: 999;
  }

  .father-box {
    position: relative;
    width: 300px;

    .box-card {
      position: relative;
      min-height: 250px;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .full-selection {
          /* 为了图标伪元素不会乱跑设的 */
          position: relative;

          &:hover::after {
            @include content($fullselect);
            top: 0;
          }
        }

      }

      .event {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
          font-weight: 700;
        }

        .no-check {
          position: relative;
          top: 10px;
        }

        .checked {
          position: relative;
          top: 5px;
          padding-right: 5px;
        }

        .resume {
          position: relative;
          margin-right: 20px;
        }

        .delete,
        .cancel {
          position: relative;
        }

        .resume:hover::after {
          @include content($resume)
        }

        .delete:hover::after {
          @include content($delete)
        }

        .cancel:hover::after {
          @include content($cancel)
        }
      }
    }


  }


  .textline {
    text-decoration: line-through;
  }
</style>