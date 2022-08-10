declare module 'flow-remove-types' {
	declare const removeTypes: (code: string) => { toString(): string }
	export = removeTypes
}
