---
sidebar_position: 1
---

# 框架

传递值给 URI 的方式与其他 URL 方式类似

几乎每一个 URI 都开始于`obsidian://adv-uri`。值被设置在`?`后的键值对`key=value`中。键值对本身由`&`进行分割

例如下面的示例 URI：

```url
obsidian://adv-uri?key1=value1&key2=value2
```

:::caution
确保你的值被完整的 [编码](i18n/zh-CN/docusaurus-plugin-content-docs/current/concepts/encoding.md)
:::

## 库参数

**每一个** Obsidian URI 都支持`vault`参数来定义执行 URI 的目标库。如果将其置空，则将使用你最近一次使用的库。

:::note Example
特定库:

```uri
obsidian://adv-uri?vault=myVault&key1=value1
```

最近使用的库:

```uri
obsidian://adv-uri?key1=value1
```

:::
