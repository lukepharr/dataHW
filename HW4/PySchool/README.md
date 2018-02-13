

```python
import pandas as pd
import os
```


```python
school=os.path.join("school_data.csv")
student=os.path.join("student_data.csv")
school_df=pd.read_csv(school)
student_df=pd.read_csv(student)
```


```python
Dis_Sum=pd.DataFrame(data={"total schools":len(school_df),"total students":len(student_df),"total budget":school_df['budget'].sum(), "average math score":student_df['math_score'].mean(), "average reading score":student_df['reading_score'].mean(),"% passing math":len(student_df.loc[student_df['math_score']>69,:])/len(student_df)
,"% passing reading":len(student_df.loc[student_df['reading_score']>69,:])/len(student_df)}, index=[0])
Dis_Sum=Dis_Sum[["total students","total schools","total budget","average reading score","average math score","% passing reading","% passing math"]]
Dis_Sum["% overal passing rate"]=(Dis_Sum["% passing reading"]+Dis_Sum["% passing math"])/2

```


```python
school_scores_df=student_df.groupby(student_df['school']).mean().reset_index()
school_scores_df.columns=['name', 'Student ID', 'reading_score', 'math_score']
Sch_Sum=pd.merge(school_scores_df,school_df,how='outer',on='name')
Sch_Sum=Sch_Sum[['name','reading_score','math_score','School ID','type', 'size','budget']]


```


```python
grouped=student_df.groupby(student_df['school'])
m=[]
r=[]
for x in Sch_Sum['name']:
    m.append(len(grouped.get_group(x).loc[grouped.get_group(x)['math_score']>69,:])/len(grouped.get_group(x)))
    r.append(len(grouped.get_group(x).loc[grouped.get_group(x)['reading_score']>69,:])/len(grouped.get_group(x)))
Sch_Sum["% passed math"]=m
Sch_Sum["% passed reading"]=r
Sch_Sum["overall passing rate"]=(Sch_Sum["% passed math"]+Sch_Sum["% passed reading"])/2
Sch_Sum["per student budget"]=Sch_Sum["budget"]/Sch_Sum["size"]
```


```python
top_five_schools=Sch_Sum.sort_values('overall passing rate').tail()

```


```python
bottom_five_schools=Sch_Sum.sort_values('overall passing rate').head()

```


```python
sl=[]
n=[]
t=[]
e=[]
tw=[]
for x in Sch_Sum['name']:
    sl.append(x)
    n.append(grouped.get_group(x).groupby('grade').mean().iloc[3]['math_score'])
    t.append(grouped.get_group(x).groupby('grade').mean().iloc[0]['math_score'])
    e.append(grouped.get_group(x).groupby('grade').mean().iloc[1]['math_score'])
    tw.append(grouped.get_group(x).groupby('grade').mean().iloc[2]['math_score'])
avg_math_score_by_grade_and_school=pd.DataFrame({"9th Grade":n,"10th Grade":t,"11th Grade":e,"12th Grade":tw,"School":sl})


```


```python
sl=[]
n=[]
t=[]
e=[]
tw=[]
for x in Sch_Sum['name']:
    sl.append(x)
    n.append(grouped.get_group(x).groupby('grade').mean().iloc[3]['reading_score'])
    t.append(grouped.get_group(x).groupby('grade').mean().iloc[0]['reading_score'])
    e.append(grouped.get_group(x).groupby('grade').mean().iloc[1]['reading_score'])
    tw.append(grouped.get_group(x).groupby('grade').mean().iloc[2]['reading_score'])
avg_reading_score_by_grade_and_school=pd.DataFrame({"9th Grade":n,"10th Grade":t,"11th Grade":e,"12th Grade":tw,"School":sl})


```


```python
labels=["Low Spender","Intermediate Spender","High Spender","Extra High Spender"]
bins=[0,600,625,650,10000]
bindex=pd.cut(Sch_Sum['per student budget'],bins,labels=labels)
School_Spending_Bins=pd.DataFrame({"spending category":bindex,"average math score":Sch_Sum['math_score'],"average reading score":Sch_Sum['reading_score'],"% passed math":Sch_Sum['% passed math'],"% passed reading":Sch_Sum['% passed reading'],"overall passing rate":Sch_Sum['overall passing rate']})
School_Spending_Bins=School_Spending_Bins.groupby(School_Spending_Bins['spending category']).mean()

```


