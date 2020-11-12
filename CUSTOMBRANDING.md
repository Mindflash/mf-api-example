# Custom Branding Collateral

Welcome to our how-to guide on Enterprise level branding your Mindflash account. With this guide and the templates provided in this repository, you’ll be able to customize your Mindflash portal to match your company’s brand. You can now update various parts of your trainee experience including public pages, the trainee dashboard, and emails. Details on what you can update for each part of the application are shown below.

### Note:  If you are familiar with CSS, please utilize the CSS stylesheets. If you do not know CSS, please utilize the Excel file. 

## To configure your portal's branding:

### Branding using Excel file (no CSS required):
  1. Open Custom Branding collateral excel sheet (NonCSSbrandingColors.xls)
  2. Find the name of the page that you are wanting to customize in the excel sheet by referencing the screenshots provided below.
  3. Go to the selected section and find the element in the excel sheet based on numbering provided in the screenshots below.
  4. Fill the color code column with the desired color hex code
  5. Any fields not completed will retain Mindflash's default branding settings.
  
### Branding using CSS stylesheets
  1. Open the corresponding CSS file
  2. Make edits where required, noting the corresponding numbers from the screenshots below. 
  3. Any sections left blank will retain Mindflash's default branding settings.

 ## Public Pages
  
  Public pages are pages that all trainees will see without having to login to Mindflash. These pages will include:
  1. Login Page
  2. Forgot Password
  3. Public Catalogs
  4. Course Access Page

Please update the custom.css file in the publicPagesCss folder or the NonCSSbrandingColors.xls file (sheet 1) to make any design changes to these pages. The Green labels will help you identify which file you are updating when you enter the custom.css file or the NonCSSbrandingColors.xls file. 

You can include any background images or other assets in the assets folder. 

The screenshots below explain what is configurable on the Log-In and the Course access pages.

#### public-login-page

![login_image](https://user-images.githubusercontent.com/10574792/98499369-5bb16a00-226f-11eb-8312-5bdcab9c1514.png)

#### public-course-page/public-catalog-page

<img width="471" alt="coursepage" src="https://user-images.githubusercontent.com/10574792/98498391-a8477600-226c-11eb-8927-a0f30c4eb0b7.png">


## Trainee App

The Trainee App consists of the trainee dashboard. Take your trainee experience to the next level by configuring it to match your brand. The screenshots below explain what is configurable by updating the custom.css file in the traineeAppCss folder or the NonCSSbrandingColors.xls file (Sheet 2). 

Include any background images or other assets in the assets folder.

Again, the blue labels will identify the specifics of what will be customizable within your Mindflash account.

##### course-dashboard-page


![v1-dashboard](https://user-images.githubusercontent.com/10574792/98908394-60338800-24e6-11eb-9577-d8370dcde6a2.png)


## To configure Background image:
  1. Place images in the assets folder of the relevant section.
  
## To configure Favicon: 
The Favicon is an icon found on the top left corner of the browser tab. 
  
  1. Place the favicon.ico file in the favicon folder.
  
![favicon](https://user-images.githubusercontent.com/10574792/98499097-96ff6900-226e-11eb-821b-29aa47092ae4.png)

## To configure SMTP:
If you would like your trainee emails to be sent through your own SMTP server, we will need the following information:
  - SMTP server address:port
  - SMTP Server Username and password credentials 
  - From email address
  - Reply to email address
 
  1. Update the email.txt file in the customSMTP folder with above information
  OR
  1. If using the NonCSSbrandingColors.xls file, you can go to the SMTP sheet (Sheet 3). 
  2. Fill the relevant information in the value column. 
  
## To configure EmailTemplates:

All trainee emails are completely configurable from design to content. In the folder emailTemplates, you will see every email that you can customize and make unique for your trainees.

Please make sure to keep the variables found in the files when you update these emails and send them back to us. Custom emails only support one language meaning we can’t translate the content for you. To update the subject of any of these emails please place the text you would like in the corresponding subject file. For example courseInvitationSubject.ejs is where you would update the subject of all course invitation emails. You can also include any of the variables found in the emails into your email subjects as well. Customizing the email templates removes the ability to add additional text specific to each course as found in the Course Settings pages. 

  
## Example -
 Scenario: Change the Login button background color/text color in public-login-page
 
 Steps:

1. Remember the number assigned to login button in the screenshot (7)
2. Find the public-login-page section in the excel sheet 
3. Beside the number, in the color code column, enter the desired color code/fill the column with desired color

Once you have completed all necessary documents, please send them to your Customer Success Manager. The current SLA for implementation of branding requests is 4-6 weeks upon receipt of complete documentation. We will deploy your changes to a staging portal and your CSM will reach out for your approval. Please respond in a timely manner. If you approve the changes, we will deploy to your live portal. If there are changes, we will make those changes and then deploy them to your live portal. Any additional changes will need a new request and will create a new SLA. 

If you have any questions, please contact your Customer Success Manager directly or email us at help@mindflash.com.

