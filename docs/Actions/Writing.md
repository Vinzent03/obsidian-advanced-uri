> [!caution]
> Make sure your values are properly [encoded](Concepts/Encoding.md)
> 

> [!info]
> The `data` parameter can be replaced with `clipboard=true` to get the content from the clipboard.
> 

| /         | parameters                              | explanation                                                                                     |
| --------- | --------------------------------------- | ----------------------------------------------------------------------------------------------- |
| write     | <identification\>, data                 | Only writes `data` to the file if the file is not already present                               |
| overwrite | <identification\>, data, mode=overwrite | Writes `data` to `filepath` even if the file already exists                                     |
| append    | <identification\>, data, mode=append    | Only appends `data` to the file                                                                 |
| prepend   | <identification\>, data, mode=prepend   | Only prepends `data` to the file                                                                |
| new       | filepath, data, mode=new                | Definitely creates a new file. If `filepath` already exists, an incrementing number is appended |

> [!example]
> **Write** "Hello World" to "my-file.md":
> ```uri
> obsidian://adv-uri?vault=<your-vault>&filepath=my-file&data=Hello%20World
> ```
> 
> **Overwrite** "This text is overwritten" to "my-file.md":
> ```uri
> obsidian://adv-uri?vault=<your-vault>&filepath=my-file&data=This%20text%20is%20overwritten&mode=overwrite
> ```
> 
> **Append** "Hello World" to today's **daily note**:
> ```uri
> obsidian://adv-uri?vault=<your-vault>&daily=true&data=Hello%20World&mode=append
> ```
> 
> **Append** content from the **clipboard** to today's **daily note**:
> ```uri
> obsidian://adv-uri?vault=<your-vault>&daily=true&clipboard=true&mode=append
> ```

> [!note]
> When using `append` or `prepend` mode, the default separator between the existing and new content is a newline (`\n`).
> 
> ```
> original_data
> new_data
> ```
> 
> You can customize this by using the `separator` parameter. Check out the example below.
>
> ```uri
> obsidian://adv-uri?vault=<your-vault>&filepath=my-file&data=new_data&mode=append&separator=,
> ```
>
> In this example, the original content and the new data will be separated by a comma (`,`):
>
> ```
> original_data,new_data
> ```

> [!note]
You may use the `heading` or `line` parameter to append and prepend data to a heading or line. More information in [Navigation](Actions/Navigation)
