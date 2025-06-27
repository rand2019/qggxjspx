# 篡改猴(或油猴)插件

# Edge浏览器的扩展
目录结构：
edgeExtension
|--conternt.js
|--manifest.json


To test the extension, please follow these steps:

1. Open Microsoft Edge and navigate to `edge://extensions`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select the directory containing the `manifest.json` and `content.js` files.
4. Navigate to the target website (`https://onlinenew.enetedu.com/*/MyTrainCourse/ChoiceCourse*` or `https://onlinenew.enetedu.com/*/MyTrainCourse/OnlineCourse*`) and open a course playback page.
5. The extension should automatically click the "confirm" buttons on any dialogs that appear during video playback and automate the video playback process.

