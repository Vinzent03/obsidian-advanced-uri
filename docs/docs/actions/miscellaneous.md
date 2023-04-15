---
sidebar_position: 7
---

# Miscellaneous
| /                      | parameters                     | explanation                                                                |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------- |
| Exists                 | <identification\>, exists=true | Copies `1` to clipboard if file exists, `0` if not.                        |
| Update plugins         | updateplugins=true             | Updates all community-plugins                                              |
| Enable custom plugin   | enable-plugin                  | Enable `enable-plugin` plugin                                              |
| Disable custom plugins | disable-plugin                 | Disable `disable-plugin` plugin                                            |
| Execute arbitrary code | eval                           | Execute any javascript code via eval. Requires extra setting to be enabled |

## Read Frontmatter

You can copy values of your frontmatter to the clipboard using the `frontmatterkey` paramteter.

### Simple Structure
```yaml
my_item: my_value
```
To copy `my_value` to the clipboard set the parameter `frontmatterkey=my_item`.

### Complex Structure
```yaml
my_item:
    second_item: my_value
```
To copy `my_value` to the clipboard use `frontmatterkey=[my_item,second_item]`.  The value of `frontmatterkey` is the ordered list of keys to access your value to copy. Each key needs to be separated via `,`.

```yaml
my_item:
    second_item:
    - A
    - B
```
To copy `B` to the clipboard use `frontmatterkey=[my_item,second_item,1]`, because `B` is at index `1` in the list.

**Complete example:**
```
obsidian://advanced-uri?vault=<vault>&filepath=MyFile&frontmatterkey=[my_item,second_item,1]
```