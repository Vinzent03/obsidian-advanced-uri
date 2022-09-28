---
sidebar_position: 2
---

# Encoding

Special characters like `?` and spaces need to be encoded. There are many online encoders. An example is [this tool](https://www.urlencoder.io/). Simply enter the value of your parameters and use the encoded one.

Some encoding examples:
- space → `%20`
- `/` → `%2F`
- `%` → `%25`

The key `myKey` and value `Hello World` need to be encoded like the following:

```uri
obsidian://advanced-uri?myKey=Hello%20World
```

To launch that URI from terminal with `xdg-open` you have to encode the value twice

```uri
obsidian://advanced-uri?myKey=Hello%2520World
```

As you can see `%` gets replaced with `%25`.