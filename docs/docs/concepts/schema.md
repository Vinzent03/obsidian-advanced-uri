---
sidebar_position: 1
---

# Schema

Passing values to the URI is handled like every other URL.
(Almost) every URI starts with `obsidian://advanced-uri`. Values are set in key value pairs `key=value` separated from the start with `?`. The key value pairs itself are separated with `&`.

An example URI looks like the following:

```url
obsidian://advanced-uri?parameter1=value1&parameter2=value2
```

:::caution
Make sure your values are properly [encoded](encoding)
:::