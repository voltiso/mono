// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

require('zone.js')

// /** @type {typeof import('jest-mock-console').default} */
// // @ts-expect-error bad typings
// const mockConsole = require('jest-mock-console')

// mockConsole()
// require('zone.js')

const srcFirestore = require('@voltiso/transactor.firestore')

// Error.stackTraceLimit = 20

const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

initializeApp({ projectId: 'firestore-transactor' })

const firestore = getFirestore()

module.exports = {
	firestore,
	srcFirestore,
}
