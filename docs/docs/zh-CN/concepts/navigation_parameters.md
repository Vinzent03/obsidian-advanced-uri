---
sidebar_position: 4
---

# Navigation Parameters

## View mode

Every action opening or focusing a pane supports the parameter `viewmode`. Accepted values: 
- `source`: Sets the editor to reading:source mode
- `live`: Sets the editor to reading:live mode
- `preview`: Sets the editor to preview mode

## New pane

Every action opening a pane supports the parameter `newpane`. Accepted values:
- `true` opens file in a new pane if not already opened
- `false` opens file in current pane if not already opened

If the file is already opened in another pane, it gets focused.

You can set a default value in the plugin's settings. The value from the setting gets overwritten by specifying it in the URI.