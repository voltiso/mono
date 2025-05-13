// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { Throw } from './_/error'
import type { IsCompatible, NoArgument } from './type'
import type {
	TypeAliases0,
	TypeAliases1,
	TypeAliases2,
	TypeAliases3,
	TypeAliases4,
	TypeAliases5,
	TypeAliases6,
	TypeAliases7,
	TypeAliases8,
	TypeAliases9,
} from './TypeAliases-augmentation'

//

export type TypeAlias0 = keyof TypeAliases0
export type TypeAlias1 = keyof TypeAliases1<any>
export type TypeAlias2 = keyof TypeAliases2<any, any>
export type TypeAlias3 = keyof TypeAliases3<any, any, any>
export type TypeAlias4 = keyof TypeAliases4<any, any, any, any>
export type TypeAlias5 = keyof TypeAliases5<any, any, any, any, any>
export type TypeAlias6 = keyof TypeAliases6<any, any, any, any, any, any>
export type TypeAlias7 = keyof TypeAliases7<any, any, any, any, any, any, any>

export type TypeAlias8 = keyof TypeAliases8<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>

export type TypeAlias9 = keyof TypeAliases9<
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any,
	any
>

//

export type TypeAlias =
	| TypeAlias0
	| TypeAlias1
	| TypeAlias2
	| TypeAlias3
	| TypeAlias4
	| TypeAlias5
	| TypeAlias6
	| TypeAlias7
	| TypeAlias8
	| TypeAlias9

//

export const NoParameter = Symbol('NoParameter')
export type NoParameter = typeof NoParameter

//

export type TypeAliases<
	_1 = NoParameter,
	_2 = NoParameter,
	_3 = NoParameter,
	_4 = NoParameter,
	_5 = NoParameter,
	_6 = NoParameter,
	_7 = NoParameter,
	_8 = NoParameter,
	_9 = NoParameter,
> = TypeAliases0 &
	TypeAliases1<_1> &
	TypeAliases2<_1, _2> &
	TypeAliases3<_1, _2, _3> &
	TypeAliases4<_1, _2, _3, _4> &
	TypeAliases5<_1, _2, _3, _4, _5> &
	TypeAliases6<_1, _2, _3, _4, _5, _6> &
	TypeAliases7<_1, _2, _3, _4, _5, _6, _7> &
	TypeAliases8<_1, _2, _3, _4, _5, _6, _7, _8> &
	TypeAliases9<_1, _2, _3, _4, _5, _6, _7, _8, _9>

//

export type Call0<name extends TypeAlias0> = TypeAliases0[name]

export type Call1<name extends TypeAlias1, _1> = TypeAliases1<_1>[name]

export type Call2<name extends TypeAlias2, _1, _2> = TypeAliases2<_1, _2>[name]

export type Call3<name extends TypeAlias3, _1, _2, _3> = TypeAliases3<
	_1,
	_2,
	_3
>[name]

export type Call4<name extends TypeAlias4, _1, _2, _3, _4> = TypeAliases4<
	_1,
	_2,
	_3,
	_4
>[name]

export type Call5<name extends TypeAlias5, _1, _2, _3, _4, _5> = TypeAliases5<
	_1,
	_2,
	_3,
	_4,
	_5
>[name]

export type Call6<
	name extends TypeAlias6,
	_1,
	_2,
	_3,
	_4,
	_5,
	_6,
> = TypeAliases6<_1, _2, _3, _4, _5, _6>[name]

export type Call7<
	name extends TypeAlias7,
	_1,
	_2,
	_3,
	_4,
	_5,
	_6,
	_7,
> = TypeAliases7<_1, _2, _3, _4, _5, _6, _7>[name]

export type Call8<
	name extends TypeAlias8,
	_1,
	_2,
	_3,
	_4,
	_5,
	_6,
	_7,
	_8,
> = TypeAliases8<_1, _2, _3, _4, _5, _6, _7, _8>[name]

export type Call9<
	name extends TypeAlias9,
	_1,
	_2,
	_3,
	_4,
	_5,
	_6,
	_7,
	_8,
	_9,
> = TypeAliases9<_1, _2, _3, _4, _5, _6, _7, _8, _9>[name]

// export type _Call<name extends TypeAlias, args extends readonly unknown[]> = [
// 	name,
// 	LessEqual<Length<args>, 0>,
// ] extends [TypeAlias0, true]
// 	? Call0<name & TypeAlias0>
// 	: [name, LessEqual<Length<args>, 1>] extends [TypeAlias1, true]
// 	? Call1<name & TypeAlias1, args[0]>
// 	: [name, LessEqual<Length<args>, 2>] extends [TypeAlias2, true]
// 	? Call2<name & TypeAlias2, args[0], args[1]>
// 	: [name, LessEqual<Length<args>, 3>] extends [TypeAlias3, true]
// 	? Call3<name & TypeAlias3, args[0], args[1], args[2]>
// 	: [name, LessEqual<Length<args>, 4>] extends [TypeAlias4, true]
// 	? Call4<name & TypeAlias4, args[0], args[1], args[2], args[3]>
// 	: [name, LessEqual<Length<args>, 5>] extends [TypeAlias5, true]
// 	? Call5<name & TypeAlias5, args[0], args[1], args[2], args[3], args[4]>
// 	: [name, LessEqual<Length<args>, 6>] extends [TypeAlias6, true]
// 	? Call6<
// 			name & TypeAlias6,
// 			args[0],
// 			args[1],
// 			args[2],
// 			args[3],
// 			args[4],
// 			args[5]
// 	  >
// 	: [name, LessEqual<Length<args>, 7>] extends [TypeAlias7, true]
// 	? Call7<
// 			name & TypeAlias7,
// 			args[0],
// 			args[1],
// 			args[2],
// 			args[3],
// 			args[4],
// 			args[5],
// 			args[6]
// 	  >
// 	: [name, LessEqual<Length<args>, 8>] extends [TypeAlias8, true]
// 	? Call8<
// 			name & TypeAlias8,
// 			args[0],
// 			args[1],
// 			args[2],
// 			args[3],
// 			args[4],
// 			args[5],
// 			args[6],
// 			args[7]
// 	  >
// 	: [name, LessEqual<Length<args>, 9>] extends [TypeAlias9, true]
// 	? Call9<
// 			name & TypeAlias9,
// 			args[0],
// 			args[1],
// 			args[2],
// 			args[3],
// 			args[4],
// 			args[5],
// 			args[6],
// 			args[7],
// 			args[8]
// 	  >
// 	: never

export type Call<
	name extends TypeAlias,
	_1 = NoArgument,
	_2 = NoArgument,
	_3 = NoArgument,
	_4 = NoArgument,
	_5 = NoArgument,
	_6 = NoArgument,
	_7 = NoArgument,
	_8 = NoArgument,
	_9 = NoArgument,
> =
	IsCompatible<_9, NoArgument> extends false
		? name extends TypeAlias9
			? Call9<name, _1, _2, _3, _4, _5, _6, _7, _8, _9>
			: Throw<'TypeAlias not found' & { name: name; numArgs: 9 }>
		: IsCompatible<_8, NoArgument> extends false
			? name extends TypeAlias8
				? Call8<name, _1, _2, _3, _4, _5, _6, _7, _8>
				: Throw<'TypeAlias not found' & { name: name; numArgs: 8 }>
			: IsCompatible<_7, NoArgument> extends false
				? name extends TypeAlias7
					? Call7<name, _1, _2, _3, _4, _5, _6, _7>
					: Throw<'TypeAlias not found' & { name: name; numArgs: 7 }>
				: IsCompatible<_6, NoArgument> extends false
					? name extends TypeAlias6
						? Call6<name, _1, _2, _3, _4, _5, _6>
						: Throw<'TypeAlias not found' & { name: name; numArgs: 6 }>
					: IsCompatible<_5, NoArgument> extends false
						? name extends TypeAlias5
							? Call5<name, _1, _2, _3, _4, _5>
							: Throw<'TypeAlias not found' & { name: name; numArgs: 5 }>
						: IsCompatible<_4, NoArgument> extends false
							? name extends TypeAlias4
								? Call4<name, _1, _2, _3, _4>
								: Throw<'TypeAlias not found' & { name: name; numArgs: 4 }>
							: IsCompatible<_3, NoArgument> extends false
								? name extends TypeAlias3
									? Call3<name, _1, _2, _3>
									: Throw<'TypeAlias not found' & { name: name; numArgs: 3 }>
								: IsCompatible<_2, NoArgument> extends false
									? name extends TypeAlias2
										? Call2<name, _1, _2>
										: Throw<'TypeAlias not found' & { name: name; numArgs: 2 }>
									: IsCompatible<_1, NoArgument> extends false
										? name extends TypeAlias1
											? Call1<name, _1>
											: Throw<
													'TypeAlias not found' & { name: name; numArgs: 1 }
												>
										: name extends TypeAlias0
											? Call0<name>
											: Throw<
													'TypeAlias not found' & { name: name; numArgs: 0 }
												>
