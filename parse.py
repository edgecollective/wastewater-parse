import requests
from bs4 import BeautifulSoup
import camelot
import pandas as pd

url = 'https://www.mwra.com/biobot/biobotdata.htm'
data_url = ''
reqs = requests.get(url)
soup = BeautifulSoup(reqs.text, 'html.parser')

urls = []
for link in soup.find_all('a'):
    #print('trick')
    this_link=link.get('href')
    if (this_link != None):
        #print(link.get('href'))
        if (this_link.find('-data') != -1):
            #print("got it!")
            data_url='https://www.mwra.com/biobot/'+this_link

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
    #print(df.tail)
    print(df.Date) 
    unixtime=pd.to_datetime(df.Date).astype(int) / 10**9
    df.insert(0, "timestamp", unixtime, True)
    #dates = df['Date'].to_list()
    #northern = df['Northern'].to_list()
    #southern = df['Southern'].to_list()
    df.to_csv('waste.csv',index=False)
