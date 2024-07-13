
[Hook](https://hookproductivity.com) manages links to various third party applications. Since version 3.4.3 they support [Advanced URI](https://github.com/Vinzent03/obsidian-advanced-uri) to get `file://` links, robust `obsidian://` links and create new files via URI.

See [their documentation](https://hookproductivity.com/help/integration/using-hook-with-obsidian/#advanced) for a detailed explanation.

## Get `file://` and `obsidian://` URIs

That as today, the only action not starting with `advanced-uri`. Instead it uses `hook-get-advanced-uri`.

It requires the `x-success` parameter and optionally the `x-error` parameter. It appends an `obsidian://advanced-uri` URI via the parameter `advanceduri` and an `file://` URI via the `fileuri` parameter to the `x-success` uri and launches that URI.

> [!info]
> The benefit of this plugin over the default Obsidian URI is the feature of using robust links via frontmatter keys. By enabling `Use UID instead of file paths` in the plugin's settings, it creates those IDs automatically for `obsidian://advanced-uri` URIs.
> 