---
sidebar_position: 3
---

# 文件识别符

有多种方式来指向一个文件:

1. [文件识别符](#文件识别符)
   1. [文件路径](#文件路径)
   2. [文件名](#文件名)
   3. [Daily note](#daily-note)
   4. [frontmatter 区键](#frontmatter-区键)

:::caution
确保你的值被完全 [编码](i18n/zh-CN/docusaurus-plugin-content-docs/current/concepts/encoding.md)
:::

## 文件路径

- 键：`filepath`
- 值：基于库的路径
- 示例：`hobbies/soccer.md` / `hobbies/soccer`
- 提示：你可以忽略掉`.md`扩展名。

## 文件名

- 键：`filename`
- 值：仅文件名而不需实际路径
- 示例：`soccer` / `soccer.md`
- 提示：你可以忽略`.md`扩展名。他如`[[fileName]]`一样仅需要文件名，也支持别名。

## Daily note

- 键：`daily`
- 值：`true`
- 示例：`daily=true`
- 提示：使用当天的日记仅需要将值设置为`true`. 如不存在则将自动创建该文件。

## frontmatter 区键

- 键：`uid`
- 示例：`uid=d43f7a17-058c-4aea-b8dc-515ea646825a`
- 使用场景：一些用户希望通过使用 UUID 来替代文件路径导航到特殊的笔记的方式来使他们重命名文件时链接依旧生效
- 提示：通过在设置中进行设置将使每一次创建命令时使用`uid`参数来替代掉 `filepath`参数。该 uid 值将读取 frontmatter 中的 uid 或在 frontmatter 中创建该值。

:::info
使用`uid`来进行 [导航](../actions/navigation.md) 是默认被设置为开启且支持的。
:::

:::info
By specifying `uid` and `filepath` it creates a new file, if no file with `uid` exists, at `filepath` and writes `uid` to the frontmatter.
通过特殊的`uid`和`filepath`创建文件时，如无文件具有该`uid` 则在该文件路径写入 `uid`。
:::
