describe('options demo page', () => {
  beforeEach(async () => {
    await page.goto('http://localhost:8080/options.html');
  });

  it('should load', async () => {
    expect(await page.$eval("h2", el => el.textContent)).toEqual('Hls.js options example');
  });

  it('should set hlsjs options', async () => {
    const hlsjs = await page.$eval('.video-js', el => 'hlsjs' in el.player.tech_);

    if (hlsjs) {
      const capLevelToPlayerSize = await page.$eval('.video-js', el => el.player.tech_.hlsjs.config.capLevelToPlayerSize);

      // if hlsjs is set, we should get the new options
      expect(capLevelToPlayerSize).toBe(true);
    } else {
      // otherwise, we assume it's VHS and hlsjs should be falsy then.
      expect(hlsjs).toBeFalsy();
    }
  });
});
