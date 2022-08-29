// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '~'

export interface UnknownRecord extends s.CustomUnknownRecord<{}> {
	<
		TKeySchema extends { OutputType: keyof any; InputType: keyof any },
		TValueSchema extends s.SchemableLike,
	>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): s.Record<TKeySchema, TValueSchema>

	<TValueSchema extends s.SchemableLike>(valueSchema: TValueSchema): s.Record<
		s.DefaultRecordOptions['keySchema'],
		TValueSchema
	>
}
