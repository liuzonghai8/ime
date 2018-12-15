
 const user = {
    state: { 
      count: 0,
        users:[ {
          name: "Frozen Yogurt",
          sex: "男",
          phone: "1388888888",
          status: "启动"
        },
      
        {
          name: "Yogurt",
          sex: "女",
          phone: "1388888888",
          status: "启动"
        }]
     },
    mutations: {
      //添加用户
          addUser(state,user){
            //后端添加用户的逻辑
            state.users.push(user)
          },
          //删除用户
          removeUser(state,user){
            //后端删除用户的逻辑
            state.users.splice(user,1)
          }
      },
    actions: { 
      addUser1(context){
        console.log("actions = context")
        context.commit('addUser')
      }

     },
    getters: { 
        }
     
}

const usersData = [
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
  
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"
    },
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"
    },
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"
    },
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"
    },
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "周杰伦",
      sex: "男",
      phone: "1388888888",
      status: "禁用"
    },
    {
      name: "Yogurt",
      sex: "女",
      phone: "1388888888",
      status: "启动"
    },
    {
      name: "Frozen Yogurt",
      sex: "男",
      phone: "1388888888",
      status: "启动"
    }]
export default user