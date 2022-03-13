---
sidebar_position: 2
---

# Encoding

Special characters like `?` and spaces need to be encoded. There are many online encoders. An example is [this tool](https://www.urlencoder.io/). Simply enter the value of your parameters and use the encoded one.

## Example

The key `myKey` and value `Hello World` need to be encoded like the following:

```uri
obsidian://advanced-uri?myKey=Hello%20World
```

You see spaces are replaced with `%20`.