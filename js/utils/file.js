// 读取文件
(() => {

  /**
   * @description: 将js对象转为JSON
   * @param {*} data
   * @return {*}
   */
  function saveJSONToFile(obj) {
    const jsonStr = JSON.stringify(obj, null, 2);
    var blob = new Blob([jsonStr], { type: "text/json" })

    var a = document.createElement('a');
    a.download = 'config.json';
    a.href = window.URL.createObjectURL(blob);
    a.click()
  }

  /**
   * @description: 读取文件
   * @param {*} selector  选择器
   * @param {*} callBack 回调函数 返回的是文件数据
   * @return {*}
   */
  window.readFile = (selector, callBack = () => { }) => {
    $(selector).on('change', (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        callBack(reader.result)
      };
      reader.readAsText(file);

    })
  }

  /**
   * @description: 下载文件
   * @param {*} selector  选择器
   * @param {*} obj 需要转成文件的js对象
   * @return {*}
   */
  window.downLoadFile = (selector, obj) => {
    $(selector).on('click', ((obj) => {
      saveJSONToFile(obj)
    })(obj))
  }
})();

