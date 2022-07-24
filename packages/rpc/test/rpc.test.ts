// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/prefer-hooks-on-top */
import express = require('express')
import { checked } from '@voltiso/caller'
// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar'

import { createClient } from '../src/client'
import { createServer, createServerContext } from '../src/server'

const port = 3126

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

const httpServer = express()
	.use(express.json())
	.post('/rpc', myServer)
	.listen(port)

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
