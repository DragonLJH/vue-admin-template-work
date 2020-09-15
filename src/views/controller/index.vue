<template>
  <div class="app-controller">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <div>
          <div class="demo-input-suffix">
            <el-input placeholder="请输入内容" v-model="search">
              <i
                slot="suffix"
                style="cursor: pointer;"
                @click="searchClick"
                class="el-input__icon el-icon-search"
              ></i>
            </el-input>
          </div>
        </div>
        <el-tabs type="border-card" stretch @tab-click="tabClick">
          <el-tab-pane>
            <span slot="label" @click="onclickItems">所有设备</span>
            <CShow :list="list" @Conclick="CShowClick" @ConChange="CShowChange"></CShow>
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
            <CShow :list="warnlist" @Conclick="CShowClick" @ConChange="CShowChange"></CShow>
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
            <CShow :list="leavelist" @Conclick="CShowClick" @ConChange="CShowChange"></CShow>
          </el-tab-pane>
        </el-tabs>
        <div>
          <el-row class="asideFooter">
            <el-col :span="12">
              <deviceGroup :deviceGrouplist="list" @deviceGroupClick="deviceGroupClick" />
            </el-col>
            <el-col :span="12">
              <nweDeviceGroup @newDeviceGroupClick="newDeviceGroupClick" />
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-row>
          <el-col :span="24" v-for="(item,index) in mainShow" :key="index" class="mainShow">
            <el-row class="mainShow-content">
              <el-col :span="24" class="mainShow-content-item1">
                <span>{{item.name}}</span>
                <span>序列号：{{item.ip}}</span>
                <span style="float:right;">
                  <EditModalBoxes
                    :sf="index"
                    style="display:inline-block;"
                    @openEditModalBoxes="openEditModal"
                    :grouplist="grouplist.length === 0 ? list : grouplist"
                    :device="item"
                  ></EditModalBoxes>
                  <el-button type="warning" icon="el-icon-s-tools" circle size="mini"></el-button>
                </span>
              </el-col>
              <el-col
                class="mainShow-content-item2"
                v-for="(res,index) in item.main"
                :key="index"
                :span="24"
              >
                <div>
                  <el-button type="primary" icon="el-icon-bell" circle size="mini"></el-button>
                  <el-button type="warning" icon="el-icon-odometer" circle size="mini"></el-button>
                  <el-button type="warning" icon="el-icon-time" circle size="mini"></el-button>
                </div>
                <div>
                  <div>{{res.name}}</div>
                  <div>{{res.id}}</div>
                </div>
                <div>
                  <div>{{res.type}}</div>
                  <div>{{res.date}}</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- 分页准备 -->
    <!-- <el-pagination
          @current-change="handleCurrentChange"
          layout="total, prev, pager, next"
          :total="total"
    ></el-pagination>-->
  </div>
</template>

<script>
import { getList } from "@/api/controller";
import CShow from "@/components/controller/CShow";
import EditModalBoxes from "@/components/controller/EditModalBoxes";
import deviceGroup from "@/components/controller/deviceGroup";
import nweDeviceGroup from "@/components/controller/nweDeviceGroup";
export default {
  components: { CShow, EditModalBoxes, deviceGroup, nweDeviceGroup },
  data() {
    return {
      mainShow: [], //mainShow是在Main中显示的数据
      // mainShowPage: [],//分页准备
      total: 0,
      warn: 0, //warn是tabs上报警的Badge 数量标记
      leave: 0, //leave是tabs上离线的Badge 数量标记
      list: [], //list是tabs上所以设备底下显示数据
      warnlist: [], //warnlist是tabs上报警显示数据
      leavelist: [], //warnlist是tabs上离线底下显示数据
      // activeNames: [],
      search: "",
      tabIndex: 0,
      grouplist: [],
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

        this.warnlist = this.toFilter(
          JSON.parse(JSON.stringify(res.data.items)),
          "warn"
        );
        this.leavelist = this.toFilter(
          JSON.parse(JSON.stringify(res.data.items)),
          "leave"
        );
        let mainShowList = JSON.parse(JSON.stringify(res.data.items));
        let newList = [];
        newList = this.toArr(mainShowList);
        this.mainShow = newList;
        //分页准备
        // this.total = this.mainShow.length;
        // this.mainShowPage = newList.filter((val, index) => {
        //   return index >= 0 && index < 5;
        // });

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
    onclickWarn() {
      let mainShowList = this.warnlist;
      let newList = [];
      newList = this.toArr(mainShowList);
      this.mainShow = newList;
    },
    onclickLeave() {
      let mainShowList = this.leavelist;
      let newList = [];
      newList = this.toArr(mainShowList);
      this.mainShow = newList;
    },
    CShowClick(val) {
      this.mainShow = val;
    },
    CShowChange(val) {
      if (!val.length) this.mainShow = this.warnlist;
      this.mainShow = val;
    },
    searchClick() {
      console.log(this.search);
    },
    tabClick(val) {
      this.tabIndex = val.index;
    },
    openEditModal(val) {
      this.list = JSON.parse(JSON.stringify(val));
      this.warnlist = this.toFilter(JSON.parse(JSON.stringify(val)), "warn");
      this.leavelist = this.toFilter(JSON.parse(JSON.stringify(val)), "leave");
    },
    deviceGroupClick() {},
    newDeviceGroupClick() {},
    //分页准备
    // handleCurrentChange(val) {
    //   let showList = JSON.parse(JSON.stringify(this.mainShow));
    //   let newList = [];
    //   newList = showList.filter((value, index) => {
    //     return index < 6 * val && index >= 6 * (val - 1);
    //   });
    //   this.mainShowPage = newList;
    // },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    mainShow: function (val, oldVal) {
      if (!val.length) {
        switch (parseInt(this.tabIndex)) {
          case 0:
            this.onclickItems();
            break;
          case 1:
            this.onclickWarn();
            break;
          default:
            this.onclickLeave();
            break;
        }
      }
    },
    tabIndex: function (val) {
      switch (parseInt(val)) {
        case 0:
          this.grouplist = this.list;
          break;
        case 1:
          this.grouplist = this.warnlist;
          break;
        default:
          this.grouplist = this.leavelist;
          break;
      }
    },
  },
};
</script>

<style scoped>
.mainShow {
  margin: 10px 0px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f3f3f3;
}
.mainShow:hover {
  background-color: #3aa;
}

.mainShow > .mainShow-content {
  margin: 10px 0px;
}

.mainShow > .mainShow-content > .mainShow-content-item1 > span:first-child {
  height: 35px;
  line-height: 35px;
  margin-right: 20px;
}
.mainShow > .mainShow-content > .mainShow-content-item2 {
  margin-bottom: 20px;
  background-color: #ddd;
}
.mainShow > .mainShow-content > .mainShow-content-item2 > div {
  height: 35px;
  line-height: 35px;
  display: inline-block;
  margin-right: 5px;
}

.mainShow > .mainShow-content > .mainShow-content-item2 > div:first-child {
  float: right;
}

.asideFooter > div {
  color: #3aa;
  padding: 20px 0px;
  text-align: center;
  cursor: pointer;
  background-color: #eee;
  position: relative;
}

.asideFooter > div:hover::before {
  content: "";
  border: solid 1px #3aa;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
}

.asideFooter > div:first-child::after {
  content: "";
  border: solid 1px #999;
  height: 60%;
  position: absolute;
  top: 12px;
  right: 0px;
}
</style>
