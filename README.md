# Smart-Door-using-AWS-services
A Smart Door authentication system using Kinesis Video Streams and Amazon Rekognition to build a distributed system that authenticates people and provides them with access to a virtual door.

# Description
* The project uses Kinesis Video Streams and Amazon Rekognition to build a distributed system that authenticates people and provides them with access to a virtual door.
* Each visitor is indexed by the FaceId detected by Amazon Rekognition, alongside the name of the visitor and their phone number. When storing a new face, if the FaceId returned by Rekognition already exists in the database, then the new photo is appended to the existing photos array.
* There are 2 webpages (one for owner and one for visitor) and 2 DynamoDB tables are maintained (“passcodes” table and “visitors” table which has info about the visitors like photo, name and phone number).
* A Kinesis Video Stream is developed to capture and stream video for analysis.
 * For every known face detected by Rekognition, we send the visitor an SMS message to the phone number on file. The text message includes a PIN or a One-Time Passcode (OTP) that they can use to open the virtual door.
 * For every unknown face detected by Rekogniton, we send an SMS to the “owner” a photo of the visitor. The text message includes a link to approve access for the visitor.
* If the owner approves the visitor, we collect the name and phone number of visitor, create a new record with the information and send the visitor an SMS message to the phone number on file. The text message includes the OTP required.
* Lastly, we authorize the OTP entered by the user in the second web page. 
 * If the OTP is valid, we greet the user by name and present a success message.
 * If the OTP is invalid, we present a “permission denied” message.

# SERVICES USED:
* AWS Kinesis video streams
* Amazon Rekognition video
* API Gateway
* AWS Lambda Serverless
* DynamoDB
* Simple Notification Service
* Simple Queue Service
* Amazon Lex
* React.js
* Node.js
