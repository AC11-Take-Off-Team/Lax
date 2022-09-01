let button = document.querySelector(".button");
let text = document.querySelector(".text");

function Touch() {
  //button =<button class="absolute top-1"/>
  //button.classList = [absolute ,top-1] ,取得button的class並轉成陣列
  button.classList.toggle("buttonClass");
  // 對button做buttonClass狀態切換
  // classList.add(新增),classList.(移除),classList.toggle(切換這兩種狀態)
  if (button.classList.contains("buttonClass")) {
    // 如果button的class是否存在, contains判斷class是否存在並返回布林值
    text.innerHTML =
      "設為私人,當频道設置為私人時，只有受邀請之後才能查看或加入。";
  } else {
    text.innerHTML = "設為私人,這無法撤銷,私人頻道不能變更為公共頻道";
  }
}
export default Touch;
