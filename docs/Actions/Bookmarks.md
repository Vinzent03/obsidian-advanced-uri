Open any bookmarked search, folder or file. Anything you can bookmark in Obsidian via an URI.

| /             | parameters             | explanation                   |
| ------------- | ---------------------- | ----------------------------- |
| Open bookmark | bookmark               | Opens bookmark with title `bookmark` in current tab |
| Open bookmark | bookmark, openmode=tab | Opens bookmark with title `bookmark` in a new tab   |

For more openmodes, see [open mode](Navigation%20Parameters.md#open-mode).


> [!example]
> ```uri
> obsidian://advanced-uri?vault=<your-vault>&bookmark=<your-bookmark-title>&openmode=tab
> ```