```python
labels=["Small","Medium","Large","Extra Large"]
bins=[0,1000,2000,4000,10000]
bindex=pd.cut(Sch_Sum['size'],bins,labels=labels)
School_Size_Bins=pd.DataFrame({"size":bindex,"average math score":Sch_Sum['math_score'],"average reading score":Sch_Sum['reading_score'],"% passed math":Sch_Sum['% passed math'],"% passed reading":Sch_Sum['% passed reading'],"overall passing rate":Sch_Sum['overall passing rate']})
School_Size_Bins=School_Size_Bins.groupby(School_Size_Bins['size']).mean()

```


```python
School_Type_Bins=Sch_Sum.groupby(Sch_Sum['type']).mean()
School_Type_Bins=School_Type_Bins[['reading_score','math_score','% passed math','% passed reading','overall passing rate']]
School_Type_Bins.columns=['average reading score','average math score','% passed math','% passed reading','overall passing rate']
```


```python
#District summary
Dis_Sum[["% passing reading","% passing math","% overal passing rate"]]=Dis_Sum[["% passing reading","% passing math","% overal passing rate"]]*100
Dis_Sum

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
      <th>total students</th>
      <th>total schools</th>
      <th>total budget</th>
      <th>average reading score</th>
      <th>average math score</th>
      <th>% passing reading</th>
      <th>% passing math</th>
      <th>% overal passing rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>39170</td>
      <td>15</td>
      <td>24649428</td>
      <td>81.87784</td>
      <td>78.985371</td>
      <td>85.805463</td>
      <td>74.980853</td>
      <td>80.393158</td>
    </tr>
  </tbody>
</table>
</div>




```python
#School Summary
Sch_Sum.columns=['school name','average math score','average math score','School ID','type','size','budget','% passed math','% passed reading','% overall passing rate','per student budget']
Sch_Sum[['% passed math','% passed reading','% overall passing rate']]=100*Sch_Sum[['% passed math','% passed reading','% overall passing rate']]
Sch_Sum
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
      <th>school name</th>
      <th>average math score</th>
      <th>average math score</th>
      <th>School ID</th>
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>% overall passing rate</th>
      <th>per student budget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Bailey High School</td>
      <td>81.033963</td>
      <td>77.048432</td>
      <td>7</td>
      <td>District</td>
      <td>4976</td>
      <td>3124928</td>
      <td>66.680064</td>
      <td>81.933280</td>
      <td>74.306672</td>
      <td>628.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Cabrera High School</td>
      <td>83.975780</td>
      <td>83.061895</td>
      <td>6</td>
      <td>Charter</td>
      <td>1858</td>
      <td>1081356</td>
      <td>94.133477</td>
      <td>97.039828</td>
      <td>95.586652</td>
      <td>582.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Figueroa High School</td>
      <td>81.158020</td>
      <td>76.711767</td>
      <td>1</td>
      <td>District</td>
      <td>2949</td>
      <td>1884411</td>
      <td>65.988471</td>
      <td>80.739234</td>
      <td>73.363852</td>
      <td>639.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Ford High School</td>
      <td>80.746258</td>
      <td>77.102592</td>
      <td>13</td>
      <td>District</td>
      <td>2739</td>
      <td>1763916</td>
      <td>68.309602</td>
      <td>79.299014</td>
      <td>73.804308</td>
      <td>644.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Griffin High School</td>
      <td>83.816757</td>
      <td>83.351499</td>
      <td>4</td>
      <td>Charter</td>
      <td>1468</td>
      <td>917500</td>
      <td>93.392371</td>
      <td>97.138965</td>
      <td>95.265668</td>
      <td>625.0</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Hernandez High School</td>
      <td>80.934412</td>
      <td>77.289752</td>
      <td>3</td>
      <td>District</td>
      <td>4635</td>
      <td>3022020</td>
      <td>66.752967</td>
      <td>80.862999</td>
      <td>73.807983</td>
      <td>652.0</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Holden High School</td>
      <td>83.814988</td>
      <td>83.803279</td>
      <td>8</td>
      <td>Charter</td>
      <td>427</td>
      <td>248087</td>
      <td>92.505855</td>
      <td>96.252927</td>
      <td>94.379391</td>
      <td>581.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Huang High School</td>
      <td>81.182722</td>
      <td>76.629414</td>
      <td>0</td>
      <td>District</td>
      <td>2917</td>
      <td>1910635</td>
      <td>65.683922</td>
      <td>81.316421</td>
      <td>73.500171</td>
      <td>655.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Johnson High School</td>
      <td>80.966394</td>
      <td>77.072464</td>
      <td>12</td>
      <td>District</td>
      <td>4761</td>
      <td>3094650</td>
      <td>66.057551</td>
      <td>81.222432</td>
      <td>73.639992</td>
      <td>650.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Pena High School</td>
      <td>84.044699</td>
      <td>83.839917</td>
      <td>9</td>
      <td>Charter</td>
      <td>962</td>
      <td>585858</td>
      <td>94.594595</td>
      <td>95.945946</td>
      <td>95.270270</td>
      <td>609.0</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Rodriguez High School</td>
      <td>80.744686</td>
      <td>76.842711</td>
      <td>11</td>
      <td>District</td>
      <td>3999</td>
      <td>2547363</td>
      <td>66.366592</td>
      <td>80.220055</td>
      <td>73.293323</td>
      <td>637.0</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Shelton High School</td>
      <td>83.725724</td>
      <td>83.359455</td>
      <td>2</td>
      <td>Charter</td>
      <td>1761</td>
      <td>1056600</td>
      <td>93.867121</td>
      <td>95.854628</td>
      <td>94.860875</td>
      <td>600.0</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Thomas High School</td>
      <td>83.848930</td>
      <td>83.418349</td>
      <td>14</td>
      <td>Charter</td>
      <td>1635</td>
      <td>1043130</td>
      <td>93.272171</td>
      <td>97.308869</td>
      <td>95.290520</td>
      <td>638.0</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Wilson High School</td>
      <td>83.989488</td>
      <td>83.274201</td>
      <td>5</td>
      <td>Charter</td>
      <td>2283</td>
      <td>1319574</td>
      <td>93.867718</td>
      <td>96.539641</td>
      <td>95.203679</td>
      <td>578.0</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Wright High School</td>
      <td>83.955000</td>
      <td>83.682222</td>
      <td>10</td>
      <td>Charter</td>
      <td>1800</td>
      <td>1049400</td>
      <td>93.333333</td>
      <td>96.611111</td>
      <td>94.972222</td>
      <td>583.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
