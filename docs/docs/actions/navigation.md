---
sidebar_position: 1
---

# Navigation

| /                      | parameters                 | explanation                                                                                                                      |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| workspace              | workspace                  | Opens the workspace called `workspace`                                                                                           |
| save current workspace | saveworkspace=true         | Saves the current workspace. (Can be combined with `workspace` to open a new workspace afterwards)                               |
| file                   | <identification\>          | Opens file                                                                                                                       | 
| line in file           | <identification\>, line    | Opens line `line` in file                                                                                                        |
| heading                | <identification\>, heading | Opens the `heading` in file                                                                                                      |
| block reference        | <identification\>, block   | Opens the `block` in file                                                                                                        |
| settings tab           | settingid                  | Opens a settings tab by id, all plugins are supported (e.g. `editor`, `community-plugins`, `plugin-browser`, `theme-browser`...) |


:::note Example

Open **workspace** "main":
```uri
obsidian://advanced-uri?vault=<your-vault>&workspace=main
```
Open **heading** "Goal" in "my-file.md" (**Important:** Without syntax, only `Goal`):
```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&heading=Goal
```

Open **block**-id "12345" in "my-file.md" (**Important:** Without syntax, only `12345`):
```uri
obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&block=12345
```

:::

:::tip
You can specify a custom [view mode](../concepts/navigation_parameters.md)
:::