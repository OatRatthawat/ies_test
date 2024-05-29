import { test, expect } from '@playwright/test'

test.use({
    ignoreHTTPSErrors: true
});

test.beforeEach(async ({page}) => {
    await page.goto('https://iesdev.technimal.co.th/auth/login');
})

test.describe('Login Test', () => {
    test('valid Username and valid Password', async ({page}) => {
        const usernameField = page.getByRole('textbox', {name: 'username'});
        await usernameField.fill("admin");
        const usernameValue = await usernameField.inputValue();
        

        const passwordField = page.getByRole('textbox', {name: 'password'});
        await passwordField.fill("Qwertyzxcv9");
        const passwordValue = await passwordField.inputValue();

        await page.locator('[class="svg-inline--fa fa-eye-slash text-gray-400"]').click();
        await page.locator('input[type = checkbox]').check();
        await page.getByRole('button', {name: 'Login'}).click();

        await expect(page.locator('[class="go2072408551"] ')).toHaveText('Login successful!');
    })

    test('valid Username and invalid Password', async ({page}) => {
        const usernameField = page.getByRole('textbox', {name: 'username'});
        await usernameField.fill("admin");

        const passwordField = page.getByRole('textbox', {name: 'password'});
        await passwordField.fill("123456");
        const passwordValue = await passwordField.inputValue();

        await page.locator('[class="svg-inline--fa fa-eye-slash text-gray-400"]').click();
        await page.locator('input[type = checkbox]').check();
        await page.getByRole('button', {name: 'Login'}).click();
    })

    test('invalid Username and valid Password', async ({page}) => {
        const usernameField = page.getByRole('textbox', {name: 'username'});
        await usernameField.fill("admin007");

        const passwordField = page.getByRole('textbox', {name: 'password'});
        await passwordField.fill("Qwertyzxcv9");
        const passwordValue = await passwordField.inputValue();

        await page.locator('[class="svg-inline--fa fa-eye-slash text-gray-400"]').click();
        await page.locator('input[type = checkbox]').check();
        await page.getByRole('button', {name: 'Login'}).click();
    })

    test('invalid Username and invalid Password', async ({page}) => {
        const usernameField = page.getByRole('textbox', {name: 'username'});
        await usernameField.fill("admin007");

        const passwordField = page.getByRole('textbox', {name: 'password'});
        await passwordField.fill("123456");
        const passwordValue = await passwordField.inputValue();

        await page.locator('[class="svg-inline--fa fa-eye-slash text-gray-400"]').click();
        await page.locator('input[type = checkbox]').check();
        await page.getByRole('button', {name: 'Login'}).click();
    })
})