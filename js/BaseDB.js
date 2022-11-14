// 响应式

(() => {
  function reactive(obj, handler) {
    if (typeof obj === 'object') {
      Object.keys(obj).forEach(it => {
        if (typeof obj[it] === 'object') {
          obj[it] = reactive(obj[it], handler)
        }
      })
      return new Proxy(obj, handler)
    } else {
      return null
    }
  }

  function createDB(data, callBack = () => { }) {

    const handler = {
      set(obj, prop, value) {
        callBack(...arguments)
        return Reflect.set(...arguments)
      }
    }

    return reactive(data, handler)
  }
  // 挂载到windows上
  window.createDB = createDB;

})();

// 创建响应式数据对象,用于存放所有数据
window.DB = createDB({
  userInfo: {
    userName: '测试'
  },
  roadList: [],
}, (...arg) => {
  console.log(arg)

})