There are two ways to identify a command.

-   `commandname` That's the one you see when searching in Obsidian's command palette
-   `commandid` That's invisible to the user, but can be read from the plugin's source code

> [!note]
> Using the command's ID is strongly recommended, because it's not likely to change. Using [Helper Commands](Helper%20Commands.md) the ID is automatically obtained.

Each command URI supports the `confirm` parameter, which when beeing truthy (not empty and not `false`) finds the first main button and clicks it. May be used for the pdf export modal to automatically press the "Export to pdf" button.

In the following `<command>` can be replaced with either `commandname` or `commandid`.

| parameters                                    | explanation                                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <command\>                                    | Executes command by its name                                                                    |
| <command\>, <identification\>                 | Opens file and then executes command by its name                                                |
| <command\>, <identification\>, line=myline    | Opens file, sets the curosor to myline and then executes command by its name                    |
| <command\>, <identification\>, mode=append    | Opens file, adds empty line at the end and sets cursor, then executes command by its name       |
| <command\>, <identification\>, mode=prepend   | Opens file, adds empty line at the beginning and sets cursor, then executes command by its name |
| <command\>, <identification\>, mode=overwrite | Opens file, clears the file, then executes command by its name                                  |

> [!example]
>
> Close specific tab by its filepath:
>
> ```uri
> obsidian://adv-uri?vault=<your-vault>&filepath=<your-file>&commandid=workspace%3Aclose
> ```
>
> To explain this example: It first switches to the tab specified by `filepath` and then executes the command `Close current tab` by its ID. Resulting in the ability to close any tab by its filepath.
