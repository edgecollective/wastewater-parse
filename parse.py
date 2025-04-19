import requests
from bs4 import BeautifulSoup
import camelot
import pandas as pd

url = 'https://www.mwra.com/biobot/biobotdata.htm'
data_url = ''
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')

data_suffix=''

urls = []
for link in soup.find_all('a'):
    #print('trick')
    this_link=link.get('href')
    if (this_link != None):
        #print(link.get('href'))
        if (this_link.find('-data') != -1):
            #print("got it!")
            data_suffix=this_link 

data_url='https://www.mwra.com'+data_suffix
print("data_suffix=",data_suffix)
print("data_url=",data_url)

if len(data_url)==0:
    print('no data url found')
else:

    tables = camelot.read_pdf(data_url, pages = "1-end")
    frames=[]
    for i in range(0,len(tables)):
        frames.append(tables[i].df)
    df = pd.concat(frames)
    df = df[1:]
    df.columns = ['Date','Southern','Northern','Southern_7','Northern_7','Southern_low','Southern_high','Northern_low','Northern_high','Southern_variant','Northern_variant']
    # drop last nonsense rows
    dates=df['Date'].to_numpy()
    index=len(dates)
    for i in range(0,len(dates)):
        #print(dates[i])
        if len(dates[i])>20:
            index=i
            break
    df=df.head(index)
    unixtime=pd.to_datetime(df.Date).astype(int) / 10**9
    df.insert(0, "timestamp", unixtime, True)
    #dates = df['Date'].to_list()
    #northern = df['Northern'].to_list()
    #southern = df['Southern'].to_list()
    df.to_csv('waste.csv',index=False)