top_five_schools.columns=['school name','average math score','average math score','School ID','type','size','budget','% passed math','% passed reading','% overall passing rate','per student budget']
top_five_schools[['% passed math','% passed reading','% overall passing rate']]=100*top_five_schools[['% passed math','% passed reading','% overall passing rate']]
top_five_schools
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
      <th>school name</th>
      <th>average math score</th>
      <th>average math score</th>
      <th>School ID</th>
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>% overall passing rate</th>
      <th>per student budget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>13</th>
      <td>Wilson High School</td>
      <td>83.989488</td>
      <td>83.274201</td>
      <td>5</td>
      <td>Charter</td>
      <td>2283</td>
      <td>1319574</td>
      <td>93.867718</td>
      <td>96.539641</td>
      <td>95.203679</td>
      <td>578.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Griffin High School</td>
      <td>83.816757</td>
      <td>83.351499</td>
      <td>4</td>
      <td>Charter</td>
      <td>1468</td>
      <td>917500</td>
      <td>93.392371</td>
      <td>97.138965</td>
      <td>95.265668</td>
      <td>625.0</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Pena High School</td>
      <td>84.044699</td>
      <td>83.839917</td>
      <td>9</td>
      <td>Charter</td>
      <td>962</td>
      <td>585858</td>
      <td>94.594595</td>
      <td>95.945946</td>
      <td>95.270270</td>
      <td>609.0</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Thomas High School</td>
      <td>83.848930</td>
      <td>83.418349</td>
      <td>14</td>
      <td>Charter</td>
      <td>1635</td>
      <td>1043130</td>
      <td>93.272171</td>
      <td>97.308869</td>
      <td>95.290520</td>
      <td>638.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Cabrera High School</td>
      <td>83.975780</td>
      <td>83.061895</td>
      <td>6</td>
      <td>Charter</td>
      <td>1858</td>
      <td>1081356</td>
      <td>94.133477</td>
      <td>97.039828</td>
      <td>95.586652</td>
      <td>582.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
