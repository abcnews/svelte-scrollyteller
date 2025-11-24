# Contributing

## Development

Working on svelte-scrollyteller can be done one of two ways:

1. In this repo, using the `npm start` command to spin up a local server and give you a tool with various scrollyteller parameters you can tweak
2. Or by `npm link`ing into your project. This is less straightforward, and is covered below:

### `npm link` into your Aunty project

1. run `npm link` in the svelte-scrollyteller repo
2. from your Aunty repo run `npm link @abcnews/svelte-scrollyteller`
3. Configure Aunty to transpile the linked repo by adding the _fully resolved path_ to your working directory. E.g. `"includedDependencies": ["/Users/ashk/Web/svelte-scrollyteller"]

The last step is important because Webpack resolves symlinks itself, so adding the `@abcnews/svelte-scrollyteller` package name to `includedDependencies` won't work with linked packages. Getting step 3 wrong will give you the error: "You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file."
