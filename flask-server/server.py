from flask import Flask, render_template, redirect, request, Response, session, send_from_directory
from flask_session import Session
import os
from pymongo import MongoClient
from flask_cors import CORS
import json
from bson import ObjectId

class JSONEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, ObjectId):
      return str(o)
    return json.JSONEncoder.default(self, o)

# Flask Server
app = Flask(__name__)
CORS(app)

# MongoDB Client
client = MongoClient('localhost', 27017)
db = client.flask_db
userCollection = db.userCollection
messageCollection = db.messageCollection
# API Route in Flask Example
@app.route('/test', methods=['GET'])

def test():
  return {"test": {"test": "test"}}

@app.route('/users', methods=['POST'])
# @crossdomain(origin='*')
async def users():
  try:
    userCollection.insert_one({'username': request.json['username'], 'password': request.json['password']})
    currentUser = userCollection.find_one({'username': request.json['username']})
    if currentUser:
      return { "username": currentUser['username'] }
  except:
    return "Username taken", 400


@app.route('/login', methods=['POST'])
# @crossdomain(origin='*')
async def login():
  currentUser = userCollection.find_one({'username': request.json['username']})
  if currentUser and currentUser['password'] == request.json['password']:
    return { "username": currentUser['username'] }
  else:
    return "Record not found", 400

@app.route('/messages', methods=['GET', 'POST'])
def messages():
  if request.method == 'POST':
    messageCollection.insert_one({'body': request.json['body'], 'username': request.json['username']})
    documents = messageCollection.find()
    msgArr = []
    for doc in documents:
      msgArr.append({'_id': str(doc['_id']), 'body': str(doc['body']), 'username': str(doc['username'])})
    return msgArr
  else:
    documents = messageCollection.find()
    msgArr = []
    for doc in documents:
      msgArr.append({'_id': str(doc['_id']), 'body': str(doc['body']), 'username': str(doc['username'])})
    return msgArr



if __name__ == "__main__":
    app.run(debug=True)