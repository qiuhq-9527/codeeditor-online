// Ace编辑器管理
class CodeEditor {
  constructor() {
    this.container = document.querySelector(".content-code");
    this.editor = null;
    this.init();
    this.setupThemeSync();
  }

  init() {
    const editorDiv = document.createElement("div");
    editorDiv.className = "ace-editor-container";
    this.container.appendChild(editorDiv);

    this.editor = ace.edit(editorDiv);
    ace.require("ace/ext/language_tools");

    this.editor.setTheme("ace/theme/chrome");
    this.editor.session.setMode("ace/mode/c_cpp");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      fontSize: 14,
      fontFamily: "Monaco, Courier New, monospace",
      showLineNumbers: true,
      showGutter: true,
    });

    const initialCode = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;

    this.editor.setValue(initialCode);
    this.editor.clearSelection();
  }

  setupThemeSync() {
    const observer = new MutationObserver(() => {
      this.updateEditorTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  updateEditorTheme() {
    if (!this.editor) return;

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const theme = isDark ? "ace/theme/tomorrow_night" : "ace/theme/chrome";
    this.editor.setTheme(theme);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.codeEditorInstance = new CodeEditor();
});
