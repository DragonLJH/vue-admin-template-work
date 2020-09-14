const Mock = require("mockjs");

const data = Mock.mock({
  "data|5": [
    {
      title: "@ctitle(5, 10)",
      items: function() {
        let list = [];
        for (let i = 0; i < 5; i++) {
          list[i] = {
            group: this.title,
            name: "@ctitle(5)",
            ip: "@String(10)",
            port: "@integer",
            sequence: "@String(15)",
            "type|1": ["onLine", "warn", "leave"],
            "main|2-3": [
              {
                name: "@String(5)",
                id: "@integer",
                state: "leave",
                date: "@datetime(yyyy-MM-dd)",
                "type|1": ["boolean", "int"]
              }
            ]
          };
        }
        return list;
      }
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/controller/list",
    type: "get",
    response: config => {
      const items = data.data;
      return {
        code: 20000,
        data: {
          items: items
        }
      };
    }
  }
];
