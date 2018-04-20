from flask import Flask, render_template
import pymongo

conn="mongodb://localhost/27017"
client = pymongo.MongoClient(conn)
db=client.MarsDB
# @TODO: Initialize your Flask app here
# CODE GOES HERE

# @TODO:  Create a route and view function that takes in a string and renders index.html template
# CODE GOES HERE
app = Flask(__name__)

@app.route('/scrape')
def scrape():
	import scrape
	db.MarsDB.insert(scrape_nasa)

if __name__ == "__main__":
    app.run(debug=True)
