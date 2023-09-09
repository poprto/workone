var API = (function () {
  const LOCT = "https://study.duyiedu.com";
  const TOKEN_KEY = "toke";
  function get(path) {
    const headers = {};
    const auto = localStorage.getItem(TOKEN_KEY);
    if (auto) {
      headers.authorization = `Bearer ${auto}`;
    }
    return fetch(LOCT + path, {
      headers,
    });
  }

  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const auto = localStorage.getItem(TOKEN_KEY);
    if (auto) {
      headers.authorization = `Bearer ${auto}`;
    }
    return fetch(LOCT + path, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }
  //账号注册
  async function register(UserInof) {
    const resp = await post("/api/user/reg", UserInof);
    return await resp.json();
  }
  //账号登陆
  async function entry(loginInof) {
    const resp = await post("/api/user/login", loginInof);
    const result = await resp.json();
    if (result.code === 0) {
      //登录成功
      //获取请求头
      const toke = resp.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, toke);
    }
    return result;
  }
  //验证账号
  async function existe(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }
  //当前登录的账号信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  //发送聊天消息
  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }
  //获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }
  return {
    register,
    entry,
    existe,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
