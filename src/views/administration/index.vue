<template>
  <el-container>
    <el-aside width="300px" style>
      <h2>设备管理</h2>
      <div class="active">设备列表</div>
      <div>添加设备</div>
    </el-aside>
    <el-main>
      <div class="mainShow">
        <div class="topShow">
          <el-button type="primary" style="float:left;margin-left:10px">新建设备组</el-button>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="float:right">
            <el-select v-model="formInline.equipment" placeholder="所有设备">
              <el-option label="已连接设备" value="Connected"></el-option>
              <el-option label="未连接设备" value="NotConnected"></el-option>
              <el-option label="已禁用设备" value="Disable"></el-option>
              <el-option label="未删除设备" value="Delete"></el-option>
            </el-select>
            <el-select v-model="formInline.equipmentGroup" placeholder="所有设备组">
              <el-option label="设备组1" value="1"></el-option>
              <el-option label="设备组2" value="2"></el-option>
              <el-option label="设备组3" value="3"></el-option>
              <el-option label="设备组4" value="4"></el-option>
            </el-select>
            <el-form-item>
              <el-input v-model="formInline.input" placeholder="设备名称/ID"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="contentShow">
          <div>
            <el-checkbox v-model="equipmentGroupFlag">{{equipmentGroupName}}</el-checkbox>
            <span style="margin-left:20px;">
              <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
              <el-button type="success" size="mini" icon="el-icon-check" circle></el-button>
            </span>
          </div>
          <div
            style="height: 60px; background-color: #fff;position: relative; padding: 10px;margin: 10px 0px; color:#b1b1b1 ; "
            v-for="(item,index) in showList"
            :key="index"
          >
            <div style="position: absolute;top:0px;left:0px;">未连接</div>
            <div style="float:left;">
              <el-checkbox :key="index" @change="elCheckbox"></el-checkbox>
              <div style="margin-left:20px;display:inline-block;">{{item.name}}</div>
              <div style="margin-left:20px;display:inline-block;">
                <div>序列号：{{item.sequence}}</div>
                <div>ID：{{item.id}}</div>
              </div>
              <div style="margin-left:20px;display:inline-block;">创建日期：{{item.date}}</div>
            </div>
            <div style="float:right;">
              <el-link type="primary" :underline="false">复制设备</el-link>
              <el-link type="primary" :underline="false">删除设备</el-link>
              <el-link type="primary" :underline="false">设置连接</el-link>
              <el-link type="primary" :underline="false">编辑设备</el-link>
            </div>
          </div>
          <div>
            <el-pagination
              @current-change="handleCurrentChange"
              layout="total, prev, pager, next"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import { getList } from "@/api/administration";
export default {
  data() {
    return {
      equipmentGroupFlag: false,
      formInline: {
        equipment: "",
        equipmentGroup: "",
        input: "",
      },
      equipmentGroupName: "采集",
      list: [],
      showList: [],
      total: 0,
    };
  },
  methods: {
    fetchData() {
      getList().then((res) => {
        //赋值变量不影响原数组
        this.list = JSON.parse(JSON.stringify(res.data.items));
        let showList = JSON.parse(JSON.stringify(res.data.items));
        let newList = [];
        newList = showList.filter((val, index) => {
          return index < 10;
        });
        this.showList = newList;
        this.total = JSON.parse(JSON.stringify(res.data.total));
      });
    },
    onSubmit() {
      console.log("submit!");
    },
    handleCurrentChange(val) {
      let showList = JSON.parse(JSON.stringify(this.list));
      let newList = [];
      newList = showList.filter((value, index) => {
        return index < 10 * val && index >= 10 * (val - 1);
      });
      this.showList = newList;
    },
    elCheckbox(e) {
      console.log(e);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.el-aside {
  text-align: center;
}
.el-aside > div {
  font-size: 18px;
  padding: 20px;
  cursor: pointer;
}
.active {
  background: #eaf6fe;
  color: #108cee;
  position: relative;
}
.active::before {
  content: "";
  height: 100%;
  border: solid 2px #108cee;
  position: absolute;
  left: 0px;
  top: 0px;
}

.el-main {
  background-color: #f3f3f3;
}
.topShow {
  overflow: hidden;
  background-color: #fff;
  padding-top: 10px;
  margin: 0px 0px 20px;
}

.el-link {
  margin: 10px;
}
</style>