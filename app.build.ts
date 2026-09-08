import { build } from "bun";
import { rm } from "node:fs/promises";

const allowedApps = Object.freeze(["browser", "server"]);

(async (app?: string) => {
    if (!app || !allowedApps.includes(app)) {
        throw new Error(
            !app ? "App name is required." : "App name not allowed."
        );
    }

    const currentDir = import.meta.dir;

    await rm(`${currentDir}/dist/${app}`, {
        recursive: true,
        force: true
    });

    await build({
        entrypoints: [`${currentDir}/src/${app}/index.ts`],
        root: `${currentDir}/src/${app}`,
        outdir: `${currentDir}/dist/${app}`,
        sourcemap: "external",
        target: "bun",
        format: "esm",
        packages: "bundle",
        minify: true
    });
})(Bun.env.APP);
