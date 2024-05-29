import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase'

export class IpcPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }
    
    async ipcButton(){
        const navigateBlog = this.page.locator('[class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"]');
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();
        await navigateBlog.getByRole('button', {name: "Lotus"}).click();
        await this.page.getByText("Ipc").click();
       
        await this.page.locator('.text-4xl .svg-inline--fa').click();
        await expect(this.page.getByTestId('modal')).toBeVisible();

        //fill create IPC
        await this.page.getByPlaceholder("Name...", {exact: true}).fill("E8xc");
        await this.page.getByPlaceholder("Secret name...").fill("H11af");
        await this.page.getByText("Save").click();

        //Test data field
        //Setting Button
        await this.page.getByRole('link', { name: "Ipc"}).click();
        await this.page.locator('[class="p-4 rounded-xl shadow-lg"]')
            .filter({ hasText: "E8xc"}).getByRole('button', { name: "Setting"}).click();
        
        //Setting button
        expect(this.page.getByText("Settings Management")).toContainText("Settings Management");

        await this.page.locator('div').filter({ hasText: /^Settings Management$/ }).getByRole('button').click();
        await this.page.getByText('Ipc').click();
        //Delete button
        await this.page.locator('[class="p-4 rounded-xl shadow-lg"]').filter({ hasText: "E8xc" }).getByRole('button', { name: "Delete" }).click({timeout: 40000});
        await expect(this.page.getByTestId('modal')).toBeVisible();
        
        await this.page.getByTestId('modal').getByRole('button', {name: "Yes"}).click();
    }

}
