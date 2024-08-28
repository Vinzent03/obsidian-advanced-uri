
The file identification is optional. If left out, the currently opened canvas is used.

| /               | parameters                        | explanation                                                                                                                                              |
| --------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Focus nodes     | canvasnodes, <identification\>    | Zooms to and selects a list of canvas nodes. `canvasnodes` is a list of nodes separated by `,`                                                           |
| Set viewport    | canvasviewport, <identification\> | Sets the x,y and zoom of the canvas view. `canvasviewport` contains the x, y, zoom values separated by `,`. A value can be `-` to leave unchanged.       |
| Change viewport | canvasviewport, <identification\> | Increase/decrease x,y and/or zoom. Prefix a value with `++`/`--` to add/subtract a value. `canvasviewport` is still the x, y, zoom list separated by `,` |

> [!tip]
> Use the [[Helper Commands]] to obtain the correct node ids and current viewport values.

> [!example]
> 
> Focus the nodes `abc` and `xyz`
> ```uri
> obsidian://adv-uri?vault=<your-vault>&canvasnodes=abc%2Cxyz
> ```
> Set x=100, y=-300, zoom=0.5
> 
> ```uri
> obsidian://adv-uri?vault=<your-vault>&canvasviewport=100%2C-300%2C0.5
> ```
> 
> Only set y=-300 and leave other values untouched
> 
> ```uri
> obsidian://adv-uri?vault=<your-vault>&canvasviewport=-%2C-300%2C-
> ```
> 
> Increase x by 100, subtract y by 300, increase zoom by 0.5
> ```uri
> obsidian://adv-uri?vault=<your-vault>&canvasviewport=++100%2C--300%2C++0.5
> ```
