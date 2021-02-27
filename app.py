from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def index():
    return request.method


if __name__ == "__main__":
    app.run(debug=True)