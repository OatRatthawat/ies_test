import { Page, expect } from '@playwright/test'
import { HelperBase } from '../helperBase';

export class LeftNavigationPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }
    
    async toggleClick(){
        const navigateBlog = this.page.locator('[class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden"]');

        //list of management
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();

        const navsLotus = ["Lotus", "Lotus west", "Lotus north"];
        for( let nav of navsLotus){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }

        const navsBigc = ["Big C", "Big c west", "Big c north", "Big c east", "Big c south"];
        for( let nav of navsBigc){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }
    }

}