/**
 * 代码运行管理（节流5秒）
 * 已集成 Piston API 用于执行 JavaScript 代码
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
  async onSubmit(code, inputData) {
    this.setRunning();

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "javascript",
          version: "18.15.0",
          files: [
            {
              content: code,
            },
          ],
          stdin: inputData || "",
        }),
      });

      const data = await response.json();

      if (data.run) {
        const output = data.run.output || "运行成功，无输出内容";
        this.setOutput(output);
      } else {
        this.setOutput("运行失败：无法获取执行结果。");
      }
    } catch (error) {
      console.error("执行出错:", error);
      this.setOutput("网络错误或服务不可用，请稍后再试。");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new InputFormManager();
});
