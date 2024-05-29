import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class SitePage extends HelperBase{

    constructor(page: Page){
        super(page);
    }
    
    async siteButton(){
        const navigateBlog = this.page.locator('[class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"]');

        //Test Site button
        await navigateBlog.getByRole('button', {name: "Impact Solar (IES)"}).click();
        await this.page.locator('[class="header-sub-menu"]').getByText("Site").click();      

        //Slider Table
        await this.page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Name').hover();
        await this.page.mouse.down();
        await this.page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Last Upload').hover();
        await this.page.mouse.up();
        await this.waitForNumberOfSeconds(2);
        await this.page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Last Upload').hover();
        await this.page.mouse.down();
        await this.page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Name').hover();
        await this.page.mouse.up();

        //map button
        await this.page.locator('[class="svg-inline--fa fa-map "]').click();

        //Zoom in / Zoom out
        await this.page.getByRole('button', {name: "Zoom in"}).dblclick();
        await this.waitForNumberOfSeconds(1);
        await this.page.getByRole('button', {name: "Zoom out"}).dblclick();
    }

}
