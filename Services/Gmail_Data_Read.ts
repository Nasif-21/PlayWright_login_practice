import { request } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

/*
-Sample process to read Gmail from Gmail API
1. Go to Google OAuth 2.0 Playground: https://developers.google.com/oauthplayground
2. Sellect Gmail API v1 and select the required scopes (e.g., https://www.googleapis.com/auth/gmail.readonly)
3. Click on "Authorize APIs" and sign in with your Google account.
4. After authorization, click on "Exchange authorization code for tokens".
5. Copy the Access Token and set it in your .env file as GMAIL_ACCESS_TOKEN
6. Use the access token in your code to make requests to Gmail API.

- Coding Procedure:
1. Make a function to read full list of emails id to get only the latest gmail id.
2. Inside function, add url, headers with access token.
3. Call the API using request.get() method.
4. Make the data readable my making it JSON.
5. Make another function and thart function is exportable, which helps to read latest email
6. Similarly, add url, headers with access token.
7. Call the API using request.get() method with latest email id.
8. Locate where the message text is stored inside the JSON data.
9. Use postman to identify the path of message text inside JSON data.
*/

// Function to read Gmail from Gmail API
async function fetchLatestGmailId() {
    const api= await request.newContext({
        baseURL:"https://gmail.googleapis.com",
        extraHTTPHeaders:{
            "Authorization":`Bearer ${process.env.gmail_access_token}`
        }
    })

    const response =await api.get('/gmail/v1/users/me/messages');
    let data =await response.json();
    let emailId=await data.messages[0].id;
    return emailId;
};

export async function readLatestGmail(){
    const latestGmailId=await fetchLatestGmailId();
    const api=await request.newContext({
        baseURL: "https://gmail.googleapis.com",
        extraHTTPHeaders:{
            "Authorization":`Bearer ${process.env.gmail_access_token}`
        }

});

    const response=await api.get('/gmail/v1/users/me/messages/'+latestGmailId);
    let data=await response.json();
    let messageText=data.snippet;
    return messageText;
};