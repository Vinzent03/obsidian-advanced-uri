---
sidebar_position: 2
---

# 写入

:::caution
确保你的值被完全 [编码](../concepts/encoding.md)
:::

:::info
`data` 参数可以通过设置 `clipboard=true` 来使用你剪贴板的值进行覆盖。
:::

| /    | 参数                                    | 解释                                                               |
| ---- | --------------------------------------- | ------------------------------------------------------------------ |
| 写入 | <identification\>, data                 | 仅当文件不存在时将`data`写入文件                                   |
| 覆写 | <identification\>, data, mode=overwrite | 文件存在也将 `data` 写入 `filepath`                                |
| 追加 | <identification\>, data, mode=append    | 仅在文件后追加 `data`                                              |
| 前插 | <identification\>, data, mode=prepend   | 仅在文件前插入 `data`                                              |
| 新建 | filepath, data, mode=new                | 创建一个文件。如果 `filepath` 文件存在则新建一个带有递增数字的文件 |

:::note Example
**写入** "Hello World" 到 "my-file.md":

```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=Hello%2520World
```

**覆写** "This text is overwritten" 到 "my-file.md":

```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=This%2520text%2520is%2520overwritten&mode=overwrite
```

**追加** "Hello World" 到今天的 **日记**:

```uri
obsidian://advanced-uri?vault=<your-vault>&daily=true&data=Hello%2520World&mode=append
```

从**剪贴板追加** 内容到 **daily note**:

```uri
obsidian://advanced-uri?vault=<your-vault>&daily=true&clipboard=true&mode=append
```

:::info
你可以使用 `heading` 参数来在标题进行追加或前插数据。更多信息见 [导航](navigation.md)
:::
