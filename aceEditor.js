// Ace编辑器管理
class CodeEditor {
  constructor() {
    this.container = document.querySelector(".content-code");
    this.editor = null;
    this.themes = {
      light: ["chrome", "github", "solarized_light", "twilight"],
      dark: ["dracula", "monokai", "solarized_dark", "tomorrow_night"],
    };
    this.currentThemeIndex = {
      light: 2, // github
      dark: 2,  // dracula
    };
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
    this.editor.session.setMode("ace/mode/javascript");
    this.editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      fontSize: 14,
      fontFamily: "Monaco, Courier New, monospace",
      showLineNumbers: true,
      showGutter: true,
    });

    const initialCode = `// ES2015-ES2024 JavaScript
console.log("Hello, World!");`;

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
    const mode = isDark ? "dark" : "light";
    const themeList = this.themes[mode];
    const themeIndex = this.currentThemeIndex[mode];
    const themeName = themeList[themeIndex];
    const theme = `ace/theme/${themeName}`;
    this.editor.setTheme(theme);
  }

  cycleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const mode = isDark ? "dark" : "light";
    const themeList = this.themes[mode];
    this.currentThemeIndex[mode] = (this.currentThemeIndex[mode] + 1) % themeList.length;
    this.updateEditorTheme();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.codeEditorInstance = new CodeEditor();
});
