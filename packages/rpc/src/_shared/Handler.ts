// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Handler = {
	bivarianceHack(...args: unknown[]): unknown
}['bivarianceHack']

export interface Handlers {
	[k: string]: Handlers | Handler
}
