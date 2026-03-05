// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { readFile, unlink } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { runScript } from '../src/runScript'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const makePidFile = (name: string) =>
	join(tmpdir(), `voltiso-run-${name}-${randomUUID()}.pid`)

const toInlineCode = (lines: string[]): string => lines.join(';')

const nodeEvalScript = (code: string): string =>
	`node -e ${JSON.stringify(code)}`
const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

const keepProcessAliveCode = 'setInterval(() => {}, 1_000)'

const pidWriterCode = (pidFile: string): string =>
	toInlineCode([
		'const fs = require("fs")',
		`fs.writeFileSync(${JSON.stringify(pidFile)}, String(process.pid))`,
		keepProcessAliveCode,
	])

const spawnedSubprocessWriterCode = (pidFile: string): string => {
	const childCode = pidWriterCode(pidFile)

	return toInlineCode([
		'const { spawn } = require("child_process")',
		`spawn(process.execPath, ["-e", ${JSON.stringify(childCode)}], { stdio: "ignore" })`,
		keepProcessAliveCode,
	])
}

const spawnedDetachedSubprocessWriterCode = (
	childPidFile: string,
	parentPidFile: string,
): string => {
	const childCode = pidWriterCode(childPidFile)

	return toInlineCode([
		'const fs = require("fs")',
		`fs.writeFileSync(${JSON.stringify(parentPidFile)}, String(process.pid))`,
		'const { spawn } = require("child_process")',
		`const child = spawn(process.execPath, ["-e", ${JSON.stringify(childCode)}], { detached: true, stdio: "ignore" })`,
		'child.unref()',
		keepProcessAliveCode,
	])
}

async function getPidFromFile(
	filePath: string,
	timeoutMs = 2000,
): Promise<number> {
	const start = Date.now()

	for (;;) {
		try {
			const text = (await readFile(filePath, 'utf8')).trim()
			const pid = Number.parseInt(text, 10)
			if (Number.isFinite(pid) && pid > 0) return pid
		} catch {}

		if (Date.now() - start > timeoutMs) {
			throw new Error(`Timed out waiting for PID file: ${filePath}`)
		}

		await new Promise(resolve => setTimeout(resolve, 50))
	}
}

async function expectProcessToExit(
	pid: number,
	timeoutMs = 2000,
): Promise<void> {
	const start = Date.now()

	for (;;) {
		try {
			process.kill(pid, 0)
		} catch (error) {
			const maybeErrno = error as NodeJS.ErrnoException
			if (maybeErrno.code === 'ESRCH') return
			throw error
		}

		if (Date.now() - start > timeoutMs) {
			throw new Error(`Process ${pid} is still alive after ${timeoutMs}ms`)
		}

		await new Promise(resolve => setTimeout(resolve, 50))
	}
}

function expectProcessToBeAlive(pid: number): void {
	process.kill(pid, 0)
}

function safeKill(pid: number | undefined): void {
	if (!pid) return
	try {
		process.kill(pid, 'SIGKILL')
	} catch {}
}

async function safeUnlink(path: string): Promise<void> {
	try {
		await unlink(path)
	} catch {}
}

async function expectAbortWithin(
	promise: Promise<void>,
	timeoutMs: number,
): Promise<void> {
	const abortResult = await Promise.race([
		promise.then(
			() => ({ settled: true as const, error: undefined }),
			error => ({ settled: true as const, error }),
		),
		sleep(timeoutMs).then(() => ({
			settled: false as const,
			error: undefined,
		})),
	])

	if (!abortResult.settled) {
		throw new Error(
			`runScript did not settle after abort within ${timeoutMs}ms`,
		)
	}

	expect(String(abortResult.error)).toMatch(/Aborted/u)
}

async function expectExitWithin(
	process_: { once: (event: 'exit', listener: () => void) => void },
	timeoutMs: number,
): Promise<void> {
	const didExit = await Promise.race([
		new Promise<boolean>(resolve => {
			process_.once('exit', () => resolve(true))
		}),
		sleep(timeoutMs).then(() => false),
	])

	if (!didExit) {
		throw new Error(`Process did not exit within ${timeoutMs}ms`)
	}
}

