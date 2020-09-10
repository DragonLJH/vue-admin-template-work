import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/vue-admin-template/controller/list",
    method: "get",
    params
  });
}
