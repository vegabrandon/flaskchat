from flask import Flask, render_template, redirect, request, session, send_from_directory
from flask_session import Session
import os
from pymongo import MongoClient

# Flask Server
app = Flask(__name__, static_folder='../client/public')

# MongoDB Client
client = MongoClient('localhost', 27017)
db = client.flask_db
userCollection = db.userCollection

# API Route in Flask
@app.route('/test', methods=['GET'])

def test():
  return {"test": {"test": "test"}}

@app.route('/users', methods=['POST'])
async def users():
  userCollection.insert_one({'username': request.json['username'], 'password': request.json['password']})
  return {}

@app.route('/login', methods=['POST'])
async def login():
  currentUser = userCollection.find_one({'username': request.json['username']})
  if currentUser['password'] == request.json['password']:
    return { "username": currentUser.username }
  else:
    return "Record not found", 400


if __name__ == "__main__":
    app.run(debug=True)