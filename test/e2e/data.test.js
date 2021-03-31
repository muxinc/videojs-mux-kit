const playwright = require('playwright');

describe('Data demo page', () => {
  it('chromium should load', async () => {
    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/data.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Data integration');
    
    await browser.close();
  });
  
  it('firefox should load', async () => {
    const browser = await playwright['firefox'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/data.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Data integration');
    
    await browser.close();
  });
  
  it('webkit should load', async () => {
    const browser = await playwright['webkit'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8080/data.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Data integration');
    
    await browser.close();
  });
});
