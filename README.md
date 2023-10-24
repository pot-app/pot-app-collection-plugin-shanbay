# Pot-App 扇贝生词本插件

## 支持平台

- [x] Windows
  - [x] x64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/x86_64-pc-windows-msvc.zip)
  - [x] x86 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/i686-pc-windows-msvc.zip)
  - [x] aarch64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/aarch64-pc-windows-msvc.zip)
- [x] Linux
  - [x] x64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/x86_64-unknown-linux-gnu.zip)
  - [x] x86 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/i686-unknown-linux-gnu.zip)
  - [x] aarch64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/aarch64-unknown-linux-gnu.zip)
  - [x] armv7 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/armv7-unknown-linux-gnueabihf.zip)
- [x] MacOS
  - [x] x64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/x86_64-apple-darwin.zip)
  - [x] aarch64 [下载](https://ghproxy.com/https://github.com/pot-app/pot-app-collection-plugin-shanbay/releases/latest/download/aarch64-apple-darwin.zip)

## 使用方法

1. 下载对应平台的插件，解压得到 `.potext` 文件
2. 打开Pot-偏好设置-服务设置-翻译-添加外部插件-安装外部插件
3. 选择刚刚解压得到的 `.potext` 文件，安装成功
4. 将插件添加到服务列表即可使用

## Auth Token 获取方法

1. 浏览器打开扇贝官网: [shanbay.com](https://shanbay.com)
2. 登录扇贝账号
3. `F12` 打开 `开发者工具`
4. 点击 `网络`, 然后刷新页面
5. 找到 `checkin` 请求
6. 在其 `Cookie` 中找到 `auth_token` 字段，复制值

![示意图](./devtools.png)
