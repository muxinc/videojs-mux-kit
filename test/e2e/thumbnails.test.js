const playwright = require('playwright');

describe('Thumbnails demo page', () => {
  it('should load', async () => {
    for (const browserType of ["chromium", "firefox", "webkit"]) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('http://localhost:8080/thumbnails.html');
      
      expect(await page.$eval("h2", el => el.textContent)).toEqual('Thumbnail preview scrubber');
      
      await browser.close();
    }    
  })
});
