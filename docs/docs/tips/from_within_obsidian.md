---
sidebar_position: 2
---

# From within Obsidian

You can access the query parameters of the last opened Advanced URI via the following:

```js
const lastParameters = app.plugins.plugins["obsidian-advanced-uri"].lastParameters
```

This can be useful to continue processing the URI via the dataview or templater plugin. See [#77](https://github.com/Vinzent03/obsidian-advanced-uri/issues/77) for the initial request and use case.