bottom_five_schools.columns=['school name','average math score','average math score','School ID','type','size','budget','% passed math','% passed reading','% overall passing rate','per student budget']
bottom_five_schools[['% passed math','% passed reading','% overall passing rate']]=100*bottom_five_schools[['% passed math','% passed reading','% overall passing rate']]

bottom_five_schools
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
      <th>school name</th>
      <th>average math score</th>
      <th>average math score</th>
      <th>School ID</th>
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>% overall passing rate</th>
      <th>per student budget</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>10</th>
      <td>Rodriguez High School</td>
      <td>80.744686</td>
      <td>76.842711</td>
      <td>11</td>
      <td>District</td>
      <td>3999</td>
      <td>2547363</td>
      <td>66.366592</td>
      <td>80.220055</td>
      <td>73.293323</td>
      <td>637.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Figueroa High School</td>
      <td>81.158020</td>
      <td>76.711767</td>
      <td>1</td>
      <td>District</td>
      <td>2949</td>
      <td>1884411</td>
      <td>65.988471</td>
      <td>80.739234</td>
      <td>73.363852</td>
      <td>639.0</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Huang High School</td>
      <td>81.182722</td>
      <td>76.629414</td>
      <td>0</td>
      <td>District</td>
      <td>2917</td>
      <td>1910635</td>
      <td>65.683922</td>
      <td>81.316421</td>
      <td>73.500171</td>
      <td>655.0</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Johnson High School</td>
      <td>80.966394</td>
      <td>77.072464</td>
      <td>12</td>
      <td>District</td>
      <td>4761</td>
      <td>3094650</td>
      <td>66.057551</td>
      <td>81.222432</td>
      <td>73.639992</td>
      <td>650.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Ford High School</td>
      <td>80.746258</td>
      <td>77.102592</td>
      <td>13</td>
      <td>District</td>
      <td>2739</td>
      <td>1763916</td>
      <td>68.309602</td>
      <td>79.299014</td>
      <td>73.804308</td>
      <td>644.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
avg_math_score_by_grade_and_school
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
      <th>10th Grade</th>
      <th>11th Grade</th>
      <th>12th Grade</th>
      <th>9th Grade</th>
      <th>School</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>76.996772</td>
      <td>77.515588</td>
      <td>76.492218</td>
      <td>77.083676</td>
      <td>Bailey High School</td>
    </tr>
    <tr>
      <th>1</th>
      <td>83.154506</td>
      <td>82.765560</td>
      <td>83.277487</td>
      <td>83.094697</td>
      <td>Cabrera High School</td>
    </tr>
    <tr>
      <th>2</th>
      <td>76.539974</td>
      <td>76.884344</td>
      <td>77.151369</td>
      <td>76.403037</td>
      <td>Figueroa High School</td>
    </tr>
    <tr>
      <th>3</th>
      <td>77.672316</td>
      <td>76.918058</td>
      <td>76.179963</td>
      <td>77.361345</td>
      <td>Ford High School</td>
    </tr>
    <tr>
      <th>4</th>
      <td>84.229064</td>
      <td>83.842105</td>
      <td>83.356164</td>
      <td>82.044010</td>
      <td>Griffin High School</td>
    </tr>
    <tr>
      <th>5</th>
      <td>77.337408</td>
      <td>77.136029</td>
      <td>77.186567</td>
      <td>77.438495</td>
      <td>Hernandez High School</td>
    </tr>
    <tr>
      <th>6</th>
      <td>83.429825</td>
      <td>85.000000</td>
      <td>82.855422</td>
      <td>83.787402</td>
      <td>Holden High School</td>
    </tr>
    <tr>
      <th>7</th>
      <td>75.908735</td>
      <td>76.446602</td>
      <td>77.225641</td>
      <td>77.027251</td>
      <td>Huang High School</td>
    </tr>
    <tr>
      <th>8</th>
      <td>76.691117</td>
      <td>77.491653</td>
      <td>76.863248</td>
      <td>77.187857</td>
      <td>Johnson High School</td>
    </tr>
    <tr>
      <th>9</th>
      <td>83.372000</td>
      <td>84.328125</td>
      <td>84.121547</td>
      <td>83.625455</td>
      <td>Pena High School</td>
    </tr>
    <tr>
      <th>10</th>
      <td>76.612500</td>
      <td>76.395626</td>
      <td>77.690748</td>
      <td>76.859966</td>
      <td>Rodriguez High School</td>
    </tr>
    <tr>
      <th>11</th>
      <td>82.917411</td>
      <td>83.383495</td>
      <td>83.778976</td>
      <td>83.420755</td>
      <td>Shelton High School</td>
    </tr>
    <tr>
      <th>12</th>
      <td>83.087886</td>
      <td>83.498795</td>
      <td>83.497041</td>
      <td>83.590022</td>
      <td>Thomas High School</td>
    </tr>
    <tr>
      <th>13</th>
      <td>83.724422</td>
      <td>83.195326</td>
      <td>83.035794</td>
      <td>83.085578</td>
      <td>Wilson High School</td>
    </tr>
    <tr>
      <th>14</th>
      <td>84.010288</td>
      <td>83.836782</td>
      <td>83.644986</td>
      <td>83.264706</td>
      <td>Wright High School</td>
    </tr>
  </tbody>
