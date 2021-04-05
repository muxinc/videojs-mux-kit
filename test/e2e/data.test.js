describe('Data demo page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080/data.html');
  });

  it('should load', async () => {
    expect(await page.$eval("h2", el => el.textContent)).toEqual('Data integration');
  });

  it('should fire litix beacons', async () => {
    await page.click('.vjs-big-play-button');

    const response = await page.waitForResponse('https://img.litix.io/a.gif');

    expect(response.ok()).toEqual(true);
  });
});
