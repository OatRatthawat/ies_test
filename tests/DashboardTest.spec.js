import { test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://iesdev.technimal.co.th/auth/login');
    await page.getByRole('textbox', {name: 'username'}).fill('admin');
    await page.getByRole('textbox', {name: 'password'}).fill('Qwertyzxcv9');
    await page.getByRole('button', {name: 'Login'}).click();
})

test.describe('Test Top Navigation Button', () => {
    test('Top navigation', async ({page}) => {
        const navigateBlog = page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap"]')
            .filter({has: page.locator('[class="uppercase py-4 font-sm block f transition-colors duration-300 text-white"]')})
            .filter({has: page.locator('.contents')});

        const navigate = ["Overview", "Operations", "Analysis", "Billing", "Config", "Rule", "User"];
        for(let navigated of navigate){
            await navigateBlog.getByText(navigated).click();
        }
    })
})

test.describe('Test Left Navigation button and Data', () => {
    test('Left navigation', async ({page}) => {
        const navigateBlog = page.locator('[class="md:left-0 md:block md:fixed md:top-0 md:bottom-0  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  shadow-xl bg-white flex flex-wrap items-center justify-between  md:w-64 z-10 py-2 px-0 mt-20 sidebarZero "]');
        
        //FillValue
        //await navigateBlog.filter({has: page.locator('input[placeholder="Search.."]')}).getByRole('textbox').fill('demo');
        //await expect(navigateBlog.getByRole('textbox')).toHaveValue('demo');

        //list of management
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();

        const navs = ["Update Testing", "Demo", "Sub Demo 2"];
        for( let nav of navs){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }
    })
})

test.describe('Test Ipc button and Data', () => {
    test('Ipc test', async ({page}) => {
        const navigateBlog = page.locator('[class="md:left-0 md:block md:fixed md:top-0 md:bottom-0  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  shadow-xl bg-white flex flex-wrap items-center justify-between  md:w-64 z-10 py-2 px-0 mt-20 sidebarZero "]');

        //list of management
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();

        const navs = ["Update Testing", "Demo", "Sub Demo 2"];
        for( let nav of navs){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }

        //Test Ipc button
        await navigateBlog.getByRole('button', {name: "Impact Solar (IES)"}).click();
        await page.getByText("Ipc").click();
       
        await page.locator('.text-4xl .svg-inline--fa').click();
        await expect(page.getByTestId('modal')).toBeVisible();
        
        //fill Ipc form
        await page.getByPlaceholder("Name...", {exact: true}).fill("E8xc");
        await page.getByPlaceholder("Secret name...").fill("H11af");
        await page.getByText("Save").click();

        //Test data field
        //Management button
        //Setting Button
        await page.getByRole('link', { name: "Ipc"}).click();
        await page.locator('[class="p-4 rounded-xl shadow-lg"]')
            .filter({ hasText: "E8xc"}).getByRole('button', { name: "Setting"}).click();
        
        //Setting button
        expect(page.getByText("Settings Management")).toContainText("Settings Management");

        await page.locator('div').filter({ hasText: /^Settings Management$/ }).getByRole('button').click();
        await page.getByText('Ipc').click();
        //Delete button
        await page.locator('[class="p-4 rounded-xl shadow-lg"]').filter({ hasText: "E8xc" }).getByRole('button', { name: "Delete" }).click({timeout: 40000});
        await expect(page.getByTestId('modal')).toBeVisible();
        
        await page.getByTestId('modal').getByRole('button', {name: "Yes"}).click();
    })
})