</table>
</div>




```python
avg_reading_score_by_grade_and_school
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
      <th>10th Grade</th>
      <th>11th Grade</th>
      <th>12th Grade</th>
      <th>9th Grade</th>
      <th>School</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>80.907183</td>
      <td>80.945643</td>
      <td>80.912451</td>
      <td>81.303155</td>
      <td>Bailey High School</td>
    </tr>
    <tr>
      <th>1</th>
      <td>84.253219</td>
      <td>83.788382</td>
      <td>84.287958</td>
      <td>83.676136</td>
      <td>Cabrera High School</td>
    </tr>
    <tr>
      <th>2</th>
      <td>81.408912</td>
      <td>80.640339</td>
      <td>81.384863</td>
      <td>81.198598</td>
      <td>Figueroa High School</td>
    </tr>
    <tr>
      <th>3</th>
      <td>81.262712</td>
      <td>80.403642</td>
      <td>80.662338</td>
      <td>80.632653</td>
      <td>Ford High School</td>
    </tr>
    <tr>
      <th>4</th>
      <td>83.706897</td>
      <td>84.288089</td>
      <td>84.013699</td>
      <td>83.369193</td>
      <td>Griffin High School</td>
    </tr>
    <tr>
      <th>5</th>
      <td>80.660147</td>
      <td>81.396140</td>
      <td>80.857143</td>
      <td>80.866860</td>
      <td>Hernandez High School</td>
    </tr>
    <tr>
      <th>6</th>
      <td>83.324561</td>
      <td>83.815534</td>
      <td>84.698795</td>
      <td>83.677165</td>
      <td>Holden High School</td>
    </tr>
    <tr>
      <th>7</th>
      <td>81.512386</td>
      <td>81.417476</td>
      <td>80.305983</td>
      <td>81.290284</td>
      <td>Huang High School</td>
    </tr>
    <tr>
      <th>8</th>
      <td>80.773431</td>
      <td>80.616027</td>
      <td>81.227564</td>
      <td>81.260714</td>
      <td>Johnson High School</td>
    </tr>
    <tr>
      <th>9</th>
      <td>83.612000</td>
      <td>84.335938</td>
      <td>84.591160</td>
      <td>83.807273</td>
      <td>Pena High School</td>
    </tr>
    <tr>
      <th>10</th>
      <td>80.629808</td>
      <td>80.864811</td>
      <td>80.376426</td>
      <td>80.993127</td>
      <td>Rodriguez High School</td>
    </tr>
    <tr>
      <th>11</th>
      <td>83.441964</td>
      <td>84.373786</td>
      <td>82.781671</td>
      <td>84.122642</td>
      <td>Shelton High School</td>
    </tr>
    <tr>
      <th>12</th>
      <td>84.254157</td>
      <td>83.585542</td>
      <td>83.831361</td>
      <td>83.728850</td>
      <td>Thomas High School</td>
    </tr>
    <tr>
      <th>13</th>
      <td>84.021452</td>
      <td>83.764608</td>
      <td>84.317673</td>
      <td>83.939778</td>
      <td>Wilson High School</td>
    </tr>
    <tr>
      <th>14</th>
      <td>83.812757</td>
      <td>84.156322</td>
      <td>84.073171</td>
      <td>83.833333</td>
      <td>Wright High School</td>
    </tr>
  </tbody>
</table>
</div>




```python
School_Spending_Bins.columns=["% passed math","% passed reading","average math score","average reading score","% overall passing rate"]
School_Spending_Bins[['% passed math','% passed reading','% overall passing rate']]=100*School_Spending_Bins[['% passed math','% passed reading','% overall passing rate']]

