from flask import Flask, request, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_HOST = os.getenv("MONGO_HOST")

client = MongoClient(
    f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}@{MONGO_HOST}:27017/"
)

db = client["taskdb"]
tasks = db["tasks"]


@app.route("/")
def home():
    return {"message": "Task API Running"}


@app.route("/tasks", methods=["GET"])
def get_tasks():
    task_list = []

    for task in tasks.find({}, {"_id": 0}):
        task_list.append(task)

    return jsonify(task_list)


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.json

    task = {
        "title": data["title"]
    }

    tasks.insert_one(task)

    return {"message": "Task created"}, 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
