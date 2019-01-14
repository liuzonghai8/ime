export default{
     //添加用户
     addUser0(state,user){
        //后端添加用户的逻辑
        console.log("mutations addUser")
        console.log(user)
        state.users.push(user)
      },
      //删除用户
      removeUser0(state,user){
        //后端删除用户的逻辑
        state.users.splice(user,1)
      },
      //in
      incerement(state,param){
        console.log(param),
        state.count += param,
        console.log(state.count)
      },
      getUsers(state,param){
        
      }
}