// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */
/* eslint-disable jest/prefer-hooks-on-top */

import type { Server } from 'node:http'

import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { checked } from '@voltiso/handler'
import * as s from '@voltiso/schemar'
import { $Assert } from '@voltiso/util'
import type * as Express from 'express'
// import express = require('express')
import express from 'express'

import { RpcClient } from '~/client'
import { RpcServer, RpcServerContext } from '~/server'

// SERVER

const context = new RpcServerContext<Express.Request, Express.Response>()

class MyError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'MyError'
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, MyError)
	}
}

const handlers = {
	myGroup: {
		helloWorld: checked
			.parameter(s.number.max(123))
			.return(s.number)
			.implement(x => 2 * x),

		hello2: checked
			.parameter(s.number)
			.return(s.number)
			.implement(async x => 2 * x),

		throwSomething: checked.implement(async () => {
			throw new MyError('my-message')
		}),

		throwSomethingSync: checked.implement(() => {
			throw new MyError('my-message')
		}),
	},

	doctor: {
		add: checked.implement(async () => {}),
	},

	specialty: {
		add: checked.implement(() => {}),
	},

	auth: {
		echoToken: checked
			.return(s.string)
			.implement(() => context.request.headers.authorization!),
	},
}

const myServer = new RpcServer({ context, handlers })

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

describe('client', () => {
	it('type', () => {
		// eslint-disable-next-line no-new, sonarjs/constructor-for-side-effects
		new RpcClient<typeof myServer.handlers>(`http://localhost:${port}/rpc`)

		$Assert()
		$Assert()
	})

	it('simple', async () => {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.helloWorld(22)).resolves.toBe(44)
		await expect(myClient.myGroup.helloWorld(222)).rejects.toThrow('123')
	})

	it('custom serializer', async () => {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
			{
				serializer: {
					serialize: (x: number) => x + 100,
					deserialize: (x: number) => x + 1000,
				},
			},
		)

		const value = await myClient.myGroup.helloWorld(11)

		expect(value).toBe(1222)
	})

	it('works with async', async () => {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.hello2(22)).resolves.toBe(44)
	})

	it('works with token', async () => {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)
		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).resolves.toBe('Bearer test')
	})

	it('network error', async () => {
		expect.hasAssertions()

		const invalidPort = 7444
		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${invalidPort}/rpc`,
		)

		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).rejects.toThrow(
			'rpc.auth.echoToken(): FetchError: request to http://localhost:7444/rpc failed, reason: connect ECONNREFUSED 127.0.0.1:7444',
		)
	})

	//

	it('forwards exceptions - async', async () => {
		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.throwSomething()).rejects.toThrow(
			'MyError: my-message',
		)
	})

	it('forwards exceptions - sync', async () => {
		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.throwSomethingSync()).rejects.toThrow(
			'MyError: my-message',
		)
	})

	// eslint-disable-next-line jest/no-hooks
	afterAll(function () {
		httpServer.close()
	})
})
