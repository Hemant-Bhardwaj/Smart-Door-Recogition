import json
import cv2
import sys
from pip._internal import main
main(['install', 'boto3', '--target', '/tmp/'])
sys.path.insert(0,'/tmp/')
import boto3
import base64
import requests
import random
from boto3.dynamodb.conditions import Key, Attr
import time
def lambda_handler(event, context):
    # TODO implement
    #print(cv2.__version__)
        #get the kvs stream
    kvs_client = boto3.client('kinesisvideo')
    kvs_datapoint = kvs_client.get_data_endpoint(
    StreamARN = 'arn:aws:kinesisvideo:us-west-2:162560567046:stream/LiveRekognitionVideoAnalysisBlog/1586042899601', # kinesis stream arn
    APIName = 'GET_MEDIA'
    )
    print(kvs_datapoint)
    endpoint = kvs_datapoint['DataEndpoint']
    kvsVideoClient = boto3.client('kinesis-video-media', endpoint_url=endpoint, region_name='us-west-2') # provide your region
    print(event)
    retRecord = event['Records'][0]
    payload = base64.b64decode(retRecord["kinesis"]["data"])
    payloadObject=json.loads(payload)
    fragNum = payloadObject["InputInformation"]["KinesisVideo"]["FragmentNumber"]
    print('testing')
    KVS_Stream = kvsVideoClient.get_media(
        StreamARN='arn:aws:kinesisvideo:us-west-2:162560567046:stream/LiveRekognitionVideoAnalysisBlog/1586042899601', # kinesis stream arn
        StartSelector={'StartSelectorType': 'FRAGMENT_NUMBER', 'AfterFragmentNumber': fragNum}
    )
    print(KVS_Stream)
    print('just inspection')
    with open('/tmp/streams.mkv', 'wb') as f:
        streamBody = KVS_Stream['Payload'].read(1024*2048)
        f.write(streamBody)
        # use openCV to get a frame
        cap = cv2.VideoCapture('/tmp/streams.mkv')
        print ('inside with loop of cv2')
        # Check to see if the frame has a recognizable person, using bounding box or median'th frame of the video
        ret, frame = cap.read()
        cv2.imwrite('/tmp/frame.jpg', frame)
        s3_client = boto3.client('s3')
        s3_client.upload_file(
            '/tmp/frame.jpg',
            'assignment-frame', # replace with your bucket name
            'frame.jpg'
        )
        cap.release()
        print('Image uploaded')
    rekognition = boto3.client('rekognition')
    s3 = boto3.resource(service_name='s3')
    bucket = s3.Bucket('assignment-kinesis') #all the valid faces are kept in this bucket
    targetResponse = requests.get('https://assignment-frame.s3-us-west-2.amazonaws.com/frame.jpg')
    targetResponseContent = targetResponse.content
    print(targetResponseContent)
    #print('after the error')
    recognizedImageKey = ''
    faceId = ''
    collectionId = 'rekVideoBlog3'
    for obj in bucket.objects.all():
        # Compare frame captured from webcam to the image in S3 bucket.
        #print (obj.name)
        print ('inside for loop')
        recognizedImageKey = obj.key
        print (obj.key)
        url = "https://{0}.s3-us-west-2.amazonaws.com/{1}".format("assignment-kinesis", obj.key)
        print (url)
        sourceResponse = requests.get(url)
        sourceResponseContent = sourceResponse.content
        print(sourceResponse)
        try:
            rekognitionResponse = rekognition.compare_faces(SourceImage={'Bytes': sourceResponseContent}, TargetImage={'Bytes': targetResponseContent})
            print(rekognitionResponse)
            rekognitionIndexResponse = rekognition.index_faces(CollectionId=collectionId, Image={ 'S3Object': {'Bucket':'assignment-kinesis','Name':recognizedImageKey} })
            print (rekognitionIndexResponse)
        except:
             return {
                'statusCode': 200,
                'body': json.dumps('Success')
            }
        for faceRecord in rekognitionIndexResponse['FaceRecords']:
            faceId = faceRecord['Face']['FaceId']

        faceMatchConfidence = 0

    #this is grabbing the confidence percentage of the person's face with the matches in the s3 bucket
        for eachFaceMatch in rekognitionResponse['FaceMatches']:
            faceMatchConfidence = int(eachFaceMatch['Face']['Confidence'])
        if faceMatchConfidence and faceMatchConfidence>70:
            break

    #if the confidence is within 70%, then we will accept that the face matches, and send them an OTP
    if faceMatchConfidence and faceMatchConfidence>70:
        print("A facematch exists!")
        print(faceId)
        otp=""
        for i in range(6):
            otp+=str(random.randint(1,9))
        print ("The One Time Password is: ")
        print (otp)
        expirationTime = time.time() + 300 #5 min TTL

        dynamoClient = boto3.resource('dynamodb')
        otpTable = dynamoClient.Table('passcodes')
        exists = otpTable.query(IndexName='faceId-index', KeyConditionExpression=Key('faceId').eq(faceId))
        if len(exists['Items'])!=0:
            print ("message already sent")
        else:
            otpTable.put_item(
                Item={
                    "uName": "Visitor",
                    "faceId" : faceId,
                    "otp" : int(otp),
                    "expirationTime" : int(expirationTime)}
            )
            visitors_table = dynamoClient.Table('visitors')
            visitorResponseData = visitors_table.query(KeyConditionExpression=Key('faceId').eq(faceId))
            item_list = visitorResponseData["Items"]
            visitor_data = item_list[0]
            phoneNumber = visitor_data["phoneNumber"]
            name = visitor_data["name"]
            photos = visitor_data["photos"]
            index_photo = photos[0]
            updatedKey = index_photo["objectKey"]
            photo = {'objectKey':'updatedKey' , 'bucket' : 'assignment-kinesis', 'createdTimeStamp' : int(time.time())}
            photos.append(photo)
            visitors_table.put_item(
                Item={
                        "name": name,
                        "faceId" : faceId,
                        "phoneNumber" : phoneNumber,
                        "photos" : photos
                    }
            )
            returningVisitor_arn = "arn:aws:sns:us-west-2:162560567046:returningvisitor"
            sns = boto3.client("sns")
            msg = "Your One Time Password is " + str(otp) + " Enter it in this link. " + "https://assignment-smart-door-visitor.s3-us-west-2.amazonaws.com/index.html"
            #+ "http://visitorui.s3-website-us-west-2.amazonaws.com"
            sub = "Your Smart Gate OTP"
            response = sns.publish(
            #TopicArn=returningVisitor_arn,
            PhoneNumber = phoneNumber,
            Message=msg,
            Subject=sub
            )
            print("sns sent" + json.dumps(response))

    else:
        print("faces dont MATCH")
        faceId = '-1'
        dynamoClient = boto3.resource('dynamodb')
        otpTable = dynamoClient.Table('passcodes')
        exists = otpTable.query(IndexName='faceId-index', KeyConditionExpression=Key('faceId').eq(faceId))
        if len(exists['Items'])!=0:
            print ("message already sent")
        else:
            #repeat = False
            newvisitor_arn = "arn:aws:sns:us-west-2:162560567046:newvisitor"
            sns = boto3.client("sns")
            msg = "1 unknown visitor " + "https://assignment-frame.s3-us-west-2.amazonaws.com/frame.jpg" + "\n To allow access enter details in the link " + "https://assignment-smart-door-owner.s3-us-west-2.amazonaws.com/index.html"
            sub = "Unknown Visitor Alert"
            response = sns.publish(
            TopicArn=newvisitor_arn,
            Message=msg,
            Subject=sub
            )
            otpTable.put_item(
                Item={
                    "uName": "Owner",
                    "faceId" : '-1',
                    "otp" : int(1),
                    "expirationTime" : int(100)}
            )
            print("sns sent" + json.dumps(response))

    print("exiting new visitor else")
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
