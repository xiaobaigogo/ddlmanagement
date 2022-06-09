<template>
  <div>
    <div class="dragbox" ref="dragbox">
      <div v-if="!ws" class="dragbox-empty">
        <upload-logs theme="outline" size="32" fill="#868383" :strokeWidth="2" strokeLinejoin="miter" />
        <div class="upload-tip">
          <span class="upload-message">将文件拖动到此处，或</span>
          <label for="file">
            <input type="file" id="file" accept=".xls,.xlsx" class="upload" @change="getExcel">
            <span class="upload-file">点击上传</span>
          </label>
        </div>
      </div>
      <div v-else class="dragbox-no-empty">
        <h2 style="text-align:center;">数据预览</h2>
        <table class="table">
          <thead>
            <tr>
              <th class="kind">类型</th>
              <th class="title">标题</th>
              <th class="content">内容</th>
              <th class="ddldate">DDL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in ws">
              <td class="kind">{{item['类型']}}</td>
              <td class="title">{{item['标题']}}</td>
              <td class="content">{{item['内容']}}</td>
              <td class="ddldate">{{item['DDL']}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="btns">
      <button @click="sureUpload">确定导入</button>
      <button @click="cancelUpload">重新上传</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import * as XLSX from "xlsx";
  import { useStore } from "vuex";

  import { UploadLogs } from "@icon-park/vue-next";

  const dragbox = ref();
  const store = useStore();
  const ws = ref("");
  // console.log(ws);

  function getExcel(e) {
    const file = e.target.files;
    // console.log(file);
    if (file.length <= 0) {
      return false;
    }
    if (!(/\.(xls|xlsx)$/).test(file[0].name.toLowerCase())) {
      return false;
    }

    const fileReader = new FileReader();
    fileReader.onload = ev => {
      let options = {
        type: "binary"
      }
      const workbook = XLSX.read(ev.target.result, options);
      // console.log(workbook);
      const wsname = workbook.SheetNames[0];
      ws.value = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
    }

    fileReader.readAsBinaryString(file[0]);
  }

  function dealExcel(ws) {
    let keyMap = {
      '类型': 'kind',
      '标题': 'title',
      '内容': 'content'
    }

    let kindMap = {
      '待完成': 1,
      '已完成': 2,
      '已过期': 3,
      '已取消': 4
    }

    ws.forEach(item => {
      Object.keys(item).map(key => {
        let newkey = keyMap[key];
        // 处理 '类型', '标题', '内容'
        if (newkey) {
          if (newkey == 'kind') {
            item[newkey] = kindMap[item[key]];
          } else {
            item[newkey] = item[key];
          }
          delete item[key];
        }
        // 处理 'ddl'
        if (key.toUpperCase() == 'DDL') {
          const time = item[key].split(" ");
          const [year, month, day] = time[0].split("-").map(Number);
          const hour = parseInt(time[1]);
          const ddldate = new Date(year, month - 1, day);
          const timestamp = ddldate.getTime();
          item['ddldate'] = ddldate;
          item['hour'] = hour;
          item['timestamp'] = timestamp;
          delete item[key];

          // 如果item的kind为待完成，需要额外判断是否已过当前时间，如果是，将改成已过期并提醒用户
          if (item['kind'] == 1) {
            if (Date.now() > timestamp) {
              item['kind'] = 3;
              // alert(`${item}已过期，系统已自动纠正`);
            }
          }
        }

        if (!newkey && key.toUpperCase() != 'DDL') {
          delete item[key];
        }
      })

      if (!item.hasOwnProperty('content')) {
        item['content'] = "";
      }
    });
  }
  // 确定上传
  function sureUpload() {
    // console.log(ws.value)
    ws.value && dealExcel(ws.value);
    let props = []
    ws.value && ws.value.forEach(item => {
      props.push(store.dispatch('addevent', item));
    });
    Promise.all(props).then(() => {
      alert("导入成功");
    })
    ws.value = "";
    // console.log(ws);
  }
  // 重新上传
  function cancelUpload() {
    ws.value = "";
  }
  // 拖拽文件事件
  onMounted(() => {
    // console.log(dragbox);
    bindEvents.call(dragbox.value);

    function bindEvents() {
      // console.log(this)
      this.addEventListener('dragover', e => {
        e.preventDefault();
        // console.log('dragover');
        this.style.borderColor = 'red';
      }, false)
      this.addEventListener('dragleave', () => {
        // console.log('dragleave');
        this.style.borderColor = '#868383';
      }, false)
      this.addEventListener('drop', e => {
        e.preventDefault();
        // console.log('drop');
        this.style.borderColor = '#868383';
        const fileList = e.dataTransfer.files;
        console.log(fileList[0]);
        if (!(/\.(xls|xlsx)$/).test(fileList[0].name.toLowerCase())) {
          return false;
        }
        const fileReader = new FileReader();
        fileReader.onload = ev => {
          let options = {
            type: "binary"
          }
          const workbook = XLSX.read(ev.target.result, options);
          console.log(workbook);
          const wsname = workbook.SheetNames[0];
          ws.value = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        }
        fileReader.readAsBinaryString(fileList[0]);
      }, false)
    }
  })
</script>

<style scoped lang="scss">
  .dragbox-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px 0;
    border: 2px dashed #868383;

    .upload-tip {

      .upload {
        display: none;
      }

      .upload-file {
        cursor: pointer;
        color: rgb(146, 144, 144);
        text-decoration: underline;
      }
    }
  }

  .dragbox-no-empty {
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
  }

  .btns {
    display: flex;
    justify-content: space-around;

    button {
      border: 1px solid #eee;
      border-radius: 30px;
      box-shadow: 0 0 10px rgb(1 1 1 / 5%);
      background-color: transparent;
      padding: 10px 20px;
      margin-top: 10px;
      font-weight: 700;
      cursor: pointer;
    }
  }
</style>