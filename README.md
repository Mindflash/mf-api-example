<b>Note:</b> This example application can be run interactively at: http://mindflash.github.io/mf-api-example

<b>Note:</b> This example can be run locally if you have apache or nginx installed locally. Just create a host that points to _**'app/index.html'**_.

<b>Note:</b> [Documentation](https://mindflash.atlassian.net/wiki/spaces/MD/pages/56262657/Updating+API+Documentation) on merge, deploy process.

Mindflash Public API - Documentation
==============

The Mindflash API is a simple REST service that allows clients to carry out simple tasks within their own account
such as managing users, managing user groups, enrolling trainees in courses/series and getting basic reporting
information. These requests are based on very simple HTTP protocol rules in conjunction with the JSON data format.
A sample request and response could look like this:

Request:

	GET https://api.mindflash.com/api/v2/user/333

Response:

	{
	  "id": 333,
	  "name": "Doe, John",
	  "firstName": "John",
	  "lastName": "Doe",
	  "username": "jdoe",
	  "email": "jdoe@yourorg.com",
	  "status": "Active",
	  "type": "Trainee",
	  "isOwner": 0,
	  "groups": []
	}

Authentication
--------------
In order to use the Mindflash API you must first contact customer support to get an API key. This key will allow
you to make secure calls to the API by placing the key in the request header as the `x-mindflash-apikey` field.
A sample request header should look like this:

	Accept:application/json, text/plain, */*
	Accept-Encoding:gzip,deflate,sdch
	x-mindflash-apikey:8442c90ef89745e28620e406

Single-Sign On
--------------
Mindflash offers a useful mechanism that allows clients to log their own trainers and trainees in to the Mindflash
application by simply requesting a session directly. This allows users to log into Mindflash using their own list of
users and credentials on their own internal network. Here is a sample workflow:

![SSO Simple Example](api-sso-simple.png?raw=true)
<b>1.</b> User logs in to private intranet website.
<b>2.</b> After authenticating user on private network, webserver makes request to Mindflash API to get Mindflash session ID
and URL for user to login to the Mindflash application. The request and response look something like this:

	GET https://api.mindflash.com/api/v2/auth?id=9999

	Response: 200
	{
	  userId: 9999,
	  userDisplayName: "Joe Black",
	  userEmail: "joe.black@yourorganization.com",
	  dashboardUrl: "http://yourorg.mindflash.com/CreateCookie.aspx?sessionID2=AcAVGBh34343SD"
	}

<b>3.</b> Webserver serves page to intranet user which contains a the link returned by the Mindflash API.
<b>4.</b> Intranet user clicks link, which directs browser to the Mindflash application. The Mindflash session is attached
to the URL, so user is automatically authenticated and logged into the Mindflash application.

Request Limits
--------------
API usage is subject to rate limits of 10 requests per 10 seconds per API key.

More Documentation
------------------
If you would like call-by-call documentation with examples, please go to http://mindflash.github.io/mf-api-example.
