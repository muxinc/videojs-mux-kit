const playwright = require('playwright');

describe('Basic demo page', () => {
  it('chromium should load', async () => {
    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/basic.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Basic example');
    
    await browser.close();
  });
  
  it('firefox should load', async () => {
    const browser = await playwright['firefox'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/basic.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Basic example');
    
    await browser.close();
  });
  
  it('webkit should load', async () => {
    const browser = await playwright['webkit'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/basic.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Basic example');
    
    await browser.close();
  });
});