test.describe('Test Hard Ware Button and Data', () => {
    test('Hardware', async ({page}) => {
        const navigateBlog = page.locator('[class="md:left-0 md:block md:fixed md:top-0 md:bottom-0  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  shadow-xl bg-white flex flex-wrap items-center justify-between  md:w-64 z-10 py-2 px-0 mt-20 sidebarZero "]');

        //list of management
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();

        const navs = ["Update Testing", "Demo", "Sub Demo 2"];
        for( let nav of navs){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }

        //Test Hard Ware button
        await navigateBlog.getByRole('button', {name: "Impact Solar (IES)"}).click();
        await page.getByText("HardWare").click();

        //Test Add button
        await page.getByText("Add").click();

        //fill hardware and customization 
        
        await page.getByPlaceholder("ID").fill("1234");
        const hardwareIdValue = await page.getByPlaceholder("ID").inputValue();
        expect(hardwareIdValue).toEqual("1234");

        await page.locator('.pt-10', { hasText: "Hardware Type :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).nth(0).locator('svg').click();
            
        await page.getByPlaceholder("Name:").fill("Machine1");
        const hardwareNameValue = await page.getByPlaceholder("Name:").inputValue();
        expect(hardwareNameValue).toEqual("Machine1");

        await page.locator('[class="pt-10 w-2/4"]', { hasText: "Data tags :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).locator('svg').click();
        await page.locator('[class="mt-10 w-2/4 relative"]', { hasText: "Tag type :"}).locator('.css-13cymwt-control', { hasText: "Select..."}).locator('svg').click();

        await page.getByRole('button', { name: /^Add DataTag$/ }).click();
        await page.getByText('delete').click();
    })  
})

test.describe('Test Site Page', () => {
    test('Site', async({page}) => {
        const navigateBlog = page.locator('[class="md:left-0 md:block md:fixed md:top-0 md:bottom-0  md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden  shadow-xl bg-white flex flex-wrap items-center justify-between  md:w-64 z-10 py-2 px-0 mt-20 sidebarZero "]');

        //list of management
        await navigateBlog.getByRole('img', { name: "Toggle" }).click();

        const navs = ["Update Testing", "Demo", "Sub Demo 2"];
        for( let nav of navs){
            await navigateBlog.getByRole('button', {name: nav}).getByRole('img', { name: "Toggle" }).click();
        }

        //Test Site button
        await navigateBlog.getByRole('button', {name: "Impact Solar (IES)"}).click();
        await page.locator('[class="header-sub-menu"]').getByText("Site").click();      

        //Slider Table
        await page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Name').hover();
        await page.mouse.down();
        await page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Last Upload').hover();
        await page.mouse.up();
        
        await page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Last Upload').hover();
        await page.mouse.down();
        await page.locator('[class="overflow-x-auto"] [class="bg-gray-50"]').getByText('Name').hover();
        await page.mouse.up();
    })
})

test.describe('Test Operations button and inside function', () => {
    test('Operations', async ({page}) => {
        await page.getByText('Operations').click();

        //await page.locator('[class="flex items-center space-x-2 ml-4 "] [class="react-switch-handle"]').click();    
        //await page.locator('[class="flex items-center space-x-2 ml-4 "] [class="react-switch mt-0"] input[type="checkbox"]').check({force: true});
        
        //await page.locator('[class="flex items-center space-x-2 ml-4 "] [class="react-switch mt-0"] [class="react-switch-handle"]').getByRole('checkbox').check({force: true});


    })
})

test.describe('Test show data in Analysis page', () => {
    test('Analysis1', async ({page}) => {
        await page.getByText('Analysis').click();

        const analysisBlog1 = ["Performance Ratio", "Performance Index", "Normalize Yield", "Production & Model" , "Production Meter", "Capacity Factor"];
        const dateAndTime1 = ["Day", "3 Day" ,"Week" , "Month", "1 Min", "15 Min", "1 Hour", "1 Day"];

        for(let analysisClick1 of analysisBlog1){
            await page.locator('[class="mt-5 grid grid-cols-1 xl:grid-cols-2 px-4"] [class="1"]').getByText(analysisClick1).click({delay: 1000});
            for(let dateAndTimeClick1 of dateAndTime1){
                await page.locator('[class="w-full rounded-lg h-auto"] [class="flex md:flex-row flex-col space-x-5 md:items-center mt-10 cursor-pointer text-blue-900 whitespace-nowrap"]')
                    .getByText(dateAndTimeClick1, {exact: true}).click();
            }
        }
    })
    
    test('Analysis2', async ({page}) => {
        await page.getByText('Analysis').click();

        const analysisBlog2 = ["Plant Availability", "Hardware Register", "Measurements", "Losses Estimate", "Curtailment Estimate"];
        const dateAndTime2 = ["Day", "3 Day" ,"Week" , "Month", "1 Min", "15 Min", "1 Hour", "1 Day"];

        for(let analysisClick2 of analysisBlog2){
            await page.locator('[class="mt-5 grid grid-cols-1 xl:grid-cols-2 px-4"] [class="2"]').getByText(analysisClick2).click({delay: 1000});
            for(let dateAndTimeClick2 of dateAndTime2){
                await page.locator('[class="w-full rounded-lg h-auto"] [class="flex md:flex-row flex-col space-x-5 md:items-center mt-10 cursor-pointer text-blue-900 whitespace-nowrap"]')
                    .getByText(dateAndTimeClick2, {exact: true}).click();
            }
        }
    })
})

test.describe('Test Billing text', () => {
    test('Billing', async ({page}) => {
        await page.getByText('Billing').click();

        await page.getByRole('button', { name: "Add Contract" }).click();
        await expect(page.locator('[class="text-xl"]')).toContainText("Add New", " Contract");
        await expect(page.locator('[class="font-semibold"]')).toContainText("Please set billing configs before creating a new contract.");
        await page.locator('div').filter({ hasText: /^Add New Contract$/ }).getByRole('button').click();

        await page.locator('[class="header-sub-menu-link "]').getByText('Invoice').click();
    })
})

// test.describe('Test config button and test fill data', () => {
//     test('Config', async ({page}) => {
//         await page.getByText('Config').click();
        
//     })
// })

test.describe('Test Rule button and test fill data', () => {
    test('Rule', async ({page}) => {
        await page.getByText('Rule').click();

        //Name of the event
        await page.getByText('Add Rule').click();
        await page.getByPlaceholder('Name of the event').fill("Get data");

        //System Trigger        
        await page.locator('[class="flex space-x-3 items-center"]').getByRole('checkbox').check({force: true});
        await page.locator('[class="pt-10"] input[type=number]').fill('2');

        //Delay
        await page.getByPlaceholder('delay').fill('2');

        //IF*
        const listDropdown1 = page.locator('[class="grid grid-col-1 md:grid-cols-6 gap-5 w-full"] [class=" css-13cymwt-control"] svg');
        await listDropdown1.first().click();
        await listDropdown1.nth(0).click();
        await expect(page.locator('#react-select-4-listbox')).toHaveText([">>=<<==!="]);
        //await page.getByRole('option', { name: ">", exact: true}).click();
        await page.getByRole('option', { name: "!="}).click();

        const numberFill = page.locator('[class="grid grid-col-1 md:grid-cols-6 gap-5 w-full"] [class="pt-5"] input[type=number]');
        await numberFill.first().fill('2');
        await numberFill.nth(1).fill('1');
        await page.locator('[class="grid grid-col-1 md:grid-cols-6 gap-5 w-full"] [class="pt-5 w-full col-span-1"] svg').click();
        await expect(page.locator('[class=" css-qr46ko"]')).toHaveText(["SummaryAverageCountMaxMinIncrement"]);
        await page.getByRole('option', { name: "Count" }).click();

        await page.locator('[class="pt-10 cursor-pointer"] [class="svg-inline--fa fa-plus text-xl bg-green-500 hover:bg-green-600 rounded-full text-white px-2 py-2"]')
                .click();

        //Sub IF*
        await page.locator('[class="grid grid-col-1 md:grid-cols-6 gap-5 w-full"] [class=" css-13cymwt-control"] [class="css-8mmkcg"]')
                .nth(3).click();
        await expect(page.locator('[class=" css-qr46ko"]')).toHaveText(["AndOr"])
        await page.getByRole('option', { name: "Or" }).click();

        await page.locator('[class="svg-inline--fa fa-minus text-xl bg-red-500 hover:bg-red-600 rounded-full text-white px-2 py-2"]').nth(1).click();


        const checkboxFill = page.locator('[class="flex space-x-3 items-center pt-10"] input[type=checkbox]');
        //checkbox Email
        await checkboxFill.nth(0).check();
        await page.getByPlaceholder("Add Email").fill("test@test.com");
        await page.locator('[class="bg-blue-500 px-3 cursor-pointer font-bold rounded-md text-white flex justify-center items-center ml-2"]').click();
        //await page.getByPlaceholder("Message true?").fill("12345");
        await page.getByPlaceholder('Message ture?').fill("12345");
        await page.getByPlaceholder("Message false?").fill("12345");

        //checkbox Hook
        await checkboxFill.nth(1).check();
        await page.getByPlaceholder("https//www.technimal.co.th/api/").fill("https://iesdev.technimal.co.th/");
        await page.getByPlaceholder("Authorization").fill("12345");
        await page.locator('textarea').fill("Description");
        //checkbox Alert
        await checkboxFill.nth(2).check();
        await page.locator('[class="w-full border-2 rounded-r-md  py-2 px-5"]').click();
        await expect(page.locator('[class="w-full border-2 rounded-r-md  py-2 px-5"]'))
            .toHaveText(["Alert_levelINFOWARNINGEMERGENCY"]);
        const element = page.locator('select');
        await element.selectOption("warning");

        await page.getByPlaceholder("What is event about ?").nth(0).fill("Type something thing.");
        await page.getByPlaceholder("What is event about ?").nth(1).fill("Type something thing.");
       

        await page.locator('[class="bg-red-500 px-4 py-2 rounded-md"]', { hasText: "Cancel"}).click()

    })
})

test.describe('Test User button', () => {
    test('User Filled', async ({page}) => {
        await page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap"]').getByText('User').click();
        await page.getByRole('button', { name: "Add User" }).click();

        //Add user
        const textFill = page.locator('[class="bg-white shadow rounded p-4 mt-4"] input[type=text]');
        await textFill.nth(0).fill("Human1");
        await textFill.nth(1).fill("Sapien1");
        await textFill.nth(2).fill("test222xe2@test.com");
        await textFill.nth(3).fill("Homo1234");
        await page.locator('[class="bg-white shadow rounded p-4 mt-4"] input[type=password]').fill("123123123");
        const element = page.locator('select');
        await element.nth(0).selectOption("True");
        await element.nth(1).selectOption("User");
        await element.nth(2).selectOption("False");
        await page.getByRole('button', { name: "save" }).click();
        //await expect(page.locator('[class="go4109123758"] [class="go2072408551"] [class="go3958317564"]').nth(1)).toHaveText("insert user failed");

    })

    

    test('User does not Fill', async ({page}) => {
        await page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap"]').getByText('User').click();
        await page.getByRole('button', { name: "Add User" }).click();
        const textFill = page.locator('[class="bg-white shadow rounded p-4 mt-4"] input[type=text]');
        await textFill.nth(0).click();
        await textFill.nth(1).click();
        //Fill wrong email
        await textFill.nth(2).fill("test@");
        //Does not filled
        //await textFill.nth(2).click();
        await textFill.nth(3).click();
        await page.locator('[class="bg-white shadow rounded p-4 mt-4"] input[type=password]').click();
        const element = page.locator('select');
        await element.nth(1).click();
        await page.getByRole('button', { name: "save" }).click();
    })

    test('Loop Usergroup Filled', async ({page}) => {
        await page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap"]')
                .getByText('User').click();
        await page.locator('[class="header-sub-menu-item"]').getByText('User Group').click();
        await page.getByRole('button', { name: "Add Role" }).click();
        //Read
        await page.getByRole('row', { name: "all" }).getByRole('checkbox').nth(0).check({ force: true });
        //await page.getByRole('row', { name: "all" }).getByRole('checkbox').nth(0).uncheck({ force: true });
        //Write
        //await page.getByRole('row', { name: "all" }).getByRole('checkbox').nth(1).check({ force: true });
        //await page.getByRole('row', { name: "all" }).getByRole('checkbox').nth(1).uncheck({ force: true });

        // const permissions = ["data", "asset", "event", "contract", "tou"];
        // for(let permission of permissions){
        //     await page.getByRole('row', { name: permission }).getByRole('checkbox').nth(0).check({ force: true, delay: 750 });
        //     await page.getByRole('row', { name: permission }).getByRole('checkbox').nth(1).check({ force: true, delay: 750 });
        // }
        // for(let permission of permissions){
        //     await page.getByRole('row', { name: permission }).getByRole('checkbox').nth(0).uncheck({ force: true, delay: 750 });
        //     await page.getByRole('row', { name: permission }).getByRole('checkbox').nth(1).uncheck({ force: true, delay: 750 });
        // }

        await page.locator('[class="flex flex-col"] input[type=text]').nth(0).fill("super_user");
        await page.locator('[class="flex flex-col"] input[type=text]').nth(1).fill("Special more tha user");

        await page.getByRole('button', { name: "save" }).click();
    })

    test('Edit and Delete button', async ({page}) => {
        //Edit
        await page.locator('[class="shadow-md bg-white md:pt-16 md:mt-1 grid grid-cols-3 md:grid-cols-7 justify-start flex-nowrap"]')
                .getByText('User').click();
        await page.locator('[class="header-sub-menu-item"]').getByText('User Group').click();
        await page.getByRole('row', { name: "super_user"}).locator('[class="svg-inline--fa fa-gear text-lg"]').click();
        await page.locator('[class="flex flex-col"] input[type=text]').nth(0).fill("noob_user");
        await page.locator('[class="flex flex-col"] input[type=text]').nth(1).fill("nothing special");
        await page.getByRole('button', { name: "Update" }).click();

        //Delete
        await page.getByRole('row', { name: "super_user"}).locator('[class="svg-inline--fa fa-trash text-lg"]').click();
    })

    test('Logout button', async ({page}) => {
        await page.getByText('Logout').click();
    })
})