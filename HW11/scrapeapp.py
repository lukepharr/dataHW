from flask import Flask, render_template
import pymongo
import scraper

conn="mongodb://localhost/27017"
client = pymongo.MongoClient(conn)
db=client.MarsDB
collection=db.marsdata

app = Flask(__name__)

@app.route('/')
def db_insert():
	data_=list(db.collection.find())
	return render_template('index.html', data=data_)

@app.route('/scrape')
def scrape():
	db.collection.remove()
	data_mars=scraper.scrape_nasa()
	db.collection.insert(data_mars)
	return render_template('scrape.html')

if __name__ == "__main__":
    app.run(debug=True)
