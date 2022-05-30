<template>
  <div class="hello">
    <check-one theme="filled" size="32" fill="#17bd08" @click="clickIcon"></check-one>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { reactive } from "vue";
  import { CheckOne } from "@icon-park/vue-next";
  export default {
    name: "HelloWorld",
    setup() {
      // const store = useStore();
      // console.log(store);
      // const payload = reactive({
      //   id: 1,
      //   title: "one",
      //   content: "two",
      //   ddl: 1653379670003,
      //   type: 1
      // });
      // store.dispatch("addevent", payload);
      function clickIcon() {
        console.log('clickicom')
      }
      return { clickIcon }
    },
    components: {
      CheckOne,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>