

```python
#dependencies
from citipy import citipy as cp
import pandas as pd
import matplotlib.pyplot as plt
import requests as req
import os 
import seaborn
import numpy as np

```


```python
#key stored a couple of folders back
key = open(os.path.join("../../api_weather.txt"))
```


```python
#save key
api_key=key.read()

```


```python
#lattitudes evenly from -90 to 90
lat=np.arange(-90,90,.18)
```


```python
#random longitudes from -180 to 180
lng=np.random.randint(low=-180, high=180, size=1000)
```


```python
#zip togehter
cord=list(zip(lat,lng))
```


```python
#find city names an countries nearest these coordinates as sample
cities=[]
cc=[]
for x in range(len(cord)):
    cities.append(cp.nearest_city(cord[x][0],cord[x][1]).city_name)
    cc.append(cp.nearest_city(cord[x][0],cord[x][1]).country_code)

```


```python
#call weather api and collect responses
weather=[]
for x in range(len(cc)):
    url="http://api.openweathermap.org/data/2.5/weather?q="+cities[x]+','+cc[x]+api_key
    weather.append(req.get(url).json())
```


```python
#sort out data from responses...
temp=[]
for x in range(len(weather)):
    if weather[x] == {'cod': '404', 'message': 'city not found'}:
        temp.append("NaN")
    else: temp.append(weather[x]['main']['temp'])

```


```python
humidity=[]
for x in range(len(weather)):
    if weather[x] == {'cod': '404', 'message': 'city not found'}:
        humidity.append("NaN")
    else: humidity.append(weather[x]['main']['humidity'])

```


```python
clouds=[]
for x in range(len(weather)):
    if weather[x] == {'cod': '404', 'message': 'city not found'}:
        clouds.append("NaN")
    else: clouds.append(weather[x]['clouds']['all'])

```


```python
windspeed=[]
for x in range(len(weather)):
    if weather[x] == {'cod': '404', 'message': 'city not found'}:
        windspeed.append("NaN")
    else: windspeed.append(weather[x]['wind']['speed'])

```


```python
latitude=[]
for x in range(len(weather)):
    if weather[x] == {'cod': '404', 'message': 'city not found'}:
        latitude.append("NaN")
    else: latitude.append(weather[x]['coord']['lat'])

```


```python
#organize data in pandas
weather_data=pd.DataFrame({'lat':latitude,'city':cities,'country':cc,'temp':temp,'humidity':humidity,'clouds':clouds,'windspeed':windspeed})
```


```python
weather_data.to_csv('weather_data.csv')

```


```python
#weather_data=pd.read_csv('weather_data.csv')
```


```python
#sample data
sample_df=weather_data.dropna().sample(n=500)
sample_df.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Unnamed: 0</th>
      <th>city</th>
      <th>clouds</th>
      <th>country</th>
      <th>humidity</th>
      <th>lat</th>
      <th>temp</th>
      <th>windspeed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>47</th>
      <td>47</td>
      <td>ushuaia</td>
      <td>75.0</td>
      <td>ar</td>
      <td>47.0</td>
      <td>-54.81</td>
      <td>288.150</td>
      <td>11.30</td>
    </tr>
    <tr>
      <th>733</th>
      <td>733</td>
      <td>laramie</td>
      <td>75.0</td>
      <td>us</td>
      <td>58.0</td>
      <td>41.31</td>
      <td>273.970</td>
      <td>3.10</td>
    </tr>
    <tr>
      <th>258</th>
      <td>258</td>
      <td>castro</td>
      <td>92.0</td>
      <td>cl</td>
      <td>82.0</td>
      <td>-42.48</td>
      <td>290.283</td>
      <td>1.67</td>
    </tr>
    <tr>
      <th>687</th>
      <td>687</td>
      <td>yabrud</td>
      <td>0.0</td>
      <td>sy</td>
      <td>47.0</td>
      <td>33.97</td>
      <td>287.150</td>
      <td>1.02</td>
    </tr>
    <tr>
      <th>457</th>
      <td>457</td>
      <td>atambua</td>
      <td>36.0</td>
      <td>id</td>
      <td>100.0</td>
      <td>-9.11</td>
      <td>298.608</td>
      <td>0.52</td>
    </tr>
  </tbody>
</table>
</div>




```python
#plot!
plt.scatter(x=sample_df['lat'],y=sample_df['temp'])
plt.xlabel('Latitude')
plt.ylabel('Temperature (K)')
plt.title("Latitude vs Temperature")
plt.savefig('Latitude vs Temperature.png')
plt.show()

```


![png](output_17_0.png)



```python
plt.scatter(x=sample_df['lat'],y=sample_df['humidity'])
plt.xlabel('Latitude')
plt.ylabel('Humidity (%)')
plt.title("Latitude vs Humidity ")
plt.savefig('Latitude vs Humidity.png')
plt.show()

```


![png](output_18_0.png)



```python
plt.scatter(x=sample_df['lat'],y=sample_df['clouds'])
plt.xlabel('Latitude')
plt.ylabel('Clouds')
plt.title("Latitude vs Clouds")
plt.savefig('Latitude vs Clouds.png')
plt.show()

```


![png](output_19_0.png)



```python
plt.scatter(x=sample_df['lat'],y=sample_df['windspeed'])
plt.xlabel('Latitude')
plt.ylabel('Windspeed (MPH)')
plt.title("Latitude vs Windspeed")
plt.savefig('Latitude vs Windspeed.png')
plt.show()

```


![png](output_20_0.png)



```python

```
