import { test,Page } from "@playwright/test";
import * as fs from "fs";
import path from "path";

export function randomNumber(min:number,max:number):number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function saveJsonData(jsonObject: object,filename:string):void{
    try {
        const filepath=path.join(__dirname,"..","resources");
        if(!fs.existsSync(filepath)){
            fs.mkdirSync(filepath,{recursive:true});

        }
        const fullpath=path.join(filepath,filename);
        let dataArray:object[]=[];
        if(fs.existsSync(fullpath)){
            const fileContent=fs.readFileSync(fullpath,'utf-8').trim();
            if(fileContent){
                const parsed=JSON.parse(fileContent);
                dataArray=Array.isArray(parsed)?parsed:[parsed];
            }
        }
        dataArray.push(jsonObject);
        fs.writeFileSync(filepath,JSON.stringify(dataArray,null,2),'utf-8');
        console.log(`Data saved to ${fullpath}`);

        
    } catch (error) {
        console.error("Error saving JSON data:", error);
    }
    
    

  
}



