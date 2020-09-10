<template>
  <div class="app-controller">
    <el-container>
      <el-aside>
        <div>123</div>
        <el-tabs type="border-card" stretch>
          <el-tab-pane>
            <span slot="label" @click="onclickItems">所有设备</span>
            <el-collapse v-model="activeNames" @change="onclickItem2">
              <el-collapse-item v-for="(item, index) in list" :key="index" :name="index">
                <template slot="title">
                  <span>{{ item.title }}</span>===
                  <span>{{ item.items.length }}</span>
                </template>
                <div
                  v-for="(res, i) in item.items"
                  :key="i"
                  class="likeTable"
                  @click="onclickItem(res)"
                >{{ res.name }}</div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" style="position: relative;" @click="onclickWarn">
              报警
              <el-badge
                :value="warn"
                class="item"
                style="position: absolute; top: -12px; right: -25px;"
              ></el-badge>
            </span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label" style="position: relative;" @click="onclickLeave">
              离线
              <el-badge
                type="info"
                :value="leave"
                class="item"
                style="position: absolute; top: -12px; right: -25px;"
              ></el-badge>
            </span>
          </el-tab-pane>
        </el-tabs>
        <div>123</div>
      </el-aside>
      <el-main>
        <el-row>
          <el-col :span="24" v-for="(item, key, index) in mainShow" :key="index" class="mainShow">
            <el-row type="flex" justify="end">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="warning" icon="el-icon-s-tools" circle></el-button>
            </el-row>
            <el-row type="flex" justify="space-around" class="mainShow-content">
              <el-col v-for="(res,key, index) in item" :key="index">{{key}}:{{res}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getList } from "@/api/controller";
export default {
  data() {
    return {
      mainShow: [], //mainShow是在Main中显示的数据
      warn: 0, //warn是tabs上报警的Badge 数量标记
      leave: 0, //leave是tabs上离线的Badge 数量标记
      list: [], //list是tabs上所以设备底下显示数据
      warnlist: [], //warnlist是tabs上报警显示数据
      leavelist: [], //warnlist是tabs上离线底下显示数据
      activeNames: [],
    };
  },
  methods: {
    //将传来的二维数组拆开重组为一维数组
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
    toFilter(arr, type) {
      let list = arr;
      list.forEach((val) => {
        //遍历对象
        Object.keys(val).forEach(function (index) {
          //判断属性值是否为数组
          if (val[index] instanceof Array) {
            val[index] = val[index].filter((value) => {
              //遍历数组
              return value.type == "" + type;
            });
          }
        });
      });
      return list;
    },
    //使用封装后axios的请求，获取mockjs的模拟数据
    fetchData() {
      getList().then((res) => {
        //res 是获取到的模拟数据
        this.list = JSON.parse(JSON.stringify(res.data.items));
        this.warnlist = JSON.parse(JSON.stringify(res.data.items));
        this.leavelist = JSON.parse(JSON.stringify(res.data.items));
        let mainShowList = JSON.parse(JSON.stringify(res.data.items));
        let newList = [];
        newList = this.toArr(mainShowList);
        this.mainShow = newList;

        this.warn = this.toArr(mainShowList).filter((wranVal) => {
          return wranVal.type === "warn";
        }).length;
        this.leave = this.toArr(mainShowList).filter((wranVal) => {
          return wranVal.type === "leave";
        }).length;
      });
    },
    onclickItems() {
      let mainShowList = this.list;
      let newList = [];
      newList = this.toArr(mainShowList);
      this.mainShow = newList;
    },
    onclickItem(value) {
      let list = [];
      list.push(value);
      this.mainShow = list;
    },
    onclickItem2(index) {
      let list = this.list;
      console.log(list);
      let newList = [];
      index.forEach((flagIndex) => {
        list[flagIndex].items.forEach((val) => {
          newList.push(val);
        });
      });
      this.mainShow = newList;
    },
    onclickWarn() {},
    onclickLeave() {},
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    activeNames: function (val, oldVal) {
      if (!val.length) {
        // console.log(val, oldVal);
        this.onclickItems();
      }
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
.mainShow {
  margin: 10px 0px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f3f3f3;
}
.mainShow:hover {
  background-color: #3aa;
}

.mainShow > .mainShow-content{
  margin: 10px 0px;
}
</style>
