---
sidebar_position: 3
---
# Getting Started

We are going through the whole workflow of creating and launching an URI to open a note.

## Create URI

### Collect parameters

Let's say we want to open the file `Home Index/today.md`. By looking at the [navigation action](actions/navigation.md) the only parameter we need is a file [identification](concepts/file_identifiers.md). Since we want to create a new file, we use the `filepath` parameter.

As you can see, our file path includes a space and a slash. We have to [encode](concepts/encoding.md) special characters. By entering `Home Index/today` (You can omit the file extension) in an [online url encoder](https://www.urlencoder.io/) you get `Home%20Index%2Ftoday` as an output. Now we have the parameter key `filepath` and the parameter value `Home%20Index%2Ftoday`.

### Construct URI

As stated in the [schema](concepts/schema.md) every URI has to start with `obsidian://advanced-uri`. Please refer to the [schema](concepts/schema.md) for more detailed explanation. Our final URI is the following.

```uri
obsidian://advanced-uri?filepath=Home%20Index%2Ftoday
```

## Launch URI

There are **many** ways to launch an URI. I'm just listing the most common

### Browser

You can simply enter the URI into the search bar. It will ask you to confirm the execution.

### Link in Obsidian

You can launch an Obsidian URI from Obsidian itself. Because `obsidian://` is a more custom protocol, it doesn't recognize it as a link directly. To fix this, wrap it in a markdown link.

```md
[This here is shown](obsidian://advanced-uri?filepath=Home%20Index%2Ftoday)
```

### Terminal

#### Linux

For `xdg-open` the whole URI has to be encoded twice. See [encoding](concepts/encoding.md) for more details.

```bash
xdg-open "obsidian://advanced-uri?filepath=Home%2520Index%252Ftoday"
```

#### Mac
You can use Mac shell command `open` to launch Obsidian, and with `--background` let Obsidian run in background.

```bash
open --background "obsidian://advanced-uri?vault=my-vault&filename=my-file&data=my-data"
```

#### Windows PowerShell
You can use the PowerShell command `Start-Process` to launch an Obsidian URI.

```bash
Start-Process "obsidian://advanced-uri?&filepath=test"
```
