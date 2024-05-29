import { Page } from '@playwright/test'
import { HelperBase } from './helperBase';

export class LoginPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }
    
    async fillLoginPage(username: string, password: string, rememberMe: boolean){
        const usernameField = this.page.getByRole('textbox', {name: 'username'});
        await usernameField.fill(username);
        const passwordField = this.page.getByRole('textbox', {name: 'password'});
        await passwordField.fill(password);
        if(rememberMe){
            await this.page.locator('[class="svg-inline--fa fa-eye-slash text-gray-400"]').click();
            await this.page.locator('input[type = checkbox]').check();
        }
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}