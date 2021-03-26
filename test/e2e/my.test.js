const playwright = require('playwright');

describe('React App', () => {
  it('should display a react logo', async () => {
    for (const browserType of ["chromium", "firefox", "webkit"]) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('http://localhost:8080/');

      // Maybe in the future, we want to post screenshots as a comment
      // on the PR?
      // await page.screenshot({ path: `example-${browserType}.png` });

      expect(await page.$eval("h1", el => el.textContent)).toEqual('Mux Video.js Kit(s)');
      
      await browser.close();
    }    
  })
});
