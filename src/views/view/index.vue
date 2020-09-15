<template>
  <div>
    <h1>设备列表</h1>
    <div>
      <div>
        <table>
          <tr>
            <td>
              <el-button type="primary">新建视图</el-button>
            </td>
            <td>
              <el-input placeholder="视图名称/设备序列号" v-model="search">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="#">
            <template>
              <el-checkbox></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="名称">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="设备序列号">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.ip }}</span>
            </template>
          </el-table-column>
          <el-table-column label="协议">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.xy }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template>
              <el-button type="primary" size="mini">查看</el-button>
              <el-button type="primary" size="mini">设置</el-button>
              <el-button type="primary" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      list: [],
      tableData: [
        {
          name: "张三",
          ip: "172.16.30.1",
          xy: "tcp",
        },
        {
          name: "李四",
          ip: "172.16.30.2",
          xy: "tcp",
        },
        {
          name: "王五",
          ip: "172.16.30.3",
          xy: "tcp",
        },
        {
          name: "王小虎",
          ip: "172.16.30.4",
          xy: "tcp",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>