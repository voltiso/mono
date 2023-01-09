# `@voltiso/transactor`

- 🗄️ NoSQL **Document Database** API
- ⚛️ Atomic **triggers**
- 👮 **Schema** validation using `@voltiso/schemar`
- 🚗 Live **auto-inferred TS** typings
- 🟰 **ORM-free**: Document _is_ Object
- 🔥 Currently **FireStore** backend (or `@voltiso/localstore` - supporting
  subset of Firestore and able to run in browser)
- 🌐 Currently **server-side**

## Nominal type branding

By default, Transactor will brand document IDs (and some other strings) to
enhance type-checking.

Disable branding globally:

```ts
declare module '@voltiso/transactor' {
	export interface TransactorConfig {
		disableBranding: true
	}
}
```
