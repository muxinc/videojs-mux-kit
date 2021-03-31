describe('Basic demo page', () => {
  it('should load', async () => {
    await page.goto('http://localhost:8080/basic.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Basic example');
    
    await browser.close();
  });
});
