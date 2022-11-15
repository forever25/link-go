// 响应式数据集
(() => {
  // 数据库初始配置
  const dbConfig = {
    name: 'DBconfig', // 存储到localStorage 的字段名称
    defaultData: {
      userInfo: {
        userName: '测试'
      },
      roadList: [],
      rankList: [
        {
          timeRemaining: 20,
          nickname: 'csw',
          scores: 1234
        },
        {
          timeRemaining: 20,
          nickname: 'cswa',
          scores: 1223
        },
        {
          timeRemaining: 21,
          nickname: 'cswav',
          scores: 1223
        }
      ]
    }
  }
  // 防抖
  let timer = null;

  // 每次数据更改后需要调用的回调函数列表
  let DBCallBackList = [(data) => {
    localStorage.setItem(dbConfig.name, JSON.stringify(data))
  }];

  // 获取缓存的数据
  const DATA = localStorage.getItem(dbConfig.name)
  if (DATA) {
    try {
      window.DB = createDB(JSON.parse(DATA))
    } catch (error) {
      window.DB = createDB(dbConfig.defaultData)
    }
  } else {
    window.DB = createDB(dbConfig.defaultData)
  }

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

  function createDB(data) {
    const handler = {
      set(obj, prop, value) {
        callBack()
        return Reflect.set(...arguments)
      }
    }
    return reactive(data, handler)
  }

  // 防抖调用回调
  function callBack() {
    clearTimeout(timer)
    timer = setTimeout(it => {
      DBCallBackList.forEach(it => {
        it(DB)
      })
    }, 200)
  }

  // 挂载到windows上,用于操作回调
  window.DBCallBack = {
    addCallBack(fn) {
      if (typeof fn === 'function') {
        DBCallBackList.push(fn)
      }
    },
    removeCallBack(fn) {
      if (typeof fn === 'function') {
        DBCallBackList = DBCallBackList.filter(it => it !== fn)

      }
    }
  }
})();
