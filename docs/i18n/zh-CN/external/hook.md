# Hook

[Hook](https://hookproductivity.com) 管理指向各种第三方应用程序的链接。从 3.4.3 版本开始，它们支持 [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) 以通过 URI 获取`file:///`链接、强大的`obsidian://`链接以及创建新文件。

阅读 [他们的文档](https://hookproductivity.com/help/integration/using-hook-with-obsidian/#advanced) 来获得详细的说明。

## Get `file://` and `obsidian://` URIs

截止到现在，他们唯一的动作不是 `advanced-uri`。 而是使用 `hook-get-advanced-uri`。

需要设置`x-success` 及 `x-error` 参数。 他通过参数 `advanceduri`支持 `obsidian://advanced-uri` URI 通过`fileuri`参数支持 `file://` URI 传递给 `x-success` URI 并启动该 URI.

:::info
这款插件与默认的 Obsidian URI 相比优势在于具有使用强大的基于 frontmatter 的链接功能。通过在插件设置中启用`Use UID instead of file paths`它可以自动为`obsidian://advanced-uri`创建 UID
:::
