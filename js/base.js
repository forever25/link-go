
$(document).ready(() => {

  // 关闭弹窗
  $('.dialog .dialog-header .dialog-close').click(() => {
    $('.dialog').hide(600)
  })

  window.dialogShow = (selector  = ".dialog")=> {
    $(selector).show(600)
  }
})