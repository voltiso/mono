# ☁ Voltiso 🗲 monorepo

🎢 Developer Experience - lib consumer **DX** is TOP priority

👌 Perfect **TypeScript** typings

🚀 [Turborepo](https://turborepo.org/) _monorepo_

| 📁                                                                                          | ℹ️                                                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@voltiso/styler`](https://github.com/voltiso/voltiso/tree/master/packages/styler)         | 🦋 _The easiest_ **css-in-js** for React                                                                                                                                                                                                       |
| [`@voltiso/schemar`](https://github.com/voltiso/voltiso/tree/master/packages/schemar)       | 👮 _The cleanest_ **schema validation**<br>🚗 Live **auto-inferred TS** typings                                                                                                                                                                |
| [`@voltiso/rpc`](https://github.com/voltiso/voltiso/tree/master/packages/rpc)               | 🌐 TypeScript **RPC** lib<br>🚗 Live **auto-inferred full-stack TS** typings<br>👮 Full-stack validation                                                                                                                                       |
| [`@voltiso/transactor`](https://github.com/voltiso/voltiso/tree/master/packages/transactor) | 🗄️ NoSQL **Document Database** API<br>🟰 **ORM-free**: Document _is_ Object<br>👮 **Schema** validation<br>⚛️ Atomic **triggers**<br>🚗 Live **auto-inferred TS** typings<br>🔥 Currently **FireStore** backend<br>🌐 Currently **server-side** |
| [`@voltiso/util`](https://github.com/voltiso/voltiso/tree/master/packages/util)             | 👌 TypeScript toolbox<br>🔀 Replace your Omit with **VOmit**                                                                                                                                                                                   |
| [`@voltiso/script[.lib]`](https://github.com/voltiso/voltiso/tree/master/packages/script)   | 🔨 CLI build tools                                                                                                                                                                                                                             |
| [`@voltiso/config.**.*`](https://github.com/voltiso/voltiso/tree/master/packages/config)    | ⚙️ Our configs<br> `prettier`, `eslint`, `tsconfig`, `babel`, `jest`, ...                                                                                                                                                                      |

> 💡 **Windows** users ❤️ WSL
>
> - ➡️ [Ubuntu on WSL](https://ubuntu.com/wsl)
>   - Use with
>     [🧩 VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

# 📥 Use in your project

> ⚠️ Different `.npmrc` needed in **BOTH**:
>
> - Your **`$HOME`** dir
> - Your **project dir**

## Your **`$HOME`** dir

### ⬇️ `~/.npmrc`

```r
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> | ⚠️  | Replace `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                                                                                                                 |
> | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
> |     | ...with **_YOUR_ [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)** |

---

## Your **project dir**

- e.g. `my-project/`
  - (where your `package.json` is)
- But for monorepos:
  - Monorepo **root** dir

### `my-project/.npmrc`

```sh
@voltiso:registry='https://npm.pkg.github.com'
# auto-install-peers=true # optional - consistent with `npm@7` # ! DOES NOT WORK?
```

`auto-install-peers` should install deps e.g. when you install
`@voltiso/config.*`

- (config packages for `prettier`, `eslint`, `tsconfig`, `babel`, `jest`, ...)
- `auto-install-peers` makes `pnpm` behavior similar to `npm@7`
  - We should use it... once it works properly
  - It works when adding a package explicitly, but does not work on clean
    `pnpm install`

## 💾 Install

AFTER you have your
[PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
from GitHub in place:

```sh
pnpm add @voltiso/util

pnpm add @voltiso/config.ts
pnpm add @voltiso/config.ts.build.esm

pnpm add @voltiso/config.eslint
pnpm add @voltiso/config.prettier
pnpm add @voltiso/config.jest.esr

# ...
```

See the `packages/*/` directories for the full list of available `@voltiso/*`
packages.

```sh
pnpm install @voltiso/script
```

# 🧑‍🔬 Contribute - code _THIS_ library (`@voltiso/util`)

## 🚀 Build

```sh
pnpm build
```

Consists of (in parallel):

- `esm`
- `cjs`

> **NOTE**
>
> `packages/util/` depends on `packages/script/`
>
> - So `packages/script/` is built on `prepare`

## 🦋 Lint

```sh
pnpm lint
```

Consists of (in parallel):

- `eslint`
- `tsc`
- `depcheck`
- `prettier`

## 🧪 Test

```sh
pnpm test
```

### Using `Orta.vscode-jest` extension

The 'lab' icon is in the left pane.
