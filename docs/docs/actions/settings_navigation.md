---
sidebar_position: 5
---

# Settings Navigation


:::info
The settings tab of every community plugin can be opened by the plugin's id. The id can be found in `<your-vault>/.obsidian/plugins/<your-plugin>/manifest.json`.
:::

## Obsidian settings

| id                | Meaning           |
| ----------------- | ----------------- |
| editor            | Editor            |
| file              | File  & Links     |
| appearance        | Appearance        |
| hotkeys           | Hotkeys           |
| about             | About             |
| account           | Account           |
| core-plugins      | Core plugins      |
| community-plugins | Community plugins |

## Obsidian stores

| id             | Meaning        |
| -------------- | -------------- |
| theme-browser  | Theme browser  |
| plugin-browser | Plugin browser |


## Core plugin settings

| id              | Meaning         |
| --------------- | --------------- |
| note-composer   | Note composer   |
| backlink        | Backlink        |
| switcher        | Quick Switcher  |
| command-palette | Command palette |
| daily-notes     | Daily notes     |
| file-recovery   | File recovery   |
| page-preview    | Page Preview    |

## Setting Sections

In addition to navigating to a specific setting, you can also navigate to a specific section of a setting. This is useful if you want to open a specific setting and have it scrolled into view. Use the additional `settingsection` parameter for this purpose.


:::note Example
```uri
obsidian://advanced-uri?vault=<your-vault>&settingid=editor
```
:::

:::note Source
Thanks to [hyaray](https://github.com/hyaray) for collecting all setting ids on the [Obsidian forum](https://forum-zh.obsidian.md/t/topic/7365)
:::