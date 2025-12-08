import { test,Page } from "@playwright/test";
import { UserModel } from "../Model/UserModel.ts";

export class RegisterPage {
    constructor(private page: Page) {}
    async registerNewUser(usermodel: UserModel) {
     
    await this.page.getByRole('textbox', { name: 'First Name' }).fill(usermodel.firstName);
    await this.page.getByRole('textbox', { name: 'Last Name' }).fill(usermodel.lastName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(usermodel.email);
    await this.page.getByLabel('Password').fill(usermodel.password);
    await this.page.getByRole('textbox', { name: 'Phone Number' }).fill(usermodel.phoneNumber);
    await this.page.getByRole('textbox', { name: 'Address' }).fill(usermodel.address);

    // To select randomly gender
    const index=Math.floor(Math.random()*2); 
    await this.page.getByRole('radio').nth(index).check();


    await this.page.getByRole('checkbox').check();
    await this.page.getByRole('button', { name: 'REGISTER' }).click();
   

}
}