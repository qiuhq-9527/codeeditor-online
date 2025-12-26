# CodeEdit-Online

- 一个简约、高效的在线 JavaScript 代码编辑器与运行环境
- 项目没有使用任何前端开发框架，JS原生开发

## 在线预览
https://qiuhq-9527.github.io/codeeditor-online/

## 核心功能

- **在线编辑**：集成高性能 [Ace Editor](https://ace.c9.io/)，支持语法高亮和基础代码补全。
- **真实运行**：接入 [Piston API](https://github.com/engineer-man/piston)，支持真实的 Node.js 环境执行 JavaScript 代码。
- **灵活输入**：
  - **标准输入 (stdin)**：支持向程序传递原始数据。
  - **命令行参数 (args)**：输入框内容自动按空格拆分并作为 `process.argv` 传递到程序中。
- **现代化布局**：
  - 支持横向/纵向拖拽调整编辑器与输出面板比例。
  - 响应式设计，适配不同屏幕尺寸。
- **主题切换**：支持 浅色、深色 以及 跟随系统 的主题模式切换。

## 技术栈

- **前端核心**：Vanilla HTML / CSS / JavaScript
- **编辑器核心**：Ace Editor
- **代码执行**：Piston API (Node.js 18.15.0)
- **样式**：Less (运行时编译) / 原生 CSS

## 快速使用

1. 在左侧编辑器中编写 JavaScript 代码。
2. 在右上方的“输入”框中填入标准输入数据或命令行参数。
3. 点击“运行”按钮，即可在右下方查看真实的程序输出。

## 免责声明

由于本项目使用的代码运行接口为公共 API，请勿在编辑器中运行恶意代码，并注意 API 的调用频率限制
