# Schema

Passing values to the URI is handled like for every other URL.
(Almost) every URI starts with `obsidian://adv-uri`. Values are set in key value pairs `key=value` separated from the start with `?`. The key value pairs itself are separated with `&`.

An example URI looks like the following:

```url
obsidian://adv-uri?key1=value1&key2=value2
```

Prior to version 1.44.0, the URI started with `obsidian://advanced-uri` and needed every value to be encoded twice. This is not necessary anymore.

> [!caution]
> Make sure your values are properly [encoded](Concepts/Encoding.md)
> 

## Vault parameter

**Every** Obsidian URI supports the `vault` parameter to specify the vault in which to execute the URI. By leaving it empty, your last used vault is used.

> [!example]
> Specific vault:
> ```uri
> obsidian://adv-uri?vault=myVault&key1=value1
> ```
> 
> Last used vault:
> ```uri
> obsidian://adv-uri?key1=value1
> ```
