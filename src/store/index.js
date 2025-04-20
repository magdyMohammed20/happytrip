import { createStore, createLogger } from 'vuex'

// const debug = process.env.NODE_ENV !== 'production'

const module = {};
let modules = import.meta.glob('./modules/*.js',{eager : true})

for (const key in modules){
  module[modules[key].default.name] = modules[key].default
}

export default createStore({
  modules: module,
  // store,
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})