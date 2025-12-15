import { test,Page } from "@playwright/test";
import { UserModel } from "../Model/UserModel.ts";

export class LoginPage{
    constructor(private page:Page){}
    async loginUser(usermodel:UserModel){
    await this.page.getByRole('textbox',{name:'Email'}).fill(usermodel.email);
    await this.page.getByRole('textbox',{name:'Password'}).fill(usermodel.password);
    await this.page.getByRole('button',{name:'LOGIN'}).click();
    }
}