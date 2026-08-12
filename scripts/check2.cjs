const { chromium } = require('playwright-core');

const EXE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const BASE = 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();

  // 1) 首页: 捕获所有 404 与 console
  const res404 = [];
  const logs = [];
  page.on('response', (r) => { if (r.status() >= 400) res404.push(`${r.status()} <- ${r.url().slice(0, 160)}`); });
  page.on('console', (m) => logs.push(`[${m.type()}] ${m.text().slice(0, 200)}`));
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 25000 });
  await page.waitForTimeout(2500);
  console.log('=== 首页 4xx/5xx ===');
  [...new Set(res404)].forEach((r) => console.log(' ', r));
  console.log('=== 首页 console (前10) ===');
  [...new Set(logs)].slice(0, 10).forEach((l) => console.log(' ', l));

  // 2) 历史名人页: 破损图片 src
  await page.goto(BASE + '/views/history/history.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.src.slice(0, 120))
  );
  console.log('\n=== 历史名人页 破损图片 ===');
  broken.forEach((b) => console.log(' ', b));

  // 3) 游戏页面
  await page.goto(BASE + '/test/views/' + encodeURIComponent('长地图版-游戏初稿.html'), { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  const gerr = [];
  const g404 = [];
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
  page.on('console', (m) => { if (m.type() === 'error') gerr.push(m.text().slice(0, 250)); });
  page.on('pageerror', (e) => gerr.push('[pageerror] ' + String(e).slice(0, 250)));
  page.on('response', (r) => { if (r.status() >= 400) g404.push(`${r.status()} <- ${r.url().slice(0, 150)}`); });
  await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);
  const ginfo = await page.evaluate(() => ({
    title: document.title,
    canvases: [...document.querySelectorAll('canvas')].map((c) => `${c.width}x${c.height}`).slice(0, 6),
    imgs: document.querySelectorAll('img').length,
    brokenImgs: [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).length,
  }));
  console.log('\n=== 游戏页面 ===');
  console.log('DOM:', JSON.stringify(ginfo));
  console.log('错误:', gerr.length ? [...new Set(gerr)].slice(0, 10) : '无');
  console.log('4xx:', g404.length ? [...new Set(g404)].slice(0, 10) : '无');

  await browser.close();
})();
