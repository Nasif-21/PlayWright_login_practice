import { test,Page,expect } from "@playwright/test";
import { UserModel } from "../Model/UserModel.ts";
import { fa,faker } from '@faker-js/faker';
import { randomNumber, saveJsonData,getLastUser } from "../Utils/utils.ts";
import{RegisterPage} from "../pages/Register.ts";
import { readLatestGmail } from "../Services/Gmail_Data_Read.ts";
import assert, { Assert } from "assert";
import { LoginPage } from "../pages/Login.ts";


let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});
test("Go to register page",async ({}) => {

    await page.goto("https://dailyfinance.roadtocareer.net/");
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Register' }).click();

});

test("Register new user", async ({}) => {
    const register=new RegisterPage(page);
    const usermodel: UserModel = {
        firstName: faker.person.firstName(),
        lastName:faker.person.lastName(),
        email:`skfamily0304+${randomNumber(100,999)}@gmail.com`,
        password:"1234",
        phoneNumber:`01${randomNumber(1000000000,9999999999)}`,
        address:faker.location.streetAddress(),

    }
     await page.pause();

    await register.registerNewUser(usermodel);
    saveJsonData(usermodel,"userData.json");
  
});

test("Check for mail confirmation", async ({}) => {
    // Implementation for checking mail confirmation will go here

    let messageText= await readLatestGmail();
     await page.waitForTimeout(3000);
    messageText=messageText.replace("&#39;","'");
    expect(messageText.toLowerCase()).toContain("welcome to our platform! we're excited to have you onboard");
    

});

test("Go to login and do latest login", async ({}) => {
    await page.goto("https://dailyfinance.roadtocareer.net/login");
    const login=new LoginPage(page);
    const userData=getLastUser('resources/userData.json');
    await login.loginUser(userData);
    await page.waitForTimeout(3000);
    await page.pause();

    assert.equal(await page.getByRole('heading', { name: 'User Daily Costs' }).isVisible(),true);
    await page.pause();


});
