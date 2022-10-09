---
sidebar_position: 3
---

# Commands

There are two ways to identify a command.
- `commandname` That's the one you see when searching in Obsidian's command palette
- `commandid` That's invisible to the user, but can be read from the plugin's source code

:::info
Using the command's ID is strongly recommended, because it's not likely to change. Using [Helper Commands](../tips/helper_commands.md) the ID is automatically obtained.
:::

In the following `<command>` can be replaced with either `commandname` or `commandid`.

| parameters                                    | explanation                                                                                     |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| <command\>                                    | Executes command by its name                                                                    |
| <command\>, <identification\>                 | Opens file and then executes command by its name                                                |
| <command\>, <identification\>, line=myline    | Opens file, sets the curosor to myline and then executes command by its name                    | 
| <command\>, <identification\>, mode=append    | Opens file, adds empty line at the end and sets cursor, then executes command by its name       |
| <command\>, <identification\>, mode=prepend   | Opens file, adds empty line at the beginning and sets cursor, then executes command by its name |
| <command\>, <identification\>, mode=overwrite | Opens file, clears the file, then executes command by its name                                  |