// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getGetPathMatches } from './PathMatches.js'

describe('getGetPathMatches', function () {
	it('should work with 2 captures', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/{user}/projects/{project}')

		expect(getPathParams('/users/artur/projects/tds')).toStrictEqual({
			pathArgs: ['artur', 'tds'],

			pathParams: {
				user: 'artur',
				project: 'tds',
			},
		})
	})

	it('should work with 1 capture', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/{user}/data')

		expect(getPathParams('/users/artur/data')).toStrictEqual({
			pathParams: { user: 'artur' },
			pathArgs: ['artur'],
		})
	})

	it('should work with 0 captures', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/user/data')

		expect(getPathParams('/users/user/data')).toStrictEqual({
			pathParams: {},
			pathArgs: [],
		})
	})

	it('should return null when no match', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/{user}')
		const pathParams = getPathParams('/users/artur/')

		expect(pathParams).toBeNull()
	})

	it('should work with wildcards', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/*/projects/**')

		expect(getPathParams('/users/artur/projects/wrs/on24')).toStrictEqual({
			pathParams: {},
			pathArgs: ['artur', 'wrs/on24'],
		})
		expect(getPathParams('/users/artur/x/projects/wrs/on24')).toBeNull()
	})

	it('should work with pathArgs and pathParams at the same time', function () {
		expect.hasAssertions()

		const getPathParams = getGetPathMatches('/users/*/projects/{project}')

		// eslint-disable-next-line jest/prefer-strict-equal
		expect(getPathParams('/users/artur/projects/wrs')).toEqual({
			pathParams: { project: 'wrs' },
			pathArgs: ['artur', 'wrs'],
		})
	})
})
