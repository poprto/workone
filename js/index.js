//验证是否有登录，如果没有登录，跳转到登录页，如果有登录，获取登录用户信息
(async function () {
  const a = await API.profile();
  const User = a.data;
  if (!User) {
    alert("登录已过期，请重新登录");
    location.href = "/静态页面/login.html";
    return;
  }
  //下面代码环境一定是登录状态
  const demo = {
    aside: {
      nickname: $("#nickname"),
      loginId: $("#loginId"),
    },
    colse: $(".close"),
    chat: $(".chat-container"),
    txtMsg: $("#txtMsg"),
    msg: $(".msg-container"),
  };

  //注销事件
  demo.colse.onclick = function () {
    API.loginOut();
    location.href = "/静态页面/login.html";
  };
  //加载历史记录
  loadHistory();
  async function loadHistory() {
    const resp = await API.getHistory();
    resp.data.forEach((element) => {
      Chatnews(element);
    });
    GoBottom();
  }
  //将滚动条移到最下面
  function GoBottom() {
    demo.chat.scrollTop = demo.chat.scrollHeight;
  }
  //设置用户信息
  SetUserInfo();
  function SetUserInfo() {
    demo.aside.nickname.innerText = User.loginId;
    demo.aside.loginId.innerText = User.nickname;
  }

  function Chatnews(arr) {
    //创建div
    const div = $$$("div");
    div.classList.add("chat-item");
    if (arr.from) {
      div.classList.add("me");
    }
    //创建img
    const img = $$$("img");
    img.classList.add("chat-avatar");
    img.src = arr.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    //创建聊天记录div
    const Chatold = $$$("div");
    Chatold.classList.add("chat-content");
    Chatold.innerText = arr.content;
    //创建时间div
    const Time = $$$("div");
    Time.classList.add("chat-date");
    Time.innerText = DatePicker(arr.createdAt);
    //添加子元素
    demo.chat.appendChild(div);
    div.appendChild(img);
    div.appendChild(Chatold);
    div.appendChild(Time);
    //解析时间戳
    function DatePicker(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hour = date.getHours().toString().padStart(2, "0");
      const minute = date.getMinutes().toString().padStart(2, "0");
      const second = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  }
  //发送消息
  async function sendChat(msg) {
    Chatnews({
      from: User.loginId,
      to: "null",
      content: msg,
      createdAt: new Date(),
    });
    GoBottom();
    const reply = await API.sendChat(msg);
    Chatnews(reply.data);
    GoBottom();
  }
  demo.msg.onsubmit = function (e) {
    e.preventDefault();
    const text = demo.txtMsg.value.trim();
    sendChat(text);
    demo.txtMsg.value = "";
  };
})();
