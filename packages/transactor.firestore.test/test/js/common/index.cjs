// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

/** @type {typeof import('jest-mock-console').default} */
// @ts-expect-error bad typings
const mockConsole = require('jest-mock-console')

mockConsole()
// require('zone.js')

const src = require('@voltiso/transactor')
const srcFirestore = require('@voltiso/transactor.firestore')

// jest.mock('zod', () => {
// 	throw new Error('test mock - zod not present')
// })

// Error.stackTraceLimit = 20

const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({ projectId: 'firestore-transactor' })

const firestore = getFirestore()

const assert = require('node:assert').strict

module.exports = {
	firestore,
	src,
	srcFirestore,
	assert,
}
