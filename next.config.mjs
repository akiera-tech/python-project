import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Dev-only: stamp host JSX elements with data-akie-loc="file:start" so the
  // visual editor resolves clicks to source deterministically. Disk source
  // never carries anchors; only the webpack-served dev runtime does.
  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.unshift({
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{ loader: path.resolve(__dirname, 'akie-loc-loader.cjs') }],
      });
    }
    return config;
  },
};
export default nextConfig;
