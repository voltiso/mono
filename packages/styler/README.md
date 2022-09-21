# `@voltiso/styler`

## `react-native` mode

Styler detects `react-native` by checking if
`typeof import('react-native').View` is defined (if `react-native` is
installed).

To override (in case you have `react-native` in scope, but the project is
actually `web`), use `StylerConfig`:

```ts
declare module '@voltiso/styler' {
	export interface StylerConfig {
		isReactNative: false
	}
}
```
