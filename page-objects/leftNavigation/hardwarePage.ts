import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase';

export class HardwarePage extends HelperBase{

    constructor(page: Page){
        super(page);
    }

    async hardwareButton(){
        const navigateBlog = this.page.locator('[class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"]');
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();
        
        //Test Hard Ware button
        await navigateBlog.getByRole('button', {name: "Impact Solar (IES)"}).click();
        await this.page.getByText("HardWare").click();

        //Test Add button
        await this.page.getByText("Add").click();

        //fill hardware and customization 
        await this.page.getByPlaceholder("ID").fill("1234");
        await this.waitForNumberOfSeconds(1);
        const hardwareIdValue = await this.page.getByPlaceholder("ID").inputValue();
        expect(hardwareIdValue).toEqual("1234");

        await this.page.locator('.pt-10', { hasText: "Hardware Type :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).nth(0).locator('svg').click();
            
        await this.page.getByPlaceholder("Name:").fill("Machine1");
        await this.waitForNumberOfSeconds(1);
        const hardwareNameValue = await this.page.getByPlaceholder("Name:").inputValue();
        expect(hardwareNameValue).toEqual("Machine1");

        await this.page.locator('[class="pt-10 w-2/4"]', { hasText: "Data tags :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).locator('svg').click();
        await this.waitForNumberOfSeconds(1);
        await this.page.locator('[class="mt-10 w-2/4 relative"]', { hasText: "Tag type :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).locator('svg').click();

        await this.page.getByRole('button', { name: /^Add DataTag$/ }).click();
        await this.page.getByText('delete').click();
    }

}