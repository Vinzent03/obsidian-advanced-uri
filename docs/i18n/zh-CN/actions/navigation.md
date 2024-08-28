---
sidebar_position: 1
---

# 导航

| /              | 参数                       | explanation                                                                                |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------ |
| 工作区         | workspace                  | 打开名为 `workspace` 的工作区                                                              |
| 保存当前工作区 | saveworkspace=true         | 保存当前工作区（可以通过绑定 `workspace`在此后打开新的工作区）                             |
| 文件           | <identification\>          | 打开文件                                                                                   |
| 文件中行       | <identification\>, line    | 打开指定文件中的 `line` 行                                                                 |
| 标题           | <identification\>, heading | 打开指定文件中的 `heading`                                                                 |
| 块引用         | <identification\>, block   | 打开指定文件中的 `block`                                                                   |
| 设置标签       | settingid                  | 使用 ID 打开设置页面，全部插件都支持，点击 [这里](settings_navigation.md) 查看可用设置列表 |

:::note Example

打开“main”**工作区** :

```uri
obsidian://adv-uri?vault=<your-vault>&workspace=main
```

打开"my-file.md"中 **标题** "Goal" (**注意：** 仅 `Goal`即可，没有语法表示）:

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&heading=Goal
```

打开"my-file.md"中 id 为"12345" 的**块** (**注意：** 仅`12345`即可，没有语法标识）:

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&block=12345
```

:::

:::tip
你可以指定自定义的 [视图模式](../concepts/navigation_parameters.md)
:::
