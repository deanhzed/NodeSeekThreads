[中文](./README-zh.md)

# NodeSeek Threads

## English 🇬🇧

This Tampermonkey user script enhances the comment section on NodeSeek.com by providing advanced nested comment functionalities, including reliable username extraction, fully asynchronous cross-page quoting, and asynchronous mention processing.

### ✨ Features

*   **Enhanced Nested Comments:** Organizes replies into a clear, nested structure.
*   **Reliable Username Extraction:** Accurately identifies comment authors.
*   **Asynchronous Cross-Page Quoting:** Fetches and displays quotes from other pages without blocking the main thread, ensuring a smooth user experience and preventing image loading delays.
*   **Asynchronous Mention Processing:** Processes mentions in the background, preventing performance bottlenecks during page load.
*   **Signature Toggle:** Option to hide or show user signatures via Tampermonkey menu.

### 🚀 Installation

1.  Install a user script manager like [Tampermonkey](https://www.tampermonkey.net/) (recommended) or [Violentmonkey](https://violentmonkey.github.io/).
2.  Click on the following link to install the script:
    [nodeseek-threads-v1.6.user.js](nodeseek-threads-v1.6.user.js) or [greasyfork.org](https://greasyfork.org/zh-CN/scripts/542426-nodeseek-threads?locale_override=1)
3.  Confirm the installation in your user script manager.

### 💡 Usage

Once installed, the script will automatically enhance the comment section on `https://www.nodeseek.com/post-*` pages. You can toggle the display of user signatures via the Tampermonkey menu icon in your browser toolbar.

## 📝 Author

- Dean & Gemini 

### 💻 Development

If you wish to contribute or modify the script:

1.  Clone this repository.
2.  Make your changes to `nodeseek-threads-v1.6.user.js`.
3.  Load the local file into your user script manager.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
