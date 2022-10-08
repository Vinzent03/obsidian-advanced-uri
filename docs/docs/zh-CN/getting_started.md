---
sidebar_position: 3
---

# 开始使用

这里，我们讲解通过创建并启动 URI 来打开笔记的完整的工作流。

## 创建 URI

### 收集参数

假设我们想要打开文件`Home Index/today.md`。通过查看 [操作导航](actions/navigation.md) 得知我们唯一需要的参数是一个文件的 [识别符](concepts/file_identifiers.md)。因此我们我们可以使用`filepath`参数来创建一个新的文件。

如你所见，我们的文件地址包括了一个空格和一个斜线。因此，我们必须对特殊符号进行 [编码](concepts/encoding.md)。通过在 [在线 url 编码](https://www.urlencoder.io/) 输入`Home Index/today`（你可以忽略掉文件的拓展名），你获得了`Home%20Index%2Ftoday`的输出。现在我们有了参数键`filepath`和参数值`Home%20Index%2Ftoday`。

### 构建 URI

如 [架构](concepts/schema.md) 中所述，每个 URI 都必须以 `obsidian://advanced-uri`开头。有关更详细的说明，请参阅 [架构](concepts/schema.md)。我们最终得到的 URI 如下所示。

```uri
obsidian://advanced-uri?filepath=Home%20Index%2Ftoday
```

## 启动 URI

有**很多**种启动 URI 的方式。我仅仅列出最常见的部分

### 浏览器

你可以简单的在搜索栏输入 URI。他将询问你是否拉起外部应用。

### Obsidian 内部链接

你可以在 Obsidian 内部启动一个 ObsidianURI. 因为`obsidian://`是一个自定义的连接方式，它不会被直接认为是一个链接。我们可以通过将他涵盖在一个 markdown 链接里来修复这一点。

```md
[This here is shown](obsidian://advanced-uri?filepath=Home%20Index%2Ftoday)
```

### 终端

#### Linux

对于`xdg-open`来说整个 URI 编码需要编译两次.查看[编码](concepts/encoding.md)来获得更多信息

```bash
xdg-open "obsidian://advanced-uri?filepath=Home%2520Index%252Ftoday"
```

#### Mac

你可以使用 Mac 的 shell 命令`open`来启动 Obsidian，并使用`--background`参数来让 Obsidian 在后台运行。

```bash
open --background "obsidian://advanced-uri?vault=my-vault&filename=my-file&data=my-data"
```
