---
sidebar_position: 2
---

# Writing

:::caution
Make sure your values are properly [encoded](../concepts/encoding.md)
:::

| /         | parameters                              | explanation                                                                                     |
| --------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| write     | <identification\>, data                 | Only writes `data` to the file if the file is not already present                               |
| overwrite | <identification\>, data, mode=overwrite | Writes `data` to `filepath` even if the file already exists                                     |
| append    | <identification\>, data, mode=append    | Only appends `data` to the file                                                                 |
| prepend   | <identification\>, data, mode=prepend   | Only prepends `data` to the file                                                                |
| new       | filepath, data, mode=new                | Definitely creates a new file. If `filepath` already exists, an incrementing number is appended |

:::note Example
**Write** "Hello World" to "my-file.md":
```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=Hello%20World
```

**Overwrite** "This text is overwritten" to "my-file.md":
```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=This%20text%20is%20overwritten&mode=overwrite
```

**Append** "Hello World" to today's **daily note**:
```uri
obsidian://advanced-uri?vault=<your-vault>&daily=true&data=Hello%20World&mode=append
```
:::

:::info
You may use the `heading` parameter to append and prepend data to a heading. More information in [Navigation](navigation.md)