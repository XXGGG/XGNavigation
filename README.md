<div align="center" style="margin:50px">
    <img src='./public/XGN.svg' width="150">
</div>

<h1 align="center">
🧭 XGNavigation 🧭
</h1>
<p align="center">
A browser home page extension.
</p>
<p align="center">
一个浏览器首页扩展
</p>

<p align="center">
<a href="https://xxggg.github.io/XGNavigation/"><b>Web</b></a> 
|
<a href="https://github.com/XXGGG/XGNavigation"><b>Github</b></a>
</p>
<!-- <p align="center">
 <a href="">Chrome</a> | <a href="">Edge</a> | <a href="">QQ浏览器</a> | <a href="">360浏览器</a>
</p> -->

<br>
<br>

## 📖 介绍

1. 这是一个浏览器首页扩展
2. 点击图标即可跳转到对应网站
   1. 图标可拖拽换位
   2. 图标可删除
3. 搜索栏可切换各种搜索引擎源：
   1. 热门搜索引擎：Google、百度、搜狗、必应
   2. 热门社交搜索：bilibili、知乎、微博、豆瓣
   3. 技术类搜索：Github、CSDN
4. 右上角按钮可以打开侧边栏 ->【设置】
   1. 可添加常用网站
   2. 可更换壁纸、纯色壁纸...
   3. 可调整图标布局
   4. 可设置是否显示搜索栏与快捷图标
   5. 可设置暗黑模式
5. 其他功能还在开发中......


目前这个插件还在完善中，可以通过Web版体验....

## 🖼️ 展示

![图 1](img/READMEshow.png)

## 🚀 记录

### 技术栈 👇

1. Vite3 + Vue3 + TypeScript
2. Pinia
3. [NaiveUI](https://www.naiveui.com/zh-CN/os-theme)
4. indexedDB - [localforage](http://localforage.docschina.org/)
5. 浏览器扩展配置
6. ......

### 思路👇

- 图标拖拽：使用 H5 的拖拽（Drag 和 Drop）
- 动画效果：
  - Vue 的 `TransitionGroup` 和 `Transition`
  - CSS3 的 `animation` 和 `transition`
- 图片投影：【响应式】
  - H5 的 `Canvas` 和 JS 计算出图片综合颜色！
- 数据存储：【持久化】
  - indexedDB - [localforage](http://localforage.docschina.org/)
- ......
  
  
---
更多记录：[谢夏戈的博客 | 🧭 XGNavigation](https://xxggg.github.io/Project/XGNavigation.html)