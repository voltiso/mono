import esr from 'esbuild-runner/lib/jest'

function process(src: string, filename: string) {
	const code = esr.process(src, filename)
	return { code }
}

export = {
	process,
}
