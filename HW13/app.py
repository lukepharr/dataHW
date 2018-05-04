from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import (
    Flask,
    render_template,
    jsonify)
import pandas as pd
import numpy as np 

engine = create_engine("sqlite:///belly_button_biodiversity.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)
Samples = Base.classes.samples
Metadata = Base.classes.samples_metadata
OTU = Base.classes.otu
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

@app.route("/")
def home():
	return render_template("index.html")

@app.route("/names")
def names():
	data_ = session.query(Samples).statement
	df_names=pd.read_sql_query(data_,session.bind)
	return jsonify(list(df_names))

@app.route("/otu")
def otu():
	data_1 = session.query(OTU).statement
	df_otu=pd.read_sql_query(data_1,session.bind)
	return jsonify(list(df_otu['lowest_taxonomic_unit_found']))
	
@app.route('/metadata/<sample>')
def metadatas(sample):
	sample = sample.replace('BB_', '')
	data_2 = session.query(Metadata).statement
	df_meta = pd.read_sql_query(data_2, session.bind)
	metadata = df_meta.loc[df_meta['SAMPLEID']==int(sample)].to_json(orient='records')
	return metadata

@app.route('/wfreq/<sample>')
def wfreqfunc(sample):
	sample = sample.replace('BB_', '')
	data_2 = session.query(Metadata).statement
	df_meta1 = pd.read_sql_query(data_2, session.bind)
	wfreq_data = df_meta1.loc[df_meta1['SAMPLEID']==int(sample)]['WFREQ']\
	.to_json(orient='records')
	return 'washing frequency is ' + wfreq_data

@app.route('/samples/<sample>')
def otu_and_samples(sample):
	data_3 = session.query(Samples).statement
	df_samples_0 = pd.read_sql_query(data_3, session.bind)[["otu_id",sample]]\
	.sort_values(by=[sample],ascending=False)[sample]
	df_samples_1 = pd.read_sql_query(data_3, session.bind)[["otu_id",sample]]\
	.sort_values(by=[sample],ascending=False)['otu_id']
	return jsonify([{'otu_ids':df_samples_1.tolist(),'sample_values':df_samples_0.tolist()}])

if __name__ == "__main__":
	app.run(debug=True)

