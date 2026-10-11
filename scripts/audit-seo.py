import json, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote, urljoin
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(); self.meta={}; self.links=[]; self.alts={}; self.ids=set(); self.h1=[]; self.title=''; self.canonical=''; self.lang=''; self.active=''; self.json=[]; self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a: self.ids.add(a['id'])
  if tag=='html': self.lang=a.get('lang')
  if tag=='meta': self.meta[a.get('name','')]=a.get('content','')
  if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
  if tag=='link' and a.get('rel')=='alternate' and a.get('hreflang'): self.alts[a['hreflang']]=a['href']
  if tag=='a' and a.get('href'): self.links.append(a['href'])
  if tag in ['h1','title']: self.active=tag
  if tag=='script' and a.get('type')=='application/ld+json': self.active='json'
 def handle_endtag(self,tag):
  if tag in ['h1','title','script']: self.active=''
 def handle_data(self,data):
  if self.active=='h1': self.h1.append(data)
  if self.active=='title': self.title+=data
  if self.active=='json': self.json.append(json.loads(data))
root=Path('dist'); pages={('/'+str(p.relative_to(root)).replace('index.html','')):Page(p.read_text()) for p in root.rglob('*.html')}
issues=[]; duplicates={}; main=['/de/','/de/services/business-websites/','/de/services-pricing/']
for path,p in pages.items():
 if 'noindex' in p.meta.get('robots',''): continue
 if len(p.h1)!=1: issues.append({'page':path,'type':'h1-count','value':len(p.h1)})
 if not p.meta.get('description'): issues.append({'page':path,'type':'missing-description'})
 duplicates.setdefault(p.title,[]).append(path)
 for lang,target in p.alts.items():
  if lang=='x-default': continue
  t=pages.get(urlparse(target).path)
  if not t: issues.append({'page':path,'type':'missing-alternate','target':target})
  elif p.canonical not in t.alts.values(): issues.append({'page':path,'type':'nonreciprocal-alternate','target':target})
  if lang=='cz': issues.append({'page':path,'type':'invalid-language'})
 for href in p.links:
  u=urlparse(urljoin('https://websiteli.ch'+path,href))
  if u.netloc!='websiteli.ch': continue
  t=pages.get(u.path if u.path.endswith('/') else u.path+'/')
  asset=root/u.path.lstrip('/')
  if not t and not asset.exists(): issues.append({'page':path,'type':'broken-link','target':href})
  elif u.fragment and t and unquote(u.fragment) not in t.ids: issues.append({'page':path,'type':'broken-anchor','target':href})
result={'html_pages':len(pages),'issues':issues,'duplicate_titles':{k:v for k,v in duplicates.items() if len(v)>1},'priority_pages':{path:{'title':pages[path].title,'description':pages[path].meta.get('description'),'h1':pages[path].h1,'canonical':pages[path].canonical,'lang':pages[path].lang} for path in main}}
Path('docs/seo-audit-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
print(json.dumps({'pages':len(pages),'issues':len(issues),'issue_types':{k:sum(i['type']==k for i in issues) for k in set(i['type'] for i in issues)},'priority_issues':[i for i in issues if i['page'] in main]},indent=2))
