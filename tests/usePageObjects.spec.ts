import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';

test.beforeEach(async ({page}) => {
    await page.goto('https://iesdev.technimal.co.th/auth/login');
    await page.getByRole('textbox', {name: 'username'}).fill('admin');
    await page.getByRole('textbox', {name: 'password'}).fill('Qwertyzxcv9');
    await page.getByRole('button', {name: 'Login'}).click();
})

//Login Page
test.describe('fill login page test', () => {
    test('valid Username and valid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin", "Qwertyzxcv9", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('Login successful!');
    })

    test('valid Username and invalid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin", "123456", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('incorrect username or password');
    })

    test('invalid Username and valid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin007", "Qwertyzxcv9", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('query user failed');
    })

    test('invalid Username and invalid Password', async ({page}) => {
        const pm = new PageManager(page);
        await pm.onLoginPage().fillLoginPage("admin007", "123456", true);
        await expect(page.locator('[class="go2072408551"] ')).toHaveText('query user failed');
    })
})


//Top navigation
test.describe('top navigation test', () => {
    test('can go all page in top navigation', async ({page}) => {
        const pm = new PageManager(page);
        await pm.topNavigationTo().allPage();
    })
})

//Left navigation
test.describe('left navigation test', () => {
    test('can go all page in left navigation', async ({page}) => {
        const pm = new PageManager(page);
        await pm.leftNavigationTo().allPage();
    })
})