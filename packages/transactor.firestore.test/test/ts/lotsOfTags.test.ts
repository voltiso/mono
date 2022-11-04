// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { AnyDoc, DocRef, WeakDocRef } from '@voltiso/transactor'
import { Doc, method, sStrongRef, Transactor } from '@voltiso/transactor'
import { $Assert } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule)

class A extends Doc('a').public({
	a: 1,
	b: sStrongRef<'b'>(),
}) {
	@method
	async setFriend(b: DocRef<B>) {
		this.data.b = b
	}
}

class B extends Doc('b').public({
	b: 2,
	c: sStrongRef<'c'>(),
}) {
	@method
	async setFriend(c: DocRef<C>) {
		this.data.c = c
	}
}

class C extends Doc('c').public({
	c: 3,
	d: sStrongRef<'d'>(),
}) {
	@method
	async setFriend(d: DocRef<D>) {
		this.data.d = d
	}
}

class D extends Doc('d').public({
	d: 4,
	e: sStrongRef<'e'>(),
}) {
	@method
	async setFriend(e: DocRef<E>) {
		this.data.e = e
	}
}

class E extends Doc('e').public({
	d: s.number,
	f: sStrongRef<'f'>(),
}) {
	@method
	async setFriend(f: DocRef<F>) {
		this.data.f = f
	}
}

class F extends Doc('f').public({
	d: s.number,
	g: sStrongRef<'g'>(),
}) {
	@method
	async setFriend(g: DocRef<G>) {
		this.data.g = g
	}
}

class G extends Doc('g').public({
	d: s.number,
	a: sStrongRef<'a'>(),
}) {
	@method
	async setFriend(a: DocRef<A>) {
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
