describe('Data demo page', () => {
  it('should load', async () => {
    await page.goto('http://localhost:8080/data.html');

    expect(await page.$eval("h2", el => el.textContent)).toEqual('Data integration');
    
    await browser.close();
  });
});
