describe('Thumbnails demo page', () => {
  it('should load', async () => {
    await page.goto('http://localhost:8080/thumbnails.html');
    
    expect(await page.$eval("h2", el => el.textContent)).toEqual('Thumbnail preview scrubber');
    
    await browser.close();
  });
});
