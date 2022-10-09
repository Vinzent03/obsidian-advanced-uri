---
sidebar_position: 3
---

# 命令

有两种方式来识别命令

- `commandname` That's the one you see when searching in Obsidian's command palette
- `commandid` That's invisible to the user, but can be read from the plugin's source code

:::info
强烈推荐使用命令 ID，因为它似乎不会改变 使用 [辅助命令](../tips/helper_commands.md) 将自动获取命令 ID.
:::

在下列中的 `<command>` 可以被 `commandname` 或`commandid`取代。

| 参数                                          | 介绍                                                 |
| --------------------------------------------- | ---------------------------------------------------- |
| <command\>                                    | 按名执行命令                                         |
| <command\>, <identification\>                 | 打开文件之后按名执行命令                             |
| <command\>, <identification\>, line=myline    | 打开文件，将光标定位到 myline 处而后按名执行命令     |
| <command\>, <identification\>, mode=append    | 打开文件，在末尾添加空行并设置光标，之后按名执行命令 |
| <command\>, <identification\>, mode=prepend   | 打开文件，在开始添加空行并设置光标，之后按名执行命令 |
| <command\>, <identification\>, mode=overwrite | 打开文件，清空文件之后按名执行命令                   |
