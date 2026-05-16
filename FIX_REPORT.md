# 新雨官网联系方式与 Netlify Forms 接入报告

## 1. 已替换联系方式

- 电话：15908145298
- 微信：shalizi258
- QQ：2562707641

页面联系模块、Footer、家长需求成功页、老师申请成功页、复制按钮和拨号链接已同步更新。

## 2. 已接入 Netlify Forms

- 家长需求表：parent-lead
- 老师申请表：teacher-apply

两个弹窗中的真实表单已加入 method="POST"、data-netlify="true"、netlify-honeypot="bot-field"、form-name 隐藏字段和反垃圾字段。

## 3. 是否增加隐藏静态表单定义

已增加。index.html 底部已放置 parent-lead 和 teacher-apply 两个隐藏静态表单定义，字段名与弹窗真实提交字段保持一致，便于 Netlify 部署时识别表单结构。

## 4. JS 是否使用 application/x-www-form-urlencoded 提交

已使用。script.js 中通过 fetch("/") 以 application/x-www-form-urlencoded 提交，并用 URLSearchParams 编码数据。多选字段会合并为顿号分隔的字符串。

## 5. 本地测试注意事项

Netlify Forms 只有部署到 Netlify 后才会真正收集表单。本地直接打开 index.html 时，fetch("/") 不会进入 Netlify 后台；本地测试只能查看控制台数据和成功页展示效果。

## 6. 失败兜底

提交失败时会保留页面状态并提示用户直接添加微信 shalizi258 或拨打 15908145298，同时在控制台输出错误。

## 7. 保留内容

已保留现有页面结构、移动端优化、老师主页、动画、家长需求表、老师申请表、成功页、二维码占位、复制微信号、复制 QQ 和拨打电话。

## 8. 关键词检查结果

- 旧微信标识 1：0 次
- 旧微信标识 2：0 次
- 旧电话格式 1：0 次
- 旧电话格式 2：0 次
- 指定旧问题词：0 次
