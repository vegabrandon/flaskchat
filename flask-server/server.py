from flask import Flask, render_template, redirect, request, session, send_from_directory
from flask_session import Session
import os
from pymongo import MongoClient

# Flask Server
app = Flask(__name__, static_folder='../client/public')

# MongoDB Client
client = MongoClient('localhost', 27017)
db = client.flask_db
users = db.users

# API Route in Flask
@app.route('/test', methods=['GET'])

def test():
  return {"test": {"test": "test"}}

@app.route('/users', methods=['POST'])
def users():
   if request.method=='POST':
      


if __name__ == "__main__":
    app.run(debug=True)