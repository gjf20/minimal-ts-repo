import require from '../config/cjs-require.js';

const {By, Builder, until} = require('selenium-webdriver');
const assert = require('assert');

const addressUnderTest = 'http://localhost:3000';

describe('homepage sanity test', () => {
    let driver;

    // eslint-disable-next-line no-undef
    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    // eslint-disable-next-line no-undef
    after(async () => await driver.quit());

    it('first test case that can be run with mocha', async () => {
        await driver.get(addressUnderTest);
        const title = await driver.getTitle();
        assert.equal('Jamie Flynn: Full Stack Developer', title);

        let pageHeader = await driver.findElement(By.id('welcome-message'));
        await driver.wait(until.elementIsVisible(pageHeader), 2000);

        const value = await pageHeader.getText();

        assert.equal(value, 'Hello world');
    });
});
