// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** `eslint-plugin-woke` - educational plugin for learning new words ❤️ */
export const wokeOverride = {
	files: '*',

	plugins: ['woke'],

	rules: {
		'woke/LGBTQ': 2,

		'woke/all': 0,
		'woke/gender': 2,
		'woke/profanity': 2,
		'woke/racism': 0, // does not allow `prod` - can't disable...
	},
}
