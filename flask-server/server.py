from flask import Flask;

app = Flask(__name__)

# API Route in Flask

@app.route('/test', methods=['GET'])
def test():
    return {"test": {"test": "test"}}

if __name__ == "__main__":
    app.run(debug=True)