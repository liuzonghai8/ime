export const set = property => (state, payload) => (state[property] = payload)

//柯里化 ➕箭头函数 实际function toggle(property){function(state){state[property] = !state[property]}}
export const toggle = property => state => (state[property] = !state[property])

