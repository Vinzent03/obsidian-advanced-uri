# Advanced URI

A plugin for [Obsidian](https://obsidian.md)

📚 [Documentation](https://publish.obsidian.md/advanced-uri-doc)

## Overview

[Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) allows you to control many different features in Obsidian just by opening some URIs. Because they are just text and don't require any mouse clicks or keyboard inputs, they are perfect to automate your Obsidian workflow.

You can for example

- [open files, workspaces, headings, blocks, lines, and settings](https://publish.obsidian.md/advanced-uri-doc/Actions/Navigation)
- [open files in tabs, splits, windows, popovers, or silently in the background](https://publish.obsidian.md/advanced-uri-doc/Concepts/Navigation%20Parameters)
- [switch between reading, source, and live preview mode](https://publish.obsidian.md/advanced-uri-doc/Concepts/Navigation%20Parameters)
- [edit, overwrite, append, prepend, and create files](https://publish.obsidian.md/advanced-uri-doc/Actions/Writing)
- [append or prepend content to a specific heading, block, or line](https://publish.obsidian.md/advanced-uri-doc/Actions/Writing)
- [write clipboard content to notes, including daily notes](https://publish.obsidian.md/advanced-uri-doc/Actions/Writing)
- [open bookmarks](https://publish.obsidian.md/advanced-uri-doc/Actions/Bookmarks)
- [automated search and replace in a file, including RegEx](https://publish.obsidian.md/advanced-uri-doc/Actions/Search)
- [call Obsidian commands and plugin commands](https://publish.obsidian.md/advanced-uri-doc/Actions/Commands)
- [edit, read, and focus frontmatter properties](https://publish.obsidian.md/advanced-uri-doc/Actions/Frontmatter)
- [navigate using file paths, file names, aliases, daily notes, or frontmatter UIDs](https://publish.obsidian.md/advanced-uri-doc/Concepts/File%20identifiers)
- [create robust links that keep working after notes are renamed using ID in properties](https://publish.obsidian.md/advanced-uri-doc/Concepts/File%20identifiers)
- [focus canvas nodes and control the canvas viewport](https://publish.obsidian.md/advanced-uri-doc/Actions/Canvas)
- [open Obsidian settings, plugin settings, themes, and community plugin pages](https://publish.obsidian.md/advanced-uri-doc/Actions/Settings%20navigation)
- [check whether a file exists, update community plugins, or enable/disable plugins](https://publish.obsidian.md/advanced-uri-doc/Actions/Miscellaneous)

Please read the [documentation](https://publish.obsidian.md/advanced-uri-doc) for a detailed explanation.

## Installation

### From Obsidian

1. Open `Settings -> Community plugins`.
2. Disable `Restricted mode`.
3. Install [Advanced URI](obsidian://show-plugin?id=obsidian-advanced-uri).

If the link does not work, open `Browse community plugins` and search for `Advanced URI`.

4. Enable the plugin.

### From GitHub

1. Download the [latest release](https://github.com/Vinzent03/obsidian-advanced-uri/releases/latest).
2. Move `manifest.json` and `main.js` to `<vault>/.obsidian/plugins/obsidian-advanced-uri`.
3. Reload Obsidian.
4. Open `Settings -> Community plugins` and disable `Restricted mode`.
5. Enable `Advanced URI`.

## Basic Usage

Advanced URI uses the `obsidian://adv-uri` URI scheme. You pass parameters in the query string to tell Obsidian what to do.

For example, to open `Home Index/today.md`, encode the file path and use it as `filepath`:

```uri
obsidian://adv-uri?filepath=Home%20Index%2Ftoday
```

You can launch these URIs in several ways:

- Enter them in your browser address bar.
- Use them in markdown links inside Obsidian.
- Open them from scripts or a terminal.
- Use the plugin's helper commands to copy generated URIs for files, daily notes, search and replace actions, commands, and canvas views.

Example markdown link:

```md
[Open note](obsidian://adv-uri?filepath=Home%20Index%2Ftoday)
```

Example terminal command on Linux:

```bash
xdg-open "obsidian://adv-uri?filepath=Home%20Index%2Ftoday"
```

For parameter details, encoding rules, and more actions, see the [full documentation](https://publish.obsidian.md/advanced-uri-doc).

## Examples

### Append content from the clipboard to today's daily note

```uri
obsidian://adv-uri?vault=<your-vault>&daily=true&clipboard=true&mode=append
```

### Export a file to PDF by calling the command "Export to PDF" via its command ID

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=<your-file>&commandid=workspace%3Aexport-pdf
```

### Open heading in a file

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&heading=Goal
```

### Open a note by alias or file name

```uri
obsidian://adv-uri?vault=<your-vault>&filename=Brain%20Dumps
```

### Append content below a heading in today's daily note

```uri
obsidian://adv-uri?vault=<your-vault>&daily=true&heading=Inbox&data=-%20New%20idea&mode=append
```

### Open a file silently without focusing it

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&openmode=silent
```

### Open the editor settings at a specific section

```uri
obsidian://adv-uri?vault=<your-vault>&settingid=editor&settingsection=Behavior
```

### Check whether a file exists

```uri
obsidian://adv-uri?vault=<your-vault>&filepath=my-file&exists=true
```

If you find this plugin useful and would like to support its development, you can support me on [Ko-fi](https://Ko-fi.com/Vinzent).

[![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F195IQ5)
