
 const user = {
    state: { 
        count: 10
     },
    mutations: {  },
    actions: {  },
    getters: { 
        tenCount: state=>{
            return state.count*10
        }
        
     }
}
export default user