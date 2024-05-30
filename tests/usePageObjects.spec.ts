import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://iesdev.technimal.co.th/auth/login');
    await page.getByRole('textbox', {name: 'username'}).fill('admin');
    await page.getByRole('textbox', {name: 'password'}).fill('Qwertyzxcv9');
    await page.getByRole('button', {name: 'Login'}).click();
})

test.describe('Login page test', () => {
    test('testcase1: valid Username and valid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin", "Qwertyzxcv9", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('Login successful!');
    })

    test('testcase2: valid Username and invalid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin", "123456", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('incorrect username or password');
    })

    test('testcase3: invalid Username and valid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin007", "Qwertyzxcv9", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('query user failed');
    })

    test('testcase4: invalid Username and invalid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin007", "123456", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('query user failed');
    })
})

test.describe('top navigation test', () => {
    test('can go all page in the top navigation', async ({page}) => {
        const pm = new PageManager(page);
        await pm.topNavigationTo().goAllPage();
    })
})

test.describe('left navigation test', () => {
    test('can toggle click all page in the left navigation', async ({page}) => {
        const pm = new PageManager(page);
        await pm.leftNavigationTo().toggleClick();
    })

    // test('can go to Ipc screen and create/edit/delete customer data', async ({page}) => {
    //     const pm = new PageManager(page);
    //     await pm.onIpcPage().ipcButton();
    // })

    test('can go to Hardware screen and create/edit/delete hardware data', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onHarwarePage().hardwareButton();
    })

    test('can go to Site screen and can zoom in/zoom out the map', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onSitePage().siteButton();
    })
})

test.describe('analysis page test', () => {
    test('click left analysis data', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onAnalysisPage().analysisLeftZone();
    })

    test('click right analysis data', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onAnalysisPage().analysisRightZone();
    })
})