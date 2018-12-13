const menus = [
    {
      action: "home",
      title: "主要",
      path:"/index",
       items: [{ title: "首页", path: "/dashboard" }]
    },
    {
      action: "settings",
      title: "系统管理",
      path:"/sys",
      items: [
        { title: "人员管理", path: "/user" },
        { title: "权限管理", path: "/auth" },
        { title: "机构管理", path: "/dept" },
        { title: "角色管理", path: "/role" }
      ]
    },
    {
      action: "people",
      title: "会员管理",
      path:"/user",
      items: [
        { title: "会员统计", path: "/statistics" },
        { title: "会员管理", path: "/list" }
      ]
    },
    {
      action: "attach_money",
      title: "销售管理",
      path:"/trade",
      items: [
        { title: "图标测试", path: "/test" },
        { title: "订单管理", path: "/order" },
        { title: "物流管理", path: "/logistics" },
        { title: "促销管理", path: "/promotion" }
      ]
    },
    {
      action: "settings",
      title: "权限管理",
      path:"/authority",
      items: [
        { title: "权限管理", path: "/list" },
        { title: "角色管理", path: "/role" },
        { title: "人员管理", path: "/member" }
      ]
    }
  ]
  
  export default menus;