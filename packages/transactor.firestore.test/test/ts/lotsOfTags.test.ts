// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { AnyDoc, DocRef, WeakDocRef } from '@voltiso/transactor'
import { Doc, method, sStrongRef, Transactor } from '@voltiso/transactor'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule)

class A extends Doc('a').with({
	id: s.string,

	public: {
		a: 1,
		b: sStrongRef<'b'>(),
	},
}) {
	@method
	async setFriend(b: DocRef<'b'>) {
		this.data.b = b
	}
}

class B extends Doc('b').with({
	id: s.string,

	public: {
		b: 2,
		c: sStrongRef<'c'>(),
	},
}) {
	@method
	async setFriend(c: DocRef<'c'>) {
		this.data.c = c
	}
}

class C extends Doc('c').with({
	id: s.string,

	public: {
		c: 3,
		d: sStrongRef<'d'>(),
	},
}) {
	@method
	async setFriend(d: DocRef<'d'>) {
		this.data.d = d
	}
}

class D extends Doc('d').with({
	id: s.string,

	public: {
		d: 4,
		e: sStrongRef<'e'>(),
	},
}) {
	@method
	async setFriend(e: DocRef<'e'>) {
		this.data.e = e
	}
}

class E extends Doc('e').with({
	id: s.string,

	public: {
		d: s.number,
		f: sStrongRef<'f'>(),
	},
}) {
	@method
	async setFriend(f: DocRef<'f'>) {
		this.data.f = f
	}
}

class F extends Doc('f').with({
	id: s.string,

	public: {
		d: s.number,
		g: sStrongRef<'g'>(),
	},
}) {
	@method
	async setFriend(g: DocRef<'g'>) {
		this.data.g = g
	}
}

class G extends Doc('g').with({
	id: s.string,

	public: {
		d: s.number,
		a: sStrongRef<'a'>(),
	},
}) {
	@method
	async setFriend(a: DocRef<'a'>) {
		this.data.a = a
	}
}

declare module '@voltiso/transactor' {
	interface DocTypes {
		a: A
		b: B
		c: C
		d: D
		e: E
		f: F
		g: G
	}
}

describe('lotsOfTags', () => {
	it('works', () => {
		const r = db('a', 'b', 'c', 'd')
		$Assert.is<typeof r, WeakDocRef<typeof AnyDoc>>()
	})
})