describe('runScript', () => {
	it('aborts a running node -e script when signal is aborted', async () => {
		const controller = new AbortController()

		const promise = runScript(nodeEvalScript(keepProcessAliveCode), [], {
			signal: controller.signal,
		})

		await sleep(100)
		controller.abort()

		await expect(promise).rejects.toThrow(/Aborted/u)
	})

	it('terminates the spawned script process after abort', async () => {
		const controller = new AbortController()
		const pidFile = makePidFile('script')

		const script = nodeEvalScript(pidWriterCode(pidFile))

		const promise = runScript(script, [], { signal: controller.signal })

		try {
			const pid = await getPidFromFile(pidFile)

			controller.abort()

			await expect(promise).rejects.toThrow(/Aborted/u)
			await expectProcessToExit(pid)
		} finally {
			await safeUnlink(pidFile)
		}
	})

	it('terminates spawned subprocess that writes PID file after abort', async () => {
		const controller = new AbortController()
		const pidFile = makePidFile('subprocess')

		const script = nodeEvalScript(spawnedSubprocessWriterCode(pidFile))

		const promise = runScript(script, [], { signal: controller.signal })

		try {
			const childPid = await getPidFromFile(pidFile)

			controller.abort()

			await expect(promise).rejects.toThrow(/Aborted/u)
			await expectProcessToExit(childPid)
		} finally {
			await safeUnlink(pidFile)
		}
	})

	it('aborts detached subprocess before parent-child reassignment can happen', async () => {
		const controller = new AbortController()
		const childPidFile = makePidFile('detached-subprocess')
		const parentPidFile = makePidFile('detached-parent')

		const script = nodeEvalScript(
			spawnedDetachedSubprocessWriterCode(childPidFile, parentPidFile),
		)

		const promise = runScript(script, [], { signal: controller.signal })
		let childPid: number | undefined
		let parentPid: number | undefined

		try {
			;[childPid, parentPid] = await Promise.all([
				getPidFromFile(childPidFile),
				getPidFromFile(parentPidFile),
			])

			expectProcessToBeAlive(parentPid)
			expectProcessToBeAlive(childPid)

			controller.abort()

			await expectAbortWithin(promise, 3_000)
			await expectProcessToExit(childPid)
		} finally {
			safeKill(childPid)
			safeKill(parentPid)

			await safeUnlink(childPidFile)
			await safeUnlink(parentPidFile)
		}
	})

	it('handles SIGINT for v CLI with detached leaf process', async () => {
		const childPidFile = makePidFile('sigint-detached-subprocess')
		const childCode = pidWriterCode(childPidFile)
		const parentCode = toInlineCode([
			'const { spawn } = require("child_process")',
			`const child = spawn(process.execPath, ["-e", ${JSON.stringify(childCode)}], { detached: true, stdio: "ignore" })`,
			'child.unref()',
			keepProcessAliveCode,
		])
		const sourceVBootstrap = toInlineCode([
			'require("esbuild-register/dist/node").register()',
			'const args = process.argv.slice(1)',
			'process.argv = ["node", "v", ...args]',
			'require("./src/_bin/v.ts")',
		])

		const cliProcess = spawn(
			process.execPath,
			['-e', sourceVBootstrap, 'node', '-e', JSON.stringify(parentCode)],
			{
				cwd: packageRoot,
				stdio: 'ignore',
			},
		)

		let childPid: number | undefined

		try {
			childPid = await getPidFromFile(childPidFile, 4_000)
			expectProcessToBeAlive(childPid)

			cliProcess.kill('SIGINT')

			await expectExitWithin(cliProcess, 3_000)
			await expectProcessToExit(childPid, 3_000)
		} finally {
			safeKill(childPid)
			safeKill(cliProcess.pid)
			await safeUnlink(childPidFile)
		}
	})
})
