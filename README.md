# Advanced Obsidian URI
A Plugin for [Obsidian](https://obsidian.md)

Schema: `obsidian://advanced-uri?vault=<your-vault>&<parameter>=<value>&<parameter2>=<value2>`

Ensure that your values are properly URI encoded. Partly even two times. Every parameter value needs to be encoded with `encodeURIComponent()` and the whole URI with `encodeURI()`. For example, forward slash characters `/` must be encoded as `%2F` and space characters must be encoded as `%20`.

This is especially important because an improperly encoded "reserved" character may break the interpretation of the URI. [See here for details](https://en.wikipedia.org/wiki/Percent-encoding)

To get the URI in a more convenient way you can use the commands to copy Advanced URI. Just search for `Advanced URI`. When you are in a heading or block with a reference an URI to navigate to it, is copied to your clipboard. Otherwise, a modal is opened, where you can type in your data that should be written to the current file.

## Types of file identification

### File path
Use `filepath=<your-file-path>` as identification.

Properly encoded full path of the file.

### File name
Use `filename=<your-file-name>` as identification.

`filename` prefers just the file name, like when linking via `[[fileName]]`. In addition, it supports aliases.

### Frontmatter support (For example UUID)
Use `uid=<your-uid>` as identification.

Some users prefer to navigate to specific notes per UUID instead of the file path to be able to rename these files, but to keep the link still working.

If you enable that option in the setting, every generated command with the `filepath` parameter is replaces with the `uid` parameter. The uid is either read from the frontmatter or generated and then written to the frontmatter. 

Navigating is always supported and doesn't need the setting to be enabled. Use `uid=<your-uid>` as identification.

### Daily note
Use `daily=true` as identification.

Uses the current daily note. If it doesn't exists already, it will be created. For example to append text to the daily note use `obsidian://advanced-uri?vault=<your-vault>&daily=true&data=Hello%20World&mode=append`.


## View mode
Every action opening or focusing a pane supports the parameter `viewmode`. Accepted values: 
- `source`: Sets the editor to reading:source mode
- `live`: Sets the editor to reading:live mode
- `preview`: Sets the editor to preview mode

## Actions
`<identification>` needs to be replaced by an option listed [above](https://github.com/Vinzent03/obsidian-advanced-uri#types-of-file-identification).

### Writing

| /         | parameters                              | explanation                                                       |
| --------- | --------------------------------------- | ----------------------------------------------------------------- |
| write     | <identification\>, data                 | Only writes `data` to the file if the file is not already present |
| overwrite | <identification\>, data, mode=overwrite | Writes `data` to `filepath` even if the file already exists       |
| append    | <identification\>, data, mode=append    | Only appends `data` to the file                                   |
| prepend   | <identification\>, data, mode=prepend   | Only prepends `data` to the file                                  |

The `heading` parameter is for `mode=append` and `mode=prepend` supported too.

### Navigation

| /                      | parameters                 | explanation                                                                                                                      |
| ---------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| workspace              | workspace                  | Opens the workspace called `workspace`                                                                                           |
| save current workspace | saveworkspace=true         | Saves the current workspace. (Can be combined with `workspace` to open a new workspace afterwards)                               |
| file                   | <identification\>          | Opens file                                                                                                                       |
| line in file           | <identification\>, line    | Opens line `line` in file                                                                                                        |
| heading                | <identification\>, heading | Opens the `heading` in `filepath`                                                                                                |
| block reference        | <identification\>, block   | Opens the `block` in `filepath`                                                                                                  |
| settings tab           | settingid                  | Opens a settings tab by id, all plugins are supported (e.g. `editor`, `community-plugins`, `plugin-browser`, `theme-browser`...) |

### Execute command

| /               | parameters                                           | explanation                                                                                     |
| --------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| execute by name | commandname                                          | Executes command by its name                                                                    |
| execute by name | commandname, <identification\>                       | Opens file and then executes command by its name                                                |
| execute by name | commandname, <identification\>, mode=append          | Opens file, adds empty line at the end and sets cursor, then executes command by its name       |
| execute by name | commandname, <identification\>, mode=prepend         | Opens file, adds empty line at the beginning and sets cursor, then executes command by its name |
| execute by name | commandname, <identification\>, mode=overwrite       | Opens file, clears the file, then executes command by its name                                  |
| execute by id   | commandid                                            | Executes command by its id                                                                      |
| execute by id   | commandid, filepath, (same modes as execute by name) | Opens file and then executes command by its id                                                  |

### Search and replace
| /      | parameters                              | explanation                                                                  |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------- |
| Normal | search, replace                         | Replaces every occurrence of `search` with `replace` in the current file     |
| Normal | search, replace, <identification\>      | Replaces every occurrence of `search` with `replace` in `filepath`           |
| RegEx  | searchregex, replace                    | Uses `searchregex` to replace every match with `replace` in the current file |
| RegEx  | searchregex, replace, <identification\> | Uses `searchregex` to replace every match with `replace` in `filepath`       |

### Others
| /   | parameters                     | explanation                                         |
| --- | ------------------------------ | --------------------------------------------------- |
| /   | <identification\>, exists=true | Copies `1` to clipboard if file exists, `0` if not. |
| /   | updateplugins=true             | Updates all community-plugins                       |

## Examples

**Write** "Hello World" to "my-file.md":
`obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=Hello%20World`

**Overwrite** "This text is overwritten" to "my-file.md":
`obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&data=This%20text%20is%20overwritten&mode=overwrite`

Open **workspace** "main":
`obsidian://advanced-uri?vault=<your-vault>&workspace=main`

Open **heading** "Goal" in "my-file.md" (**Important:** Without syntax, only `Goal`):
`obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&heading=Goal`

Open **block**-id "12345" in "my-file.md" (**Important:** Without syntax, only `12345`):
`obsidian://advanced-uri?vault=<your-vault>&filepath=my-file&block=12345`

**Append** "Hello World" to today's **daily note**.
`obsidian://advanced-uri?vault=<your-vault>&daily=true&data=Hello%20World&mode=append`

# Tips

- If you want to insert templates (templates from [Templater plugin](https://github.com/SilentVoid13/Templater) too) I suggest you using my [hotkeys for templates](https://github.com/Vinzent03/obsidian-hotkeys-for-templates) plugin. Just enable your templates and insert them by calling the command via URI. 
    - Command id for core templates: `obsidian-hotkeys-for-templates:<filepath.md>`
    - Command id for Templater templates: `obsidian-hotkeys-for-templates:templater:<filepath.md>`
- If you want to open starred notes. I suggest you using my [Hotkeys for starred files](https://github.com/Vinzent03/obsidian-shortcuts-for-starred-files) plugin. Same as for the templates. Just call the commands.
    - Command id to open file in current pane: `obsidian-shortcuts-for-starred-files:open-file-<index>`
    - Command id to open file in a new pane: `obsidian-shortcuts-for-starred-files:open-file-in-new-pane-<index>`



## Compatibility
Custom plugins are only available for Obsidian v0.9.7+.

## Installing

### From Obsidian
1. Open settings -> Community plugins
2. Disable Safe mode
3. Click Browse community plugins
4. Search for "Advanced Obsidian URI"
5. Install it
6. Activate it under installed plugins


### From GitHub
1. Download the [latest release](https://github.com/Vinzent03/obsidian-advanced-uri/releases/latest)
2. Move `manifest.json` and `main.js` to `<vault>/.obsidian/plugins/obsidian-advanced-uri`
3. Reload Obsidian (CTRL + R)
4. Go to settings and disable safe mode
5. Enable `Advanced Obsidian URI`


> If you want to support me you can consider [buying me a coffee](https://www.buymeacoffee.com/Vinzent03).

<br>

<a href="https://www.buymeacoffee.com/Vinzent03"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Vinzent03&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>
