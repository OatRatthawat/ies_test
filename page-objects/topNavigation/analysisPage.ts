import { Page } from '@playwright/test'
import { HelperBase } from '../helperBase';

export class AnalysisPage extends HelperBase{

    constructor(page: Page){
        super(page);
    }

    async analysisLeftZone(){
        await this.page.getByText('Analysis').click();

        const analysisBlog1 = ["Performance Ratio", "Performance Index", "Normalize Yield", "Production & Model" , "Production Meter", "Capacity Factor"];
        const dateAndTime1 = ["Day", "3 Day" ,"Week" , "Month", "1 Min", "15 Min", "1 Hour", "1 Day"];

        for(let analysisClick1 of analysisBlog1){
            await this.page.locator('[class="mt-5 grid grid-cols-1 xl:grid-cols-2 px-4"] [class="1"]').getByText(analysisClick1).click();
            for(let dateAndTimeClick1 of dateAndTime1){
                await this.page.locator('[class="w-full rounded-lg h-auto"] [class="flex md:flex-row flex-col space-x-5 md:items-center mt-10 cursor-pointer text-blue-900 whitespace-nowrap"]')
                    .getByText(dateAndTimeClick1, {exact: true}).click();
            }
        }
    }

    async analysisRightZone(){
        await this.page.getByText('Analysis').click();

        const analysisBlog2 = ["Plant Availability", "Hardware Register", "Measurements", "Losses Estimate", "Curtailment Estimate"];
        const dateAndTime2 = ["Day", "3 Day" ,"Week" , "Month", "1 Min", "15 Min", "1 Hour", "1 Day"];

        for(let analysisClick2 of analysisBlog2){
            await this.page.locator('[class="mt-5 grid grid-cols-1 xl:grid-cols-2 px-4"] [class="2"]').getByText(analysisClick2).click();
            for(let dateAndTimeClick2 of dateAndTime2){
                await this.page.locator('[class="w-full rounded-lg h-auto"] [class="flex md:flex-row flex-col space-x-5 md:items-center mt-10 cursor-pointer text-blue-900 whitespace-nowrap"]')
                    .getByText(dateAndTimeClick2, {exact: true}).click();
            }
        }
    }
}