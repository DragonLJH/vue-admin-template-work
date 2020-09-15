<template>
  <div>
    <el-button type="text" @click="newDeviceGroupClick">新建设备组</el-button>

    <el-dialog title="新建设备组" :visible.sync="newDeviceVisible" width="100%" center>
      <div>
        <el-input v-model="newDevice" placeholder="请输入新设备组"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qxClick">取 消</el-button>
        <el-button type="primary" @click="newDeviceGroupSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDeviceVisible: false,
      newDevice: "",
    };
  },
  methods: {
    newDeviceGroupClick() {
      this.newDeviceVisible = true;
    },
    qxClick() {
      this.newDeviceVisible = false;
    },
    newDeviceGroupSubmit() {
      this.deviceGroupVisible = false;
    },
  },
};
</script>

<style scoped>
</style>