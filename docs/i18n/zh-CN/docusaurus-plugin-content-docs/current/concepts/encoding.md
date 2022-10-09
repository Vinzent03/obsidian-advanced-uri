---
sidebar_position: 2
---

# 编码

特殊符号如`?`和空格需要被编码。有一些在线编码网站例如 [此工具](https://www.urlencoder.io/)。只需简单地输入你得参数值再编码即可

一些编码示例：

- 空格 → `%20`
- `/` → `%2F`
- `%` → `%25`

键值对`myKey=Hello World` 需要被编码如下：

```uri
obsidian://advanced-uri?myKey=Hello%20World
```

如需使用`xdg-open`启动 URI，你需要将值编码两次

```uri
obsidian://advanced-uri?myKey=Hello%2520World
```

可以注意到，此处`%`被`%25`取代了
