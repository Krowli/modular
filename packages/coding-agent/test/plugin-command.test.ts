import { describe, expect, it } from "bun:test";
import Plugin from "@modular/pi-coding-agent/commands/plugin";
import type { CliConfig } from "@modular/pi-utils/cli";

const TEST_CONFIG: CliConfig = {
	bin: "modular",
	version: "0.0.0-test",
	commands: new Map(),
};

describe("Plugin command scope parsing", () => {
	it("rejects invalid scope values", async () => {
		const command = new Plugin(["install", "--scope", "porject"], TEST_CONFIG);
		await expect(command.parse(Plugin)).rejects.toThrow(/Expected --scope to be one of: user, project/);
	});
});
