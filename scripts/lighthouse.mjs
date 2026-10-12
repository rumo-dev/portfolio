// Lighthouse でサイトを計測し、結果を src/data/lighthouse.json に保存します。
// トップページの「Site Quality」表示はこのファイルを読み込みます。
//
// 使い方:
//   npm install -D lighthouse chrome-launcher     （初回のみ）
//   npm run lighthouse                            （ビルド → 計測 → JSON保存）
//
// ※ Google Chrome がインストールされている必要があります。
import { spawn, execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const PORT = 4399;
const BASE = "/portfolio/";
const URL_TO_TEST = `http://localhost:${PORT}${BASE}`;
const OUT = new URL("../src/data/lighthouse.json", import.meta.url);
const isWin = process.platform === "win32";

// ---- プレビューサーバー起動 ----
const server = spawn(
  "npx",
  ["astro", "preview", "--port", String(PORT), "--host", "127.0.0.1"],
  { shell: true, stdio: "ignore" },
);
function stopServer() {
  try {
    if (isWin) execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: "ignore" });
    else server.kill("SIGTERM");
  } catch {}
}
process.on("exit", stopServer);

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(URL_TO_TEST);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("プレビューサーバーが起動しませんでした");
}

let chrome;
try {
  await waitForServer();
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });

  // 既定設定 = モバイル（スロットリングあり）。3回計測して中央値を採用
  const runs = [];
  for (let i = 0; i < 3; i++) {
    const result = await lighthouse(URL_TO_TEST, {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    const c = result.lhr.categories;
    runs.push({
      performance: Math.round(c.performance.score * 100),
      accessibility: Math.round(c.accessibility.score * 100),
      bestPractices: Math.round(c["best-practices"].score * 100),
      seo: Math.round(c.seo.score * 100),
    });
    console.log(`run ${i + 1}:`, runs[i]);
  }
  const median = (key) =>
    runs.map((r) => r[key]).sort((a, b) => a - b)[Math.floor(runs.length / 2)];

  const scores = {
    performance: median("performance"),
    accessibility: median("accessibility"),
    bestPractices: median("bestPractices"),
    seo: median("seo"),
    measuredAt: new Date().toISOString().slice(0, 10),
    device: "モバイル",
    runs: runs.length,
  };
  writeFileSync(OUT, JSON.stringify(scores, null, 2) + "\n");
  console.log("保存しました:", OUT.pathname, scores);
} finally {
  if (chrome) await chrome.kill();
  stopServer();
}
