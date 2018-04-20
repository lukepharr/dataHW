#dependencies
import time 
import requests as req
import pandas as pd
from bs4 import BeautifulSoup as bs


def path_maker():
	from splinter import Browser
	executable_path = {'executable_path': 'chromedriver'}
	return Browser('chrome', **executable_path, headless=False)


def scrape_nasa():
	#fetching all news items (including the first)
	browser=path_maker()
	url='https://mars.nasa.gov/news'
	browser.visit(url)
	time.sleep(1)
	html=browser.html
	soup=bs(html, 'lxml')
	results=soup.find_all('li', class_='slide')
	title=[]
	teaser=[]
	for x in results:
	    title.append(x.find('div', class_='content_title').text)
	    teaser.append(x.find('div', class_='article_teaser_body').text)
	first_title=title[0]
	first_teaser=teaser[0]

	#fetching featured image url
	url='https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
	browser.visit(url)
	time.sleep(1)
	result=browser.find_by_id('full_image')
	image_url="https://www.jpl.nasa.gov/"+result["data-fancybox-href"]

	#fetching most recent weather report
	url='https://twitter.com/marswxreport?lang=en'
	browser.visit(url)
	time.sleep(1)
	soup=bs(browser.html,'lxml')
	weather_tweet=soup.find('p', class_='TweetTextSize TweetTextSize--normal js-tweet-text tweet-text').text

	#fetching mars facts
	url='https://space-facts.com/mars/'
	soup=bs(req.get(url).text,'lxml')
	result=soup.find('table', class_="tablepress tablepress-id-mars").find_all('tr')
	dict={}
	for x in result:
	    dict[x.find('td', class_='column-1').text] = x.find('td', class_='column-2').text
	df=pd.DataFrame(dict, index=[0])
	#converting to html bound string
	facts_html=df.to_html

	#collect download urls for hemispheres
	download_urls=[]
	url='https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
	browser.visit(url)
	time.sleep(1)
	for i in range(4):
	    mask=browser.find_by_css('.description')[i]
	    browser.find_by_css('h3')[i].click()
	    time.sleep(1)
	    dict_entry={'title': browser.find_by_css('h2.title').text.split(' Enhanced')[0], 'url': browser.find_by_text('Original')['href']}
	    download_urls.append(dict_entry)
	    browser.back()
	    time.sleep(1)

	#create result dictionary
	result_dict={'first_news_title': first_title, 'first_news_teaser_body': first_teaser, 'featured_image':image_url, 'weather': weather_tweet,\
	'facts_table': facts_html}
	for x in download_urls:
		result_dict.update(x)

	return result_dict 


