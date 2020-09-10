const Mock = require("mockjs");

const data = Mock.mock({
  "items|50": [
    {
      name: "@name(5)",
      id: "@integer",
      date: "@datetime(yyyy-MM-dd HH:mm:ss)",
      sequence: "@String(15)"
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/administration/list",
    type: "get",
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          items: items,
          total: items.length
        }
      };
    }
  }
];
