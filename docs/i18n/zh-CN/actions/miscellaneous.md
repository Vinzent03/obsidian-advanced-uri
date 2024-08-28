---
sidebar_position: 7
---

# 杂类

| /        | parameters                     | explanation                                  |
| -------- | ------------------------------ | -------------------------------------------- |
| 存在判断 | <identification\>, exists=true | 如果文件存在则复制`1`到剪贴板，反之则返回`0` |
| 插件升级 | updateplugins=true             | 升级全部第三方插件                           |
| 启用插件 | enable-plugin                  | 启动 `enable-plugin` 插件                    |
| 禁用插件 | disable-plugin                 | 禁用 `disable-plugin` 插件                   |

## 读取 Frontmatter

你可以使用 `frontmatterkey` 参数读取 frontmatter 的值。

### 简单结构

```yaml
my_item: my_value
```

设置`frontmatterkey=my_item`参数来复制`my_value`到剪贴板。

### 复合结构

```yaml
my_item:
  second_item: my_value
```

使用`frontmatterkey=[my_item,second_item]`来复制 `my_value`到剪贴板。如`frontmatterkey`复制出的的值是有序列表，每个值之间需要用`,`分割。

```yaml
my_item:
  second_item:
    - A
    - B
```

使用`frontmatterkey=[my_item,second_item,1]`来复制 `B`到剪贴板 , 因为`B` 在列表中的索引位为 `1` 。

**完整示例：**

```
obsidian://adv-uri?vault=<vault>&filepath=MyFile&frontmatterkey=[my_item,second_item,1]
```
