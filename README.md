# ☁ Voltiso 🗲 monorepo

🎢 Developer Experience - lib consumer **DX** is TOP priority

👌 Perfect **TypeScript** typings

🚀 [Turborepo](https://turborepo.org/) _monorepo_

| 📁                                                                                          | ℹ️                                                                                                                                                                                                                                              |
| :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@voltiso/styler`](https://github.com/voltiso/voltiso/tree/master/libs/styler)         | 🦋 _The easiest_ **css-in-js** for React                                                                                                                                                                                                        |
| [`@voltiso/schemar`](https://github.com/voltiso/voltiso/tree/master/libs/schemar)       | 👮 _The cleanest_ **schema validation**<br>🚗 Live **auto-inferred TS** typings                                                                                                                                                                 |
| [`@voltiso/rpc`](https://github.com/voltiso/voltiso/tree/master/libs/rpc)               | 🌐 TypeScript **RPC** lib<br>🚗 Live **auto-inferred full-stack TS** typings<br>👮 Full-stack validation                                                                                                                                        |
| [`@voltiso/transactor`](https://github.com/voltiso/voltiso/tree/master/libs/transactor) | 🗄️ NoSQL **Document Database** API<br>🟰 **ORM-free**: Document _is_ Object<br>👮 **Schema** validation<br>⚛️ Atomic **triggers**<br>🚗 Live **auto-inferred TS** typings<br>🔥 Currently **FireStore** backend<br>🌐 Currently **server-side** |
| [`@voltiso/util`](https://github.com/voltiso/voltiso/tree/master/libs/util)             | 👌 TypeScript toolbox                                                                                                                                                                                                                           |
| [`@voltiso/script[.lib]`](https://github.com/voltiso/voltiso/tree/master/libs/script)   | 🔨 CLI build tools                                                                                                                                                                                                                              |
| [`@voltiso/config.**.*`](https://github.com/voltiso/voltiso/tree/master/libs/config)    | ⚙️ Our configs<br> `tsconfig`, `jest`, `tsdoc`, ...                                                                                                                                                                                             |

> 💡 **Windows** users ❤️ WSL
>
> - ➡️ [Ubuntu on WSL](https://ubuntu.com/wsl)
>   - Use with
>     [🧩 VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

# 📥 Use in your project

## 💾 Install

AFTER you have your
[PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
from GitHub in place:

```sh
pnpm add @voltiso/util

pnpm add @voltiso/config.ts
pnpm add @voltiso/config.ts.build.esm

pnpm add @voltiso/config.jest

# ...
```

See the `libs/*/` directories for the full list of available `@voltiso/*`
libs.

```sh
pnpm install @voltiso/script
```

# 🧑‍🔬 Contribute - code _THIS_ library (`@voltiso/util`)

## 🔍 Check

Build, lint, test everything:

```sh
pnpm check
```

## 🚀 Build

```sh
pnpm build
```

Consists of (in parallel):

- `build:esm`
- `build:cjs`

## 🦋 Lint

```sh
pnpm lint
```

## 🧪 Test

```sh
pnpm test
```

### Using `Orta.vscode-jest` extension

The 'lab' icon is in the left pane.
