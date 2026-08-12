const { chromium } = require('playwright-core');

const EXE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:5173';

const pages = [
  { name: '首页', path: '/' },
  { name: '茶船古道', path: '/views/teaBoat/teaBoat.html' },
  { name: '历史名人', path: '/views/history/history.html' },
  { name: '历史名人详情', path: '/views/history/history_human.html' },
  { name: '产业现状', path: '/views/industry/industry.html' },
  { name: '旅游资源', path: '/views/travel/index.html' },
  { name: '河流运输(river占位)', path: '/views/river/river.html' },
  { name: '学习制茶', path: '/views/makeTea/makeTea.html' },
];

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();

  for (const p of pages) {
    const errors = [];
    const failed = [];
    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
    page.removeAllListeners('requestfailed');
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        errors.push(`[${msg.type()}] ${msg.text().slice(0, 300)}`);
      }
    });
    page.on('pageerror', (err) => errors.push(`[pageerror] ${String(err).slice(0, 300)}`));
    page.on('requestfailed', (req) => {
      failed.push(`${req.failure()?.errorText || 'failed'} <- ${req.url().slice(0, 200)}`);
    });

    try {
      await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 25000 });
    } catch (e) {
      errors.push(`[goto] ${String(e).slice(0, 200)}`);
    }
    await page.waitForTimeout(3000);

    const info = await page.evaluate(() => {
      const count = (sel) => document.querySelectorAll(sel).length;
      const canvases = [...document.querySelectorAll('canvas')].map((c) => {
        return `${c.width}x${c.height}${c.style.display === 'none' ? '(hidden)' : ''}`;
      });
      return {
        title: document.title,
        bodyTextLen: (document.body.innerText || '').length,
        canvases: canvases.slice(0, 8),
        imgs: count('img'),
        brokenImgs: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
      };
    });

    console.log(`\n===== ${p.name} (${p.path}) =====`);
    console.log('DOM:', JSON.stringify(info));
    if (errors.length) {
      console.log('错误/警告:');
      [...new Set(errors)].slice(0, 12).forEach((e) => console.log('  ' + e));
    } else {
      console.log('无 console 错误');
    }
    if (failed.length) {
      console.log('请求失败:');
      [...new Set(failed)].slice(0, 8).forEach((f) => console.log('  ' + f));
    }
  }

  await browser.close();
})();
