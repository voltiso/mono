// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type {
	Brand,
	Includes,
	Or,
	Override,
	Parity,
	PathBrand,
	PathSegmentString,
	Split,
} from '@voltiso/util'
import { at } from '@voltiso/util'

import type { DocBrand } from '~/brand'
import type { CollectionRef, CollectionRefPattern } from '~/CollectionRef'
import type { $$Doc, $$DocRelated, GetDocTag } from '~/Doc'
import type { IndexedDoc } from '~/Doc/IndexedDoc'
import type { DocRefPattern } from '~/DocRef'
import { TransactorError } from '~/error'

import type { AnyDocTag, GetDocRef } from '..'

/**
 * Checks if `str` does not contain `/`
 *
 * @param str - To be checked
 * @returns `true` if `token` does not contain `/`
 */
export function isPathToken(
	str: string,
): str is PathSegmentString<{ separator: '/' }> {
	return !str.includes('/')
}

/**
 * Asserts if `str` does not contain `/` and returns it.
 *
 * @param str - A path token to be checked
 * @returns `str as PathToken`
 * @throws `Error` if `str` contains `/`
 */
export function createPathToken<S extends string>(
	str: S,
): PathSegmentString<{ separator: '/' }> {
	if (!isPathToken(str))
		throw new TransactorError(`${str} is not a valid PathToken`)

	return str
}

/** `PathToken[]` joined with `/` */
export type DbPathString<S extends string = string> =
	| DocPathString<S>
	| CollectionPathString<S>

export type DbPatternString<S extends string = string> =
	| DocPatternString<S>
	| CollectionPatternString<S>

declare module '@voltiso/util' {
	interface Brands {
		DocPath: unknown
		DocPattern: unknown

		CollectionPath: unknown
		CollectionPattern: unknown
	}
}

export type DocPathString<S extends string = string> = S &
	PathBrand<{ separator: '/' }> &
	Brand<'DocPath'>

export type DocPatternString<S extends string = string> = S &
	PathBrand<{ separator: '/' }> &
	Brand<'DocPattern'>

//

export type CollectionPathString<S extends string = string> = S &
	PathBrand<{ separator: '/' }> &
	Brand<'CollectionPath'>

export type CollectionPatternString<S extends string = string> = S &
	PathBrand<{ separator: '/' }> &
	Brand<'CollectionPattern'>

/**
 * Asserts if `str` does not contain `//` and returns it.
 *
 * @param str - A path string to be checked
 * @returns `str as PathToken`
 */
export const isPathString = (str: string): str is DbPathString =>
	!str.includes('//') &&
	!(str.includes('*') || str.includes('{') || str.includes('}'))
export const isPatternString = (str: string): str is DbPatternString =>
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
export function createPathString<S extends string>(str: S): DbPathString<S> {
	if (!isPathString(str))
		throw new TransactorError(`${str} is not a valid PathString`)

	return str
}

export function createPatternString<S extends string>(
	str: S,
): DbPatternString<S> {
	if (!isPatternString(str))
		throw new TransactorError(`${str} is not a valid PatternString`)

	return str
}

/**
 * Encapsulates FireStore paths. Keeps both `PathString` and `PathToken[]`
 * computed.
 */
export class Path<S extends string = string> {
	#str: DbPathString<S>
	#segments: readonly PathSegmentString[] | undefined = undefined

	get segments(): readonly PathSegmentString[] {
		if (!this.#segments)
			this.#segments = this.#str.split(
				'/',
			) as unknown as readonly PathSegmentString[]

		return this.#segments
	}

	constructor(str: S) {
		this.#str = createPathString(str) // assert valid path
		Object.freeze(this)
	}

	toString(): DbPathString<S> {
		return this.#str
	}

	valueOf(): DbPathString<S> {
		return this.#str
	}
}

export class Pattern<S extends string = string> {
	pattern: DbPatternString<S>

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

function isDocPathString(str: string): str is DocPathString {
	return isPathString(str) && str.split('/').length % 2 === 0
}

export interface DocPathOptions {
	path: string
	doc: $$DocRelated
}

export interface DefaultDocPathOptions extends DocPathOptions {
	path: string
	doc: AnyDocTag
}

export interface CustomDocPath<PartialOptions extends Partial<DocPathOptions>>
	extends DocBrand<
		GetDocTag<Override<DefaultDocPathOptions, PartialOptions>['doc']>
	> {
	//
}

export interface DocPath extends CustomDocPath<{}> {}

export class CustomDocPath<
	PartialOptions extends Partial<DocPathOptions>,
> extends Path<Override<DefaultDocPathOptions, PartialOptions>['path']> {
	//
	constructor(str: Override<DefaultDocPathOptions, PartialOptions>['path']) {
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
	Parity<Split<P, { separator: '/' }>>,
	MustBePattern<P>
>

export type DbPathFromString<
	P extends string,
	Doc extends $$Doc = IndexedDoc,
	// eslint-disable-next-line etc/no-internal
> = _PathFromString<
	GetDocRef<{ doc: GetDocTag<Doc> }>,
	CollectionRef<Doc>,
	DocRefPattern,
	CollectionRefPattern<P, Doc>,
	P
>
