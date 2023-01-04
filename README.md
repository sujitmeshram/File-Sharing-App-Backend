<strong>File Sharing App</strong>

I made this file sharing app, where user can upload the file on server and send the generated unique download link to the receiver, also added mail feature in which sender can send download page link via mail to the reciever by using nodemailer and sendinblue.com (SMTP) mail service. 

Dependencies I used : 
<em>
   cors,
    dotenv,
    ejs,
    express,
    mongoose,
    multer ,
    nodemailer,
    uuid
  </em>

To get started, download or clone the project, To Clone, simply paste the URL:
<br>
<em>git clone https://github.com/sujitmeshram/File-Sharing-App-Backend.git
  
1. Go to .env file (make sure to rename '.env.example' as '.env', and add all the necessary credentials. 
2. for SMTP (Simple Mail Transfer Protocol), I used sendinblue.com's email service
  so simply go on <a href="sendinblue.com">sendinblue.com </a> and register yourself, after that head over to "SMTP & API" and put all the credentials in the .env file
  
3. go to terminal and type <em> npm install</em>
4. to run :<em> npm run dev</em>  
5. You can use postman to test the API's here.


frontend code will be adding soon.