School_Spending_Bins
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
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>average math score</th>
      <th>average reading score</th>
      <th>% overall passing rate</th>
    </tr>
    <tr>
      <th>spending category</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Extra High Spender</th>
      <td>66.218444</td>
      <td>81.089710</td>
      <td>76.959583</td>
      <td>81.058567</td>
      <td>73.654077</td>
    </tr>
    <tr>
      <th>High Spender</th>
      <td>71.112408</td>
      <td>83.453814</td>
      <td>78.032719</td>
      <td>81.416375</td>
      <td>77.283111</td>
    </tr>
    <tr>
      <th>Intermediate Spender</th>
      <td>93.993483</td>
      <td>96.542455</td>
      <td>83.595708</td>
      <td>83.930728</td>
      <td>95.267969</td>
    </tr>
    <tr>
      <th>Low Spender</th>
      <td>93.541501</td>
      <td>96.459627</td>
      <td>83.436210</td>
      <td>83.892196</td>
      <td>95.000564</td>
    </tr>
  </tbody>
</table>
</div>




```python
School_Size_Bins.columns=["% passed math","% passed reading","average math score","average reading score","% overall passing rate"]
School_Size_Bins[['% passed math','% passed reading','% overall passing rate']]=100*School_Size_Bins[['% passed math','% passed reading','% overall passing rate']]

School_Size_Bins

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
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>average math score</th>
      <th>average reading score</th>
      <th>% overall passing rate</th>
    </tr>
    <tr>
      <th>size</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Extra Large</th>
      <td>66.496861</td>
      <td>81.339570</td>
      <td>77.136883</td>
      <td>80.978256</td>
      <td>73.918215</td>
    </tr>
    <tr>
      <th>Large</th>
      <td>72.043261</td>
      <td>83.622873</td>
      <td>78.112137</td>
      <td>81.564235</td>
      <td>77.833067</td>
    </tr>
    <tr>
      <th>Medium</th>
      <td>93.599695</td>
      <td>96.790680</td>
      <td>83.374684</td>
      <td>83.864438</td>
      <td>95.195187</td>
    </tr>
    <tr>
      <th>Small</th>
      <td>93.550225</td>
      <td>96.099437</td>
      <td>83.821598</td>
      <td>83.929843</td>
      <td>94.824831</td>
    </tr>
  </tbody>
</table>
</div>




```python
School_Type_Bins.columns=["average reading score","average math score","% passed math","% passed reading","% overall passing rate"]
School_Type_Bins[['% passed math','% passed reading','% overall passing rate']]=100*School_Type_Bins[['% passed math','% passed reading','% overall passing rate']]

School_Type_Bins
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
      <th>average reading score</th>
      <th>average math score</th>
      <th>% passed math</th>
      <th>% passed reading</th>
      <th>% overall passing rate</th>
    </tr>
    <tr>
      <th>type</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Charter</th>
      <td>83.896421</td>
      <td>83.473852</td>
      <td>93.620830</td>
      <td>96.586489</td>
      <td>95.103660</td>
    </tr>
    <tr>
      <th>District</th>
      <td>80.966636</td>
      <td>76.956733</td>
      <td>66.548453</td>
      <td>80.799062</td>
      <td>73.673757</td>
    </tr>
  </tbody>
</table>
</div>




```python

```
