<template>
  <div>
    <el-button type="text" @click="deviceGroupClick">设备组管理</el-button>

    <el-dialog title="设备组管理" :visible.sync="deviceGroupVisible" width="100%" center fullscreen>
      <div>
        <el-container>
          <el-aside width="60px">
            <div></div>
            <div
              class="itemClass"
              v-for="(item,index) in deviceGrouplist"
              :key="index"
            >{{item.title}}</div>
          </el-aside>
          <el-main style="height:400px; overflow: auto;">
            <div style="position:relative;height:50px">
              <el-checkbox style="position:absolute;letf:0px">全选</el-checkbox>
              <div style="position:absolute;right:0px;width:150px">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in deviceGrouplist"
                    :key="index"
                    :value="item.title"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div v-for="(item, index) in deviceGroupShow" :key="index" class="deviceGroupShow">
              <el-checkbox style="margin-right:20px;"></el-checkbox>
              {{item.name}}
            </div>
          </el-main>
        </el-container>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qxClick">取 消</el-button>
        <el-button type="primary" @click="deviceGroupSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    deviceGrouplist: Array,
  },
  data() {
    return {
      deviceGroupVisible: false,
      deviceGroupShow: [],
      value: "移动到",
    };
  },
  methods: {
    deviceGroupClick() {
      this.deviceGroupVisible = true;
      this.deviceGroupShow = this.toArr(this.deviceGrouplist);
    },
    qxClick() {
      this.deviceGroupVisible = false;
    },
    deviceGroupSubmit() {
      this.deviceGroupVisible = false;
    }, //将传来的二维数组拆开重组为一维数组
    toArr(arr) {
      //创建一个一维数组
      let newList = [];
      //遍历数组
      arr.forEach((val) => {
        //遍历对象
        Object.keys(val).forEach(function (index) {
          //判断属性值是否为数组
          if (val[index] instanceof Array) {
            val[index].forEach((value) => {
              //遍历数组
              newList.push(value); //将数组添加到newList中
            });
          }
        });
      });
      return newList;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.itemClass {
  text-align: center;
  margin: 10px 0px;
  padding: 5px 0px;
  background-color: #ccc;
}
.deviceGroupShow {
  margin: 10px 0px;
  padding: 5px 0px;
  border-bottom: solid 1px #999;
}
</style>