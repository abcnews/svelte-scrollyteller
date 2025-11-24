import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    // Tweak the port so it doesn't conflict with other projects you may be
    // working on simultaneously
    port: 5178,
  },
});
