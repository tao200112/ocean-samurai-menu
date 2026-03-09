import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 1080 });
  await page.goto('https://order.toasttab.com/online/ocean-samurai-2-1635-n-franklin-st-ste-a', { waitUntil: 'networkidle2' });

  // Wait a bit
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'toast_before.png' });

  // Close modals if they exist (e.g. Schedule Order popup)
  try {
    const closed = await page.evaluate(() => {
      const closeButtons = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Close') || b.innerText.includes('Cancel') || b.querySelector('svg'));
      if(closeButtons.length > 0) {
          closeButtons[closeButtons.length - 1].click();
          return true;
      }
      return false;
    });
    console.log('Clicked a modal close button:', closed);
  } catch(e) {}

  await new Promise(r => setTimeout(r, 1000));

  // Auto-scroll
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let distance = 300;
      let scrolls = 0;
      let timer = setInterval(() => {
        window.scrollBy(0, distance);
        scrolls++;
        if (scrolls >= 50) { // Limit to 50 scrolls
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });

  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'toast_after.png' });

  // Grab the whole innerText
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('toast_text.txt', text);
  console.log('Saved page text (length', text.length, ') to toast_text.txt');

  await browser.close();
})();
