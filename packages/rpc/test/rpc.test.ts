// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/prefer-hooks-on-top */
import express = require('express')
import type { Server } from 'node:http'

import { checked } from '@voltiso/caller'
import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import type * as Express from 'express'

import type { RpcResult } from '~/_shared'
import { RpcClient } from '~/client'
import { RpcServer, RpcServerContext } from '~/server'

// SERVER

const context = new RpcServerContext<Express.Request, Express.Response>()

const handlers = {
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

	doctor: {
		add: checked.function(async () => {}),
	},

	specialty: {
		add: checked.function(() => {}),
	},

	auth: {
		echoToken: checked
			.result(s.string)
			.function(() => context.request.headers.authorization!),
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
		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		$Assert<IsIdentical<typeof myClient.doctor.add, () => RpcResult<void>>>()

		$Assert<IsIdentical<typeof myClient.specialty.add, () => RpcResult<void>>>()
	})

	it('works', async () => {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.helloWorld(222)).rejects.toThrow('123')
		await expect(myClient.myGroup.helloWorld(22)).resolves.toBe(44)
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

	it('works with async', async function () {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)

		await expect(myClient.myGroup.hello2(22)).resolves.toBe(44)
	})

	it('works with token', async function () {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:${port}/rpc`,
		)
		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).resolves.toBe('Bearer test')
	})

	it('network error', async function () {
		expect.hasAssertions()

		const myClient = new RpcClient<typeof myServer.handlers>(
			`http://localhost:7444/rpc`,
		)
		myClient.setToken('test')

		await expect(myClient.auth.echoToken()).rejects.toThrow('echoToken')
	})

	// eslint-disable-next-line jest/no-hooks
	afterAll(function () {
		httpServer.close()
	})
})
