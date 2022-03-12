---
sidebar_position: 2
---

# Encoding

Special characters like `?` and spaces need to be encoded.
It might be strange, but they even have to be encoded twice.

- First, the individual query parameter value must be encoded
- Second, the whole uri must be encoded

## Example

The key `myKey` and value `Hello World` need to be encoded like the following:

```uri
obsidian://advanced-uri?myKey%253DHello%2520World
```
