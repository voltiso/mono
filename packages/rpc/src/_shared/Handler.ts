// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Handler = {
	bivarianceHack(...args: unknown[]): unknown
}['bivarianceHack']

export type Handlers = { [k: string]: Handlers | Handler }
