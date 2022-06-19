import * as clier from '@voltiso/clier'

const handlers = {
	myHello: checked()

	myCommand: {
		mySubCommand:
	}
}

export async function main() {
	console.log('hello from main()')

	await clier.runClier()

	console.log('')

	console.log('bye from main()')
}
