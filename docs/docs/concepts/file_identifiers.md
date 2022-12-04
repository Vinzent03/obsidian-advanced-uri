---
sidebar_position: 3
---
# File identifiers

There are multiple ways to identify a file:

- [File path](#file-path)
- [File name](#file-name)
- [Daily note](#daily-note)
- [Key in frontmatter](#key-in-frontmatter)

:::caution
Make sure your values are properly [encoded](encoding)
:::

## File path

- Key: `filepath`
- Value: Relative path to the vault
- Example: `hobbies/soccer.md` / `hobbies/soccer`
- Note: You can omit the file extension `.md`.

## File name

- Key: `filename`
- Value: Only the name of the file without the actual path
- Example: `soccer` / `soccer.md`
- Note: You can omit the file extension `.md`. It prefers just the file name, like when linking via `[[fileName]]`, causing aliases to be supported.


## Daily note

- Key: `daily`
- Value: `true`
- Example: `daily=true`
- Note: To use the current daily note simply set the key to `true`. If it doesn't exist already, it will be created. 

## Key in frontmatter

- Key: `uid`
- Example: `uid=d43f7a17-058c-4aea-b8dc-515ea646825a`
- Use case: Some users prefer navigating to specific notes per UUID instead of the file path to be able to rename these files, but to keep the link still working.
- Note: By enabling that option in the setting, every generated command with the `filepath` parameter is replaced with the `uid` parameter. The uid is either read from the frontmatter or generated and then written to the frontmatter. 

:::info
[Navigation](../actions/navigation.md) with `uid` is always supported and doesn't need the setting to be enabled.
:::

:::info
By specifying `uid` and `filepath` it creates a new file, if no file with `uid` exists, at `filepath` and writes `uid` to the frontmatter.
:::

## Examples
1)
obsidian://advanced-uri?&filepath=Inbox
this will open a note "Inbox" in your obsidian vault if there is no inbox note

2)
obsidian://advanced-uri?daily=true&heading=Inbox
this will open your daily note and place the cursor under Inbox heading if there is one.
Sample image: [image](https://user-images.githubusercontent.com/95166364/205477904-dc974487-65e7-4480-a99b-d9ab0b1a2536.png)

3)
Suppose you have note called inbox which has a alias "Brain Dumps" . Now comes the use case for filename.
Use this command
obsidian://advanced-uri?filename=Brain%20Dumps
Example : [image](https://user-images.githubusercontent.com/95166364/205478454-b6949bf6-cf8c-4218-abaa-3d1bf22bfc1e.png)



