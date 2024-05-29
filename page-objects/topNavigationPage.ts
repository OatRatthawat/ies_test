import { Page } from '@playwright/test'
import { HelperBase } from './helperBase';

export class TopNavigationPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }

    async allPage(){
        const navigateBlog = this.page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap truncate"]')
            .filter({has: this.page.locator('[class="uppercase py-4 font-sm block f transition-colors duration-300 text-white"]')})
            .filter({has: this.page.locator('.contents')});

        const navigate = ["Overview", "Operations", "Analysis", "Billing", "Config", "Rule", "User"];
        for(let navigated of navigate){
            await navigateBlog.getByText(navigated).click();
            await this.waitForNumberOfSeconds(1);
        }
    }
}