import { Page } from '@playwright/test'
import { LoginPage } from '../page-objects/loginPage';
import { TopNavigationPage } from './topNavigation/topNavigationPage';
import { LeftNavigationPage } from './leftNavigation/leftNavigationPage';
import { IpcPage } from './leftNavigation/ipcPage';
import { HardwarePage } from './leftNavigation/hardwarePage';
import { SitePage } from './leftNavigation/sitePage';
import { AnalysisPage } from './topNavigation/analysisPage';

export class PageManager{

    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly topNavigationPage: TopNavigationPage;
    private readonly leftNavigationPage: LeftNavigationPage;
    private readonly ipcPage: IpcPage;
    private readonly hardwarePage: HardwarePage;
    private readonly sitePage: SitePage;
    private readonly analysisPage: AnalysisPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.topNavigationPage = new TopNavigationPage(this.page);
        this.leftNavigationPage = new LeftNavigationPage(this.page);
        this.ipcPage = new IpcPage(this.page);
        this.hardwarePage = new HardwarePage(this.page);
        this.sitePage = new SitePage(this.page);
        this.analysisPage = new AnalysisPage(this.page);
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

    onIpcPage(){
        return this.ipcPage;
    }

    onHarwarePage(){
        return this.hardwarePage;
    }

    onSitePage(){
        return this.sitePage;
    }

    onAnalysisPage(){
        return this.analysisPage;
    }

}