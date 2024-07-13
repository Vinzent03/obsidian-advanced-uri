> [!tip]
> Use the [view mode](Navigation%20Parameters.md#view-mode) parameter to e.g. switch between reading and live preview mode.
>

> [!tip]
> Use the [open mode](Navigation%20Parameters.md#open-mode) parameter to open the file always in a new tab or in a new window.
> 

| /                       | parameters                 | explanation                                                                                                                   |
| ----------------------  | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| workspace               | workspace                  | Opens the workspace called `workspace`                                                                                        |
| save current workspace  | saveworkspace=true         | Saves the current workspace. (Can be combined with `workspace` to open a new workspace afterwards)                            |
| file                    | <identification\>          | Opens file                                                                                                                    | 
| line in file            | <identification\>, line    | Opens line `line` in file                                                                                                     |
| heading in file         | <identification\>, heading | Opens the `heading` in file                                                                                                   |
| block reference in file | <identification\>, block   | Opens the `block` in file                                                                                                     |
| global block reference  | block                      | Searches the whole vault for that block id and uses that file for <identification\>                                           |
| settings tab            | settingid                  | Opens a settings tab by id, all plugins are supported. See [here](Settings%20navigation.md) for a list of all available options |


> [!example]
> 
> Open **workspace** "main":
> ```uri
> obsidian://advanced-uri?vault=<your-vault>&workspace=main
> ```
> Open **heading** "Goal" in "my-file.md" (**Important:** Without syntax, only `Goal`):
> ```uri
> obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&heading=Goal
> ```
> 
> Open **block**-id "12345" in "my-file.md" (**Important:** Without syntax, only `12345`):
> ```uri
> obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&block=12345
> ```
> 
> Searches whole vault for **block**-id "12345". Ideally that block id is unique. (**Important:** Without syntax, only `12345`):
> ```uri
> obsidian://advanced-uri?vault=<your-vault>&block=12345
> ```
> 

