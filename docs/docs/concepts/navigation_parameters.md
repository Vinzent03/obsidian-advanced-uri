---
sidebar_position: 4
---

# Navigation Parameters

## View mode

Every action opening or focusing a pane supports the parameter `viewmode`. Accepted values: 
- `source`: Sets the editor to reading:source mode
- `live`: Sets the editor to reading:live mode
- `preview`: Sets the editor to preview mode

## Open mode

Every action opening a pane supports the parameter `openmode`. Accepted values:
- `true` opens file in new pane if not already opened
- `false` opens file in current pane if not already opened
- `window`
- `split`
- `tab`
- `silent` doesn't open the file
- `popover` which requires the [Hover Editor plugin](obsidian://show-plugin?id=obsidian-hover-editor) to be installed and enabled

If the file is already opened in another pane, it gets focused.

You can set a default value in the plugin's settings. The value from the setting gets overwritten by specifying it in the URI.