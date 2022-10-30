// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { Brand, Includes, Or, Parity, Split } from '@voltiso/util'
import { at } from '@voltiso/util'

import type { CollectionRef, CollectionRefPattern } from '~/CollectionRef'
import type { $$Doc, GetDocTI } from '~/Doc'
import { DTI } from '~/Doc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import type { DocRefPattern, WeakDocRef } from '~/DocRef'
import { TransactorError } from '~/error'

/** Does not include `/`. */
export type PathSegment = string & Brand<'PathSegment'>

/**
 * Checks if `str` does not contain `/`
 *
 * @param str - To be checked
 * @returns `true` if `token` does not contain `/`
 */
export const isPathToken = (str: string): str is PathSegment =>
	!str.includes('/')

/**
 * Asserts if `str` does not contain `/` and returns it.
 *
 * @param str - A path token to be checked
 * @returns `str as PathToken`
 * @throws `Error` if `str` contains `/`
 */
export function createPathToken<S extends string>(str: S): PathSegment {
	if (!isPathToken(str))
		throw new TransactorError(`${str} is not a valid PathToken`)

	return str
}

/** `PathToken[]` joined with `/` */
export type PathString<S extends string = string> =
	| DocPathString<S>
	| CollectionPathString<S>

export type PatternString<S extends string = string> =
	| DocPatternString<S>
	| CollectionPatternString<S>

export type DocPathString<S extends string = string> = S &
	Brand<'DocPathString'>

export type CollectionPathString<S extends string = string> = S &
	Brand<'CollectionPathString'>

export type DocPatternString<S extends string = string> = S &
	Brand<'DocPatternString'>

export type CollectionPatternString<S extends string = string> = S &
	Brand<'CollectionPatternString'>

/**
 * Asserts if `str` does not contain `//` and returns it.
 *
 * @param str - A path string to be checked
 * @returns `str as PathToken`
 */
export const isPathString = (str: string): str is PathString =>
	!str.includes('//') &&
	!(str.includes('*') || str.includes('{') || str.includes('}'))
export const isPatternString = (str: string): str is PatternString =>
	!str.includes('//') &&
	(str.includes('*') || str.includes('{') || str.includes('}'))

/**
 * Check if `str` is valid and return `PathString` (identity function;
 * type-only)
 *
 * @param str - Path string to be checked
 * @returns `str` as `PathToken`
 * @throws `Error` if `str` is not a valid `PathString` - contains `//`
 */
export function createPathString<S extends string>(str: S): PathString<S> {
	if (!isPathString(str))
		throw new TransactorError(`${str} is not a valid PathString`)

	return str
}

export function createPatternString<S extends string>(
	str: S,
): PatternString<S> {
	if (!isPatternString(str))
		throw new TransactorError(`${str} is not a valid PatternString`)

	return str
}

/**
 * Encapsulates FireStore paths. Keeps both `PathString` and `PathToken[]`
 * computed.
 */
class Path<S extends string = string> {
	#str: PathString<S>
	#segments: readonly PathSegment[] | undefined = undefined

	get segments(): readonly PathSegment[] {
		if (!this.#segments)
			this.#segments = this.#str.split('/') as unknown as readonly PathSegment[]

		return this.#segments
	}

	constructor(str: S) {
		this.#str = createPathString(str) // assert valid path
		Object.freeze(this)
	}

	toString(): PathString<S> {
		return this.#str
	}

	valueOf(): PathString<S> {
		return this.#str
	}
}

class Pattern<S extends string = string> {
	pattern: PatternString<S>

	constructor(str: S) {
		this.pattern = createPatternString(str)
		Object.freeze(this)
	}

	toString() {
		return this.pattern
	}

	valueOf() {
		return this.pattern
	}
}

const isDocPathString = (str: string): str is DocPathString =>
	isPathString(str) && str.split('/').length % 2 === 0

export class DocPath<
	S extends string = string,
	TDoc extends $$Doc = $$Doc,
> extends Path<S> {
	declare [DTI]: GetDocTI<TDoc>

	constructor(str: S) {
		super(str)
		assert(isDocPathString(str))
	}

	get id() {
		return at(this.segments, -1)
	}
}

const isCollectionPathString = (str: string): str is CollectionPathString =>
	isPathString(str) && str.split('/').length % 2 === 1

export class CollectionPath<S extends string = string> extends Path<S> {
	constructor(str: S) {
		super(str)
		assert(isCollectionPathString(str))
	}
}

const isDocPatternString = (str: string): str is DocPatternString =>
	isPatternString(str) && str.split('/').length % 2 === 0

export class DocPattern<S extends string = string> extends Pattern<S> {
	constructor(str: S) {
		super(str)
		assert(isDocPatternString(str))
	}
}

const isCollectionPatternString = (
	str: string,
): str is CollectionPatternString =>
	isPatternString(str) && str.split('/').length % 2 === 1

export class CollectionPattern<S extends string = string> extends Pattern<S> {
	constructor(str: S) {
		super(str)
		assert(isCollectionPatternString(str))
	}
}

type MustBePattern<path extends string> = Or<
	Includes<path, '*'>,
	Includes<path, '{'>
>

type Select<parity, doc, collection> =
	| (0 extends parity ? doc : never)
	| (1 extends parity ? collection : never)

type Select2<
	DP,
	CP,
	DPT,
	CPT,
	parity extends 0 | 1,
	MustBePattern extends boolean,
> =
	| (false extends MustBePattern ? Select<parity, DP, CP> : never)
	| (true extends MustBePattern ? Select<parity, DPT, CPT> : never)

/** @internal */
export type _PathFromString<
	Doc,
	Collection,
	DocPattern,
	CollectionPattern,
	P extends string,
> = Select2<
	Doc,
	Collection,
	DocPattern,
	CollectionPattern,
	Parity<Split<P, '/'>>,
	MustBePattern<P>
>

export type DbPathFromString<
	P extends string,
	Doc extends $$Doc = IndexedDoc,
	// eslint-disable-next-line etc/no-internal
> = _PathFromString<
	WeakDocRef<Doc>,
	CollectionRef<Doc>,
	DocRefPattern,
	CollectionRefPattern<P, Doc>,
	P
>
