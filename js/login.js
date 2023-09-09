const AccountNumber = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请输入账号";
  }
});
const cryptogram = new FieldValidator("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});
const LandForm = $(".user-form");
LandForm.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validata(AccountNumber, cryptogram);
  if (!result) {
    result;
  }
  const formtext = new FormData(LandForm);
  const data = Object.fromEntries(formtext.entries());
  console.log(data);
  const respen = await API.entry(data);

  if (respen.code === 0) {
    alert("注册成功，点击跳转");
    location.href = "/静态页面/index.html";
  } else {
    alert("登录失败，账号或密码错误");
  }
};
