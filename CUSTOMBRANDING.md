# Custom Branding Collateral


With this guide and the sections provided in this file you’ll be able to customize the portal.Using this guide you can easily configure your custom branding based on given components/Elements color/background-color from excel sheet

->For changing the background image put images in the assets folder.

->For changing the text label color replace the css of elements/components inside custom.css

Look at the below sections provided to see which number matches which element you can change, reference from excel sheet

## PublicPage
1>Below is the various places you can update for a trainee experience related to the public pages.  This will allow you to update your login page, public course, series and catalog pages.

Look at the example provided to see which number matches which element then fill color inside excel sheet.
Ex-green label number  match the element inside excel sheet and enter the color code.


#### public-login-page

![login_image](https://user-images.githubusercontent.com/10574792/98499369-5bb16a00-226f-11eb-8312-5bdcab9c1514.png)

#### public-course-page/ #### public-catalog-page

<img width="471" alt="coursepage" src="https://user-images.githubusercontent.com/10574792/98498391-a8477600-226c-11eb-8927-a0f30c4eb0b7.png">


## TraineeAppCSS

##### course-dashboard-page


The Trainee App consists of the trainee dashboard and the trainee player. The blue labels will identify the specifics of what will be customizable within your Mindflash account.

![v1-dashboard](https://user-images.githubusercontent.com/10574792/98908394-60338800-24e6-11eb-9577-d8370dcde6a2.png)



#### Favicon Icon

For customization of favicon need to put favicon.ico file within the favicon folder.


![favicon](https://user-images.githubusercontent.com/10574792/98499097-96ff6900-226e-11eb-821b-29aa47092ae4.png)


#### Custom SMTP Server

if you would like your trainee emails to be sent through your own Mail Address(SMTP)
server, please update the email.txt file in the customSMTP folder. The information
we need are the following:
• SMTP server address:port
• SMTP Server Username and password credentials
• From email address
• Reply to email address

#### EmailTemplates

To update the subject of any of these emails please place the text you would like in the corresponding subject file. For example
courseInvitationSubject.ejs is where you would update the subject of all courseinvitation emails
ex- You have been invited to <%- courseName%>

Replace the courseName to New Product Training


#### Scenario -
 Suppose we have login page and we want to change the Login button background color/text color
 Steps to do that

1>Go to login page 
2>See the green number label
3>Match the number label in css file 
4>Enter the color code 


If you have any questions please contact your Customer Success Manager directly or email us at help@mindflash.com.

