describe('Subtitles demo page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080/subtitles.html');
  });

  it('should load', async () => {
    expect(await page.$eval("h2", el => el.textContent)).toEqual('Subtitles example');
  });

});
