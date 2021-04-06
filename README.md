# Advanced Obsidian URI
A Plugin for [Obsidian](https://obsidian.md)

Schema: `obsidian://advanced-uri?vault=<your-vault>&<parameter>=<value>&<parameter2>=<value2>`

Ensure that your values are properly URI encoded. For example, forward slash characters `/` must be encoded as `%2F` and space characters must be encoded as `%20`.

This is especially important because an improperly encoded "reserved" character may break the interpretation of the URI. [See here for details](https://en.wikipedia.org/wiki/Percent-encoding)

To get the URI in a more convenient way you can use the `Copy Advanced URI` button in the file menu. When you are in a heading or block with a reference an URI to navigate to it, is copied to your clipboard. Otherwise a modal is opened, where you can type in your data that should be written to the current file.

## Writing

| /               | parameters                    | explanation                                                         |
| --------------- | ----------------------------- | ------------------------------------------------------------------- |
| write           | filepath, data                | Only writes `data` to `filepath` if the file is not already present |
| overwrite       | filepath, data, mode=overwrite| Writes `data` to `filepath` even if the file already exists         |
| append          | filepath, data, mode=append   | Only appends `data` to `filepath`                                   |
| prepend         | filepath, data, mode=prepend  | Only prepends `data` to `filepath`                                  |

## Navigation

| /               | parameters        | explanation                                       |
| --------------- | ----------------- | -------------------------------------- |
| workspace       | workspace         | Opens the workspace called `workspace` |
| heading         | filepath, heading | Opens the `heading` in `filepath`      |
| block reference | filepath, block   | Opens the `block` in `filepath`        |

## Daily notes

| /         | parameters                       | explanation                                                                                              |
| --------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| open      | daily=true                       | Opens the daily note. If the note does not already exists, it will be created                            |
| write     | daily=true, data                 | Only writes `data` to today's daily note if the note does not already exists                             |
| overwrite | daily=true, data, mode=overwrite | Writes `data` to today's daily note even if the file already exists                                      |
| append    | daily=true, data, mode=append    | Only appends `data` to today's daily note. The file will be created, if the file does not already exist  | 
| prepend   | daily=true, data, mode=prepend   | Only prepends `data` to today's daily note. The file will be created, if the file does not already exist |

## Execute command

| /               | parameters  | explanation                  |
| --------------- | ----------- | ---------------------------- |
| execute by name | commandname | Executes command by its name |
| execute by id   | commandid   | Executes command by its id | 

# Examples

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
3. Reload Obsidian (Str + r)
4. Go to settings and disable safe mode
5. Enable `Advanced Obsidian URI`


> If you want to support me you can consider [buying me a coffee](https://www.buymeacoffee.com/Vinzent03).

<br>

<a href="https://www.buymeacoffee.com/Vinzent03"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=Vinzent03&button_colour=5F7FFF&font_colour=ffffff&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"></a>
