## Per File Search

| /                     | parameters                | explanation                               |
| --------------------- | ------------------------- | ----------------------------------------- |
| Normal                | search                    | Searches for `search` in the current file |
| Normal with open file | search, <identification\> | Opens specific file and searches `search` |

## Per File Search and Replace

| /      | parameters                              | explanation                                                                  |
| ------ | --------------------------------------- | ---------------------------------------------------------------------------- |
| Normal | search, replace                         | Replaces every occurrence of `search` with `replace` in the current file     |
| Normal | search, replace, <identification\>      | Replaces every occurrence of `search` with `replace` in file                 |
| RegEx  | searchregex, replace                    | Uses `searchregex` to replace every match with `replace` in the current file |
| RegEx  | searchregex, replace, <identification\> | Uses `searchregex` to replace every match with `replace` in file             |
