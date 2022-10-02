// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// /**
//  * Props supertype
//  *
//  * - Must be `type`, not `interface` - only then it's assignable to `IndexedProps`
//  */
// export type IProps = {}

export type Props = object

// {
// [k: string]: unknown // can't have even this... @see `Props.test.ts`
// [k: number]: never // cannot have! @see `Props.test.ts`
// [k: symbol]: never // cannot have! @see `Props.test.ts`
// }

/**
 * Indexed Props
 *
 * - Do not try to extend this - problematic
 * - Use as non-generic function argument types
 */
export type IndexedProps = object & {
	[k: string]: unknown
	[k: number]: never
	[k: symbol]: never
}
