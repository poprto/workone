var loginIdVaslidator = new FieldValidator("txtLoginId", async function (val) {
  if (!val) {
    return "请输入账号";
  }
  const err = await API.existe(val);

  if (err.data) {
    return "账号已经存在";
  }
});
const loginIdVasname = new FieldValidator("txtNickname", async function (val) {
  if (!val) {
    return "请填写昵称";
  }
});
const loginIdVaPwad = new FieldValidator("txtLoginPwd", async function (val) {
  if (!val) {
    return "请填写密码";
  }
});
const ConfirmPassword = new FieldValidator(
  "txtLoginPwdConfirm",
  async function (val) {
    if (!val) {
      return "请填写密码";
    }
    if (val !== loginIdVaPwad.input.value) {
      return "密码不一致";
    }
  }
);
const form = $(".user-form");
form.onsubmit = async function (e) {
  e.preventDefault();
  const result = await FieldValidator.validata(
    loginIdVaslidator,
    loginIdVasname,
    loginIdVaPwad,
    ConfirmPassword
  );
  if (!result) {
    return;
  }
  const formtext = new FormData(form);
  const data = Object.fromEntries(formtext.entries());
  const resp = await API.register(data);
  if (resp.code === 0) {
    alert("注册成功，点击跳转");
    location.href = "./login.html";
  }
};
