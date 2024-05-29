import { test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://iesdev.technimal.co.th/auth/login');
    await page.getByRole('textbox', {name: 'username'}).fill('admin');
    await page.getByRole('textbox', {name: 'password'}).fill('Qwertyzxcv9');
    await page.getByRole('button', {name: 'Login'}).click();
})

test.describe('User and User Group Test', () => {
    
})