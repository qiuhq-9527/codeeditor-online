/**
 * 代码运行管理（节流5秒）
 * 后续在此文件集成真实的代码逻辑和输出
 */
class InputFormManager {
  constructor() {
    this.form = document.getElementById("inputForm");
    this.outputContent = document.getElementById("outputContent");
    this.lastSubmitTime = 0;
    this.throttleDelay = 5000;
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const now = Date.now();
    if (now - this.lastSubmitTime < this.throttleDelay) {
      return;
    }

    this.lastSubmitTime = now;
    const inputData = new FormData(this.form).get("inputData");
    const code = this.getEditorCode();
    this.onSubmit(code, inputData);
  }

  getEditorCode() {
    const codeEditor = window.codeEditorInstance;
    if (codeEditor && codeEditor.editor) {
      return codeEditor.editor.getValue();
    }
    return "";
  }

  setRunning() {
    this.outputContent.textContent = "正在运行中...";
    this.outputContent.classList.add("empty");
  }

  setOutput(text) {
    this.outputContent.textContent = text;
    this.outputContent.classList.remove("empty");
  }

  clearOutput() {
    this.outputContent.textContent = "请运行代码";
    this.outputContent.classList.add("empty");
  }

  /**
   * 代码运行回调（待实现）
   */
  onSubmit(code, inputData) {
    console.log("代码:", code);// 可删
    console.log("输入数据:", inputData);// 可删

    this.setRunning();

    // 可删
    setTimeout(() => {
      const testOutput = `测试文本\n测试文本:\nHello, Test!\n\n输入数据:\n${inputData || "(无)"}`;
      this.setOutput(testOutput);
    }, 1500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new InputFormManager();
});
