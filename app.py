from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)


@app.route("/", methods=["POST", "GET"])
@cross_origin()
def index():
    if request.method == "POST":
        data = json.loads(request.data)
        # print(data["query"])
        # print(data["items"])
        mydata = [1, 2]
        return jsonify({"ans": mydata}), 200
    else:
        return jsonify({"test": "-1"}), 200