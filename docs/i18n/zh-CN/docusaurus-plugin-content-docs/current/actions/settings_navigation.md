---
sidebar_position: 5
---

# 导航设置

:::info
每个设置的选项卡都可以通过插件 ID 来打开。可以在`<your-vault>/.obsidian/plugins/<your-plugin>/manifest.json`找到对应的 ID 值。
:::

## Obsidian 设置

| id                | 含义       |
| ----------------- | ---------- |
| editor            | 编辑器     |
| file              | 文件及链接 |
| appearance        | 外观       |
| hotkeys           | 快捷键     |
| about             | 关于       |
| account           | 账户       |
| core-plugins      | 核心插件   |
| community-plugins | 第三方插件 |

## Obsidian 二级页面

| id             | 含义     |
| -------------- | -------- |
| theme-browser  | 主题浏览 |
| plugin-browser | 插件浏览 |

## 核心插件设置

| id              | 含义     |
| --------------- | -------- |
| note-composer   | 笔记重组 |
| backlink        | 反链     |
| switcher        | 快速切换 |
| command-palette | 命令面板 |
| daily-notes     | 日记     |
| file-recovery   | 文件恢复 |
| page-preview    | 页面预览 |

:::note Example

```uri
obsidian://advanced-uri?vault=<your-vault>&settingid=editor
```

:::

:::note Source
感谢 [hyaray](https://github.com/hyaray) 收集了 [Obsidian forum](https://forum-zh.obsidian.md/t/topic/7365) 的全部插件 ID。
:::
