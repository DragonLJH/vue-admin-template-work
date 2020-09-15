<template>
  <div class="editModalBoxes">
    <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="openEditModalBoxes"></el-button>
    <el-dialog title="编辑设备" :visible.sync="modalVisible" width="100%" center fullscreen>
      <table>
        <tr>
          <td>设备分组</td>
          <td>
            <el-select v-model="form.group" @change="changeS">
              <el-option v-for="(item,index) in grouplist" :key="index" :value="item.title"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>设备名称</td>
          <td>
            <el-input v-model="form.name"></el-input>
          </td>
        </tr>
        <tr>
          <td>链接协议</td>
          <td>
            <el-input v-model="form.tcp" disabled></el-input>
          </td>
        </tr>
        <tr>
          <td>传感器</td>
          <td>
            <el-button type="primary">追加</el-button>

            <div v-for="(item,index) in form.main" :key="index">
              <table>
                <tr>
                  <td>
                    <el-input type="text" v-model="item.name" />
                  </td>
                  <td>
                    <el-select v-model="item.type">
                      <el-option value="boolean"></el-option>
                      <el-option value="int"></el-option>
                    </el-select>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modalVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保存设备</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { set } from "js-cookie";
import { compile } from "path-to-regexp";
export default {
  props: {
    device: Object,
    grouplist: Array,
    sf: Number,
  },
  data() {
    return {
      modalVisible: false,
      group: JSON.parse(JSON.stringify(this.device.group)),
      form: {
        group: JSON.parse(JSON.stringify(this.device.group)),
        name: this.device.name,
        tcp: "tcp",
        main: this.device.main,
      },
    };
  },
  methods: {
    openEditModalBoxes() {
      this.modalVisible = true;
    },
    onSubmit() {
      this.modalVisible = false;
      let newObj = {
        group: this.form.group,
        ip: this.device.ip,
        main: this.form.main,
        name: this.form.name,
        port: this.device.port,
        sequence: this.device.sequence,
        type: this.device.type,
      };
      let sf = this.sf;
      let list = this.grouplist;
      let sum = 0;
      if (sf === 0) {
        console.log("sf", sf, "sum", sum);
        console.log(newObj);
        // this.$set(list, list[0].items[0], "123");
        // list[0].items[0] = "123";
        // console.log(list[0].items);
      }
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].items.length; j++) {
          sum += 1;
          if (sf === sum) {
            if (this.group === this.form.group) {
              list[i].items[j] = newObj;
            } else {
              list[i].items.splice(j, 1);

              let anewlist = [];
              this.grouplist.forEach((val) => {
                anewlist.push(val.title);
              });
              let aindex = anewlist.indexOf(this.form.group);

              list[aindex].items.push(newObj);
            }

            this.$emit("", list);

            return;
          }
        }
      }

      // this.$set(this.group);
    },
    changeS(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
</style>