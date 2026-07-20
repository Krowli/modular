import { describe, expect, it } from "bun:test";
import { InternalUrlRouter } from "@modular/pi-coding-agent/internal-urls";

describe("ModularProtocolHandler", () => {
	it("treats modular://docs as the documentation root", async () => {
		const resource = await InternalUrlRouter.instance().resolve("modular://docs");

		expect(resource.content).toContain("# Documentation");
		expect(resource.content).toContain("tools/read.md");
	});

	it("resolves docs-prefixed documentation paths", async () => {
		const router = InternalUrlRouter.instance();
		const direct = await router.resolve("modular://tools/read.md");
		const prefixed = await router.resolve("modular://docs/tools/read.md");

		expect(prefixed.content).toBe(direct.content);
		expect(prefixed.content).toContain("# read");
	});
});
