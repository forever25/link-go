function loadGame() {
  $('#fileInput').click();
  readFile("#fileInput", (e) => {

  })
}

function toPage(page) { 
  const nickname = $('#nickname').val()
  if(!nickname) {
    return false
  }
  DB.userInfo.nickname = nickname;
  setTimeout(() => {
    window.location.href = page
  },60)
  return false;
 }