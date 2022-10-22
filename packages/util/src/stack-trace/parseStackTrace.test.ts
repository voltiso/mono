// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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

		expect(stack).toStrictEqual([
			{
				functionName: 'Script.runInThisContext',
				path: 'node:vm',
				shortPath: 'node:vm',
				fileName: 'node:vm',
				line: 129,
				column: 12,
			},
			{
				functionName: 'REPLServer.defaultEval',
				path: 'node:repl',
				shortPath: 'node:repl',
				fileName: 'node:repl',
				line: 572,
				column: 29,
			},
			{
				functionName: 'bound',
				path: 'node:domain',
				shortPath: 'node:domain',
				fileName: 'node:domain',
				line: 433,
				column: 15,
			},
			{
				functionName: 'REPLServer.runBound',
				path: 'node:domain',
				shortPath: 'node:domain',
				fileName: 'node:domain',
				line: 444,
				column: 12,
			},
			{
				functionName: 'REPLServer.onLine',
				path: 'node:repl',
				shortPath: 'node:repl',
				fileName: 'node:repl',
				line: 902,
				column: 10,
			},
			{
				functionName: 'REPLServer.emit',
				path: 'node:events',
				shortPath: 'node:events',
				fileName: 'node:events',
				line: 525,
				column: 35,
			},
			{
				functionName: 'REPLServer.emit',
				path: 'node:domain',
				shortPath: 'node:domain',
				fileName: 'node:domain',
				line: 489,
				column: 12,
			},
			{
				functionName: 'REPLServer.Interface._onLine',
				path: 'node:readline',
				shortPath: 'node:readline',
				fileName: 'node:readline',
				line: 491,
				column: 10,
			},
			{
				functionName: 'REPLServer.Interface._line',
				path: 'node:readline',
				shortPath: 'node:readline',
				fileName: 'node:readline',
				line: 868,
				column: 8,
			},
		])
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

		expect(stack).toStrictEqual([
			{
				functionName: 'Object.<anonymous>',
				path: '/home/atablash/mono/packages/util/src/stack-trace/parseStackTrace.test.ts',
				shortPath: 'util/src/stack-trace/parseStackTrace.test.ts',
				fileName: 'parseStackTrace.test.ts',
				line: 22,
				column: 25,
			},
			{
				functionName: 'Promise.then.completed',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/utils.js',
				shortPath: 'jest-circus/build/utils.js',
				fileName: 'utils.js',
				line: 289,
				column: 28,
			},
			{
				functionName: 'new Promise',
				path: '<anonymous>',
				fileName: '<anonymous>',
			},
			{
				functionName: 'callAsyncCircusFn',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/utils.js',
				shortPath: 'jest-circus/build/utils.js',
				fileName: 'utils.js',
				line: 222,
				column: 10,
			},
			{
				functionName: '_callCircusTest',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js',
				shortPath: 'jest-circus/build/run.js',
				fileName: 'run.js',
				line: 248,
				column: 40,
			},
			{
				functionName: '_runTest',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js',
				shortPath: 'jest-circus/build/run.js',
				fileName: 'run.js',
				line: 184,
				column: 3,
			},
			{
				functionName: '_runTestsForDescribeBlock',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js',
				shortPath: 'jest-circus/build/run.js',
				fileName: 'run.js',
				line: 86,
				column: 9,
			},
			{
				functionName: '_runTestsForDescribeBlock',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js',
				shortPath: 'jest-circus/build/run.js',
				fileName: 'run.js',
				line: 81,
				column: 9,
			},
			{
				functionName: 'run',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/run.js',
				shortPath: 'jest-circus/build/run.js',
				fileName: 'run.js',
				line: 26,
				column: 3,
			},
			{
				functionName: 'runAndTransformResultsToJestFormat',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js',

				shortPath:
					'jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js',

				fileName: 'jestAdapterInit.js',
				line: 120,
				column: 21,
			},
			{
				functionName: 'jestAdapter',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-circus@29.2.0/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js',
				shortPath: 'jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js',
				fileName: 'jestAdapter.js',
				line: 79,
				column: 19,
			},
			{
				functionName: 'runTestInternal',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-runner@29.2.0/node_modules/jest-runner/build/runTest.js',
				shortPath: 'jest-runner/build/runTest.js',
				fileName: 'runTest.js',
				line: 367,
				column: 16,
			},
			{
				functionName: 'runTest',
				path: '/home/atablash/mono/node_modules/.pnpm/jest-runner@29.2.0/node_modules/jest-runner/build/runTest.js',
				shortPath: 'jest-runner/build/runTest.js',
				fileName: 'runTest.js',
				line: 444,
				column: 34,
			},
		])
	})
})
