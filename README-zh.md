[English](./README.md)

# NodeSeek 楼中楼

此 Tampermonkey 用户脚本通过提供增强的嵌套评论功能，改进了 NodeSeek.com 上的评论区，包括可靠的用户名提取、完全异步的跨页引用和异步提及处理。

### ✨ 功能

*   **增强型嵌套评论：** 将回复组织成清晰的嵌套结构。
*   **可靠的用户名提取：** 准确识别评论作者。
*   **异步跨页引用：** 从其他页面获取并显示引用，不阻塞主线程，确保流畅的用户体验，并避免图片加载延迟。
*   **异步提及处理：** 在后台处理提及，防止页面加载时的性能瓶颈。
*   **签名切换：** 通过 Tampermonkey 菜单在浏览器工具栏中切换用户签名的显示或隐藏。

### 🚀 安装

1.  安装一个用户脚本管理器，例如 [Tampermonkey](https://www.tampermonkey.net/) (推荐) 或 [Violentmonkey](https://violentmonkey.github.io/)。
2.  点击以下链接安装脚本：
    [nodeseek-threads-v1.6.user.js](nodeseek-threads-v1.6.user.js) or [greasyfork.org](https://greasyfork.org/zh-CN/scripts/542426-nodeseek-threads?locale_override=1)
3.  在您的用户脚本管理器中确认安装。

### 💡 使用方法

安装后，脚本将自动增强 `https://www.nodeseek.com/post-*` 页面上的评论区。您可以通过浏览器工具栏中的 Tampermonkey 菜单图标切换用户签名的显示。

## 📝 作者

- Dean & Gemini 

### 💻 开发

如果您希望贡献或修改脚本：

1.  克隆此仓库。
2.  修改 `nodeseek-threads-v1.6.user.js` 文件。
3.  将本地文件加载到您的用户脚本管理器中。

## 许可证

本项目采用 MIT 许可证 - 有关详细信息，请参阅 [LICENSE](LICENSE) 文件。
