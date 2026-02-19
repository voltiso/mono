// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable import/unambiguous */

declare module 'eslint-module-utils/ignore' {
	export function getFileExtensions(settings: object): string[]
}

declare module 'eslint-module-utils/moduleVisitor' {
	declare const def: (a: unknown, b: unknown) => never // RuleListener
	export = def
}

declare module 'eslint-module-utils/resolve' {
	declare const def: (importPath: string, context: object) => string
	export = def
}
