<b>Note:</b> This example application can be run interactively at: https://api.mindflash.com/api-docs

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

More Documentation
------------------
If you would like call-by-call documentation with examples, please go to https://api.mindflash.com/api-docs.
