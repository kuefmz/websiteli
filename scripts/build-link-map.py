import csv
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlparse
class Links(HTMLParser):
 def __init__(self,text):
  super().__init__();self.href=None;self.text=[];self.rows=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  if tag=='a':self.href=dict(attrs).get('href');self.text=[]
 def handle_data(self,data):
  if self.href:self.text.append(data)
 def handle_endtag(self,tag):
  if tag=='a' and self.href:self.rows.append((self.href,' '.join(' '.join(self.text).split())));self.href=None
rows=set()
for p in Path('dist/de').rglob('*.html'):
 source='/'+str(p.relative_to('dist')).replace('index.html','')
 for href,anchor in Links(p.read_text()).rows:
  u=urlparse(urljoin('https://websiteli.ch'+source,href))
  if u.netloc!='websiteli.ch':continue
  if not any(k in u.path for k in ['/services/','/services-pricing/','/portfolio/','/contact/','/blog/small-business-website/']):continue
  dest=u.path+('?' + u.query if u.query else '')+('#' + u.fragment if u.fragment else '')
  purpose='Commercial service discovery' if '/services/' in dest else 'Budget and scope qualification' if '/services-pricing/' in dest else 'Genuine project evidence' if '/portfolio/' in dest else 'Quote/review enquiry' if '/contact/' in dest else 'Buyer preparation'
  rows.add((source,dest,anchor,purpose))
with Path('docs/internal-linking-map.csv').open('w') as f:
 writer=csv.writer(f, lineterminator="\n");writer.writerow(['source_page','destination_page','anchor_text','seo_purpose']);writer.writerows(sorted(rows))
print(f'{len(rows)} rendered German internal links mapped')
