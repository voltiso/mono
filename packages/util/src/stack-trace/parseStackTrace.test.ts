// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { parseStackTrace } from './parseStackTrace'

describe('parseStackTrace', () => {
	it('shell stack', () => {
		expect.hasAssertions()

		const stackStr =
			'Error\n' +
			'    at REPL6:1:1\n' +
			'    at Script.runInThisContext (node:vm:129:12)\n' +
			'    at REPLServer.defaultEval (node:repl:572:29)\n' +
			'    at bound (node:domain:433:15)\n' +
			'    at REPLServer.runBound [as eval] (node:domain:444:12)\n' +
			'    at REPLServer.onLine (node:repl:902:10)\n' +
			'    at REPLServer.emit (node:events:525:35)\n' +
			'    at REPLServer.emit (node:domain:489:12)\n' +
			'    at REPLServer.Interface._onLine (node:readline:491:10)\n' +
			'    at REPLServer.Interface._line (node:readline:868:8)'

		const stack = parseStackTrace(stackStr)

		expect(stack).toMatchSnapshot()
	})

	it('jest stack', () => {
		expect.hasAssertions()

		const stackStr = `Error:
        at Object.<anonymous> (/home/atablash/mono/packages/util/src/stack-trace/parseStackTrace.test.ts:22:25)
        at Promise.then.completed (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/utils.js:289:28)
        at new Promise (<anonymous>)
        at callAsyncCircusFn (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/utils.js:222:10)
        at _callCircusTest (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js:248:40)
        at _runTest (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js:184:3)
        at _runTestsForDescribeBlock (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js:86:9)
        at _runTestsForDescribeBlock (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js:81:9)
        at run (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js:26:3)
        at runAndTransformResultsToJestFormat (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:120:21)
        at jestAdapter (/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)
        at runTestInternal (/home/atablash/mono/node_modules/.pnpm/jest-runner@29.2.0/node_modules/jest-runner/build/runTest.js:367:16)
        at runTest (/home/atablash/mono/node_modules/.pnpm/jest-runner@29.2.0/node_modules/jest-runner/build/runTest.js:444:34)`

		const stack = parseStackTrace(stackStr)

		expect(stack).toMatchSnapshot()
	})
})
