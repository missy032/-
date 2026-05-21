# 心力自检表

匿名在线答题页，提交后可将分数写入 Google 表格后台。

## 文件说明

| 文件 | 说明 |
|------|------|
| `xinli-zijian.html` | 答题页面（部署到 Netlify / GitHub Pages 等） |
| `xinli-zijian-backend.gs` | Google Apps Script 后台脚本 |
| `心力自检-后台配置说明.md` | 后台与 `SUBMIT_URL` 配置步骤 |

## 发布

1. 按配置说明部署 Google 脚本，将 URL 填入 `xinli-zijian.html` 中的 `CONFIG.SUBMIT_URL`
2. 将 `xinli-zijian.html` 发布到静态托管（Netlify、GitHub Pages 等）
