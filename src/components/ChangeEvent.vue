<template>
  <div class="masked">
    <div class="contain">
      <header class="header">设置一个DDL吧！</header>
      <close-one theme="outline" size="20" fill="#868383" :strokeWidth="3" strokeLinejoin="miter" class="close-icon"
        @click.stop="closeDialog(ruleFormRef)" />
      <section class="section">
        <el-form :model="ruleForm" label-width="90px" label-position="right" class="demo-ruleForm" :rules="rules"
          ref="ruleFormRef">
          <el-form-item label="标题" prop="title">
            <el-input v-model="ruleForm.title" />
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="ruleForm.content" type="textarea" />
          </el-form-item>
          <el-form-item label="类型" prop="kind">
            <el-radio-group v-model="ruleForm.kind">
              <el-radio :label="1">待完成</el-radio>
              <el-radio :label="2">已完成</el-radio>
              <el-radio :label="3">已过期</el-radio>
              <el-radio :label="4">已取消</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="DDL时间" required>
            <el-col :span="11">
              <el-form-item prop="ddldate">
                <el-date-picker v-model="ruleForm.ddldate" type="date" label="请选择日期" style="width: 100%"
                  :shortcuts="shortcuts" />
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="hour">
                <el-input-number v-model="ruleForm.hour" label="hour" :min="0" :max="23" placeholder="请选择时间"
                  style="width: 100%" />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-col :span="12" align="center">
              <el-button @click.stop="resetForm(ruleFormRef)">重置</el-button>
            </el-col>
            <el-col :span="12" align="center">
              <el-button type="primary" @click.stop="onSubmit(ruleFormRef)">确定</el-button>
            </el-col>
          </el-form-item>

        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { ref, reactive, computed, defineEmits } from "vue";
  import { CloseOne } from "@icon-park/vue-next";
  import {
    ElInput,
    ElDatePicker,
    ElInputNumber,
    ElForm,
    ElFormItem,
    ElCol,
    ElButton,
    ElRadioGroup,
    ElRadio
  } from "element-plus";

  export default {
    props: {
      id: {
        type: Number,
        default: -1
      }
    },
    emits: ['closeDialog'],
    components: {
      ElInput,
      ElDatePicker,
      ElInputNumber,
      ElForm,
      ElFormItem,
      ElCol,
      ElButton,
      ElRadioGroup,
      ElRadio,
      CloseOne
    },
    setup(props, ctx) {
      // 绑定整个表单ref
      const ruleFormRef = ref();

      // 看有没有传入id，有则直接取，无则新建一个模板
      const store = useStore();
      const tmp = store.getters.findEvent(props.id);
      const ruleForm = tmp
        ? tmp
        : reactive({
          title: "",
          content: "",
          ddldate: "",
          hour: 0,
          timestamp: 0,
          kind: 1
        });
      // flag 为true表示是添加事件，false表示是编辑事件
      const flag = tmp ? false : true;

      // 规则
      const rules = reactive({
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        // content: [{ required: false }],
        ddldate: [
          {
            type: "date",
            required: true,
            message: "请选择一个日期",
            trigger: "change"
          }
        ],
        hour: [
          {
            validator: validateTime,
            trigger: "blur"
          }
        ],
        kind: [
          {
            required: true,
            trigger: "change"
          }
        ]
      });
      // 日期的快速选择
      const shortcuts = [
        {
          text: "今天",
          value: new Date()
        },
        {
          text: "明天",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            return date;
          }
        },
        {
          text: "一周后",
          value: () => {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return date;
          }
        }
      ];
      function validateTime(rule, value, callback) {
        // console.log(ruleForm.ddldate);
        const time = +new Date(ruleForm.ddldate) + value * 1000 * 3600;
        if (ruleForm.kind == 1 && Date.now() > time) {
          // 待完成但是DDL时间已过
          callback(new Error("选择DDL时间应大于目前时间"));
        } else if (ruleForm.kind == 3 && Date.now() < time) {
          // 已过期但是DDL时间未过
          callback(new Error("你选择的是已过期，DDL时间应小于目前时间"));
        } else {
          ruleForm.timestamp = time;
          callback();
        }
      }
      // 提交
      const onSubmit = ruleFormRef => {
        if (!ruleFormRef) {
          return;
        }
        // e.preventDefault();
        ruleFormRef.validate(valid => {
          if (valid) {
            if (flag) {
              // 因为dispatch操作是异步，需要添加成功后再清除表单
              store.dispatch("addevent", JSON.parse(JSON.stringify(ruleForm))).then(() => {
                closeDialog(ruleFormRef);
              });

            } else {
              store.dispatch("editevent", ruleForm).then(() => {
                ctx.emit('closeDialog');
              });
            }

          } else {
            // console.log(false);
          }
        });
      };

      // 重置表单
      const resetForm = ruleFormRef => {
        if (!ruleFormRef) {
          return;
        }
        ruleFormRef.resetFields();
      };

      // 关闭对话框
      function closeDialog(ruleFormRef) {
        ruleFormRef.resetFields();
        ctx.emit('closeDialog');
      }

      return {
        closeDialog,
        ruleForm,
        shortcuts,
        rules,
        onSubmit,
        ruleFormRef,
        resetForm
      };
    }
  };
</script>

<style scoped lang="scss">
  .masked {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(1, 1, 1, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;

    .contain {
      background: #fff;
      border-radius: 5px;
      width: 65%;
      position: relative;

      .close-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
      }

      .header {
        text-align: center;
        margin: 20px 0;
      }

      .section {
        width: 90%;

        .btns {
          display: flex;
          justify-content: space-around;
        }
      }
    }
  }

  .text-center {
    text-align: center;
  }
</style>