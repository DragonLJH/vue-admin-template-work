const Mock = require("mockjs");

const data = Mock.mock({
  "items|5": [
    {
      title: "@ctitle(5, 10)",
      "items|4-6": [
        {
          name: "@ctitle(5)",
          ip: "@String(10)",
          port: "@integer",
          sequence: "@String(15)",
          "type|1": ["onLine", "warn", "leave"]
        }
      ]
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/controller/list",
    type: "get",
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          items: items
        }
      };
    }
  }
];
