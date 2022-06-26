import esr from "esbuild-runner/lib/jest";

export default {
	process(src: string, filename: string) {
		const code = esr.process(src, filename);
		return { code };
	},
};
