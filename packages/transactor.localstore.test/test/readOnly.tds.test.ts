// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({
	readOnly: true,
	requireSchemas: false,
	allowValidIdField: true,
})

declare module '@voltiso/transactor' {
	interface DocTypes {
		meetings: Meeting
	}
}

const dateIsoStringRegex =
	/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/u

const sDateIsoString = s.string.regex(dateIsoStringRegex)

const emailRegex =
	// eslint-disable-next-line no-control-regex, security/detect-unsafe-regex, unicorn/no-hex-escape, unicorn/no-unsafe-regex, regexp/no-super-linear-move, unicorn/escape-case, regexp/order-in-character-class, regexp/sort-character-class-elements, regexp/no-useless-non-capturing-group, regexp/no-control-character, regexp/control-character-escape, regexp/prefer-t, regexp/no-dupe-characters-character-class, regexp/require-unicode-regexp
	/(?:[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?|\[(?:(?:(2(5[0-5]|[0-4]\d)|1\d{2}|[1-9]?\d))\.){3}(?:(2(5[0-5]|[0-4]\d)|1\d{2}|[1-9]?\d)|[a-z\d-]*[a-z\d]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const sEmail = s.string.regex(emailRegex)

const sLanguage = s.string

const sId = s.string.minLength(1)

const sMyUserId = s.string.minLength(1)

class Meeting extends Doc('meetings').with({
	public: {
		id: sId.optional, // ! ?

		tradeshowId: sId,
		demoId: sId,

		slotId: sId.optional,
		stationId: sId.optional,

		startsAt: sDateIsoString,
		endsAt: sDateIsoString,

		attendeeId: sMyUserId,
		attendeeDisplayName: s.string.optional, //!
		attendeeEmail: sEmail.optional,

		cancelledBy: s.string.optional,
		language: sLanguage,
		modifiedAt: sDateIsoString.optional, //!
		presenterEndsAt: sDateIsoString,
		presenterId: sMyUserId,

		presenterInvites: s.object, // TODO
		mandatoryInvites: s.object.optional, // TODO
		attendeeInvites: s.object, // TODO

		roomLinkToken: s.string,

		surveyAnswer: s.object, // TODO
		surveyAnswers: s.object.optional, // TODO

		isCheckedIn: s.boolean.optional, //!

		registeredAt: sDateIsoString.optional, //!

		isDeleted: s.boolean,

		version: s.number.optional, //!
	},
}) {}

const meetings = db.register(Meeting)

describe('readOnly', () => {
	it('works with schema - tds example', async () => {
		const data = {
			id: 'a', // troublesome! - see `allowIdField` and `allowValidIdField` Transactor options

			endsAt: '2020-11-23T23:45:00.000Z',
			registeredAt: '2020-11-23T23:54:48.128Z',
			startsAt: '2020-11-23T23:00:00.000Z',
			presenterEndsAt: '2020-11-24T00:00:00.000Z',
			isDeleted: false,
			presenterInvites: [],
			presenterId: 'test',
			attendeeEmail: 'artur.blaszkiewicz@voltiso.com',
			version: 1,
			attendeeInvites: [],
			language: 'czech',
			roomLinkToken: '',
			surveyAnswers: { manualMeeting: { answerText: 'manualMeeting' } },
			attendeeDisplayName: 'B C',
			attendeeId: 'test',
			tradeshowId: 'test',
			surveyAnswer: { answers: {}, manualMeeting: true },
			modifiedAt: '2020-11-23T23:54:48.128Z',
			demoId: 'OOq6Dlc1vIQZtPmcBAqp',
		}

		await database.doc('meetings/a').set(data)

		await meetings('a')
	})
})
