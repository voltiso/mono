// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/prefer-hooks-on-top */
import express = require('express')
import { checked } from '@voltiso/caller'
import * as s from '@voltiso/schemar'
import mockConsole from 'jest-mock-console'
import type { Server } from 'node:http'

import { createClient } from '~/client'
import { createServer, createServerContext } from '~/server'

// eslint-disable-next-line jest/require-hook
mockConsole()

// SERVER

const ctx = createServerContext()

const myServer = createServer(ctx).handlers({
	myGroup: {
		helloWorld: checked
			.param(s.number.max(123))
			.result(s.number)
			.function(x => 2 * x),

		hello2: checked
			.param(s.number)
			.result(s.number)

			.function(async x => 2 * x),
	},

	auth: {
		echoToken: checked
			.result(s.string)
			.function(() => ctx.req.headers.authorization!),
	},
})

// eslint-disable-next-line jest/require-hook
let port = 0

let httpServer: Server

// eslint-disable-next-line jest/require-top-level-describe, jest/no-hooks
beforeAll(async () => {
	// eslint-disable-next-line import/dynamic-import-chunkname
	const getPort = (await import('get-port')).default
	port = await getPort()
	// port = 12_345

	httpServer = express().use(express.json()).post('/rpc', myServer).listen(port)
})

// CLIENT

describe('client', function () {
	it('works', async function () {
		expect.hasAssertions()

		const myClient = createClient<typeof myServer>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.helloWorld(222)).rejects.toThrow('123')
		await expect(myClient.myGroup.helloWorld(22)).resolves.toBe(44)
	})

	it('works with async', async function () {
		expect.hasAssertions()

		const myClient = createClient<typeof myServer>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.hello2(22)).resolves.toBe(44)
	})

	it('works with token', async function () {
		expect.hasAssertions()

		const myClient = createClient<typeof myServer>(
			`http://localhost:${port}/rpc`,
		)
		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).resolves.toBe('Bearer test')
	})

	it('network error', async function () {
		expect.hasAssertions()

		const myClient = createClient<typeof myServer>(`http://localhost:7444/rpc`)
		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).rejects.toThrow('echoToken')
	})

	// eslint-disable-next-line jest/no-hooks
	afterAll(function () {
		httpServer.close()
	})
})
