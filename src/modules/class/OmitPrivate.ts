export type OmitPrivate<Obj extends object> = {
	[k in keyof Obj as k extends `_${string}` ? never : k]: Obj[k]
}
