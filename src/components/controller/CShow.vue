<template>
  <el-collapse v-model="activeNames" @change="ConChange">
    <el-collapse-item v-for="(item, index) in list" :key="index" :name="index">
      <template slot="title">
        <span>{{ item.title }}</span>===
        <span>{{ item.items.length }}</span>
      </template>
      <div
        v-for="(res, i) in item.items"
        :key="i"
        class="likeTable"
        @click="Conclick(res)"
      >{{ res.name }}</div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  props: {
    list: Array,
  },
  data() {
    return {
      activeNames: [],
    };
  },
  methods: {
    ConChange(index) {
      let list = this.list;
      let newList = [];
      index.forEach((flagIndex) => {
        list[flagIndex].items.forEach((val) => {
          newList.push(val);
        });
      });
      this.$emit("ConChange", newList);
    },
    Conclick(value) {
      let list = [];
      list.push(value);
      this.$emit("Conclick", list);
    },
  },
};
</script>
<style scoped>
.likeTable {
  margin: 10px 0px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #999;
}
.likeTable:hover {
  background-color: #aaa;
}
</style>