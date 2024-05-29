import { Page } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import { TopNavigationPage } from './topNavigationPage';
import { LeftNavigationPage } from './leftNavigationPage';

export class PageManager{

    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly topNavigationPage: TopNavigationPage;
    private readonly leftNavigationPage: LeftNavigationPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.topNavigationPage = new TopNavigationPage(this.page);
        this.leftNavigationPage = new LeftNavigationPage(this.page);
    }

    onLoginPage(){
        return this.loginPage;
    }
    
    topNavigationTo(){
        return this.topNavigationPage;
    }

    leftNavigationTo(){
        return this.leftNavigationPage;
    }
}