from flask import Flask, render_template
import pymongo
import scrape

conn="mongodb://localhost/27017"
client = pymongo.MongoClient(conn)
db=client.MarsDB
collection=db.marsdata
# @TODO: Initialize your Flask app here
# CODE GOES HERE

# @TODO:  Create a route and view function that takes in a string and renders index.html template
# CODE GOES HERE
app = Flask(__name__)

@app.route('/scrape')
def scrape():
	data=scrape.scrape_nasa
	db.collection.insert(data)
	return render_template('scrape.html')

@app.route('/')
def db_insert():
	data_=db.collection.find()[0]
	return render_template('index.html', data=data_)

if __name__ == "__main__":
    app.run(debug=True)
