/**
 * Show what the read tool will return for a path, URL, or internal URI.
 */
import { Args, Command } from "@modular/pi-utils/cli";
import { type ReadCommandArgs, runReadCommand } from "../cli/read-cli";
import { initTheme } from "../modes/theme/theme";

export default class Read extends Command {
	static description = "Show what the read tool will return for a path, URL, or internal URI";

	static args = {
		path: Args.string({
			description:
				"Path, URL, or internal URI to read (append :sel for line ranges or raw mode, e.g. src/foo.ts:50-100)",
			required: true,
		}),
	};

	static examples = [
		"modular read src/foo.ts",
		"modular read src/foo.ts:50-100",
		"modular read src/foo.ts:raw",
		"modular read https://example.com",
		"modular read modular://",
		"modular read issue://123",
		"modular read path/to/archive.zip:dir/file.ts",
		"modular read path/to/db.sqlite:users:42",
	];

	async run(): Promise<void> {
		const { args } = await this.parse(Read);
		const cmd: ReadCommandArgs = {
			path: args.path ?? "",
		};
		await initTheme();
		await runReadCommand(cmd);
	}
}
