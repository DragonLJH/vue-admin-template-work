<template>
  <div>
    <div>
      <div v-for="(item,index) in list" :key="index">
        <span v-if="check(item)">
          <span v-for="(val,key,index) in item" :key="index">
            <span v-if="check(val)">
              {{key}}:
              <span v-for="(res,key,index) in val" :key="index">
                {{ key }}:
                {{res}}
              </span>
            </span>
            <span v-else>
              {{key}}:
              {{val}}
            </span>
          </span>
        </span>
        <span v-else>{{itme}}</span>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "zs",

          age: 18,
          address: {
            schoolAddress: "gz",
            homeAddress: "bj",
          },
        },
        {
          name: "zs",
          age: 18,
          address: {
            schoolAddress: "gz",
            homeAddress: "bj",
          },
        },
        {
          name: "zs",
          age: 18,
          address: {
            schoolAddress: "gz",
            homeAddress: "bj",
          },
        },
      ],
      total: 100,
      currentPage: 1,
    };
  },
  methods: {
    check(val) {
      if (val instanceof Object) {
        return true;
      } else {
        return false;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
</style>