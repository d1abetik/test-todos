import {defineConfig} from "vite";
import {mergeConfig} from 'vitest/config';
import viteConfig from "./vite.config";

const mergedConfig =  mergeConfig(viteConfig, defineConfig({
	test: {
		environment: 'jsdom'
	}
}));

export default mergedConfig;