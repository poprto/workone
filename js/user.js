//用户登录和表单项验证注册通用代码、

class FieldValidator {
  constructor(FieldClass, FieldFunc) {
    this.input = $("#" + FieldClass);
    this.p = this.input.nextElementSibling;
    this.FieldFunc = FieldFunc;
    this.input.onblur = () => {
      this.validata();
    };
  }
  /**
   * 验证 成功返回turn  失败返回false
   */
  async validata() {
    const err = await this.FieldFunc(this.input.value);
    if (err) {
      this.p.innerHTML = err;
      return false;
    } else {
      this.p.innerHTML = "";
      return true;
    }
  }
  static async validata(...validapts) {
    const arr = validapts.map((e) => {
      return e.validata();
    });
    const prom = await Promise.all(arr);
    return prom.every((r) => r);
  }
}
