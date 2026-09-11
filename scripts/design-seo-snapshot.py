"""Read-only SEO regression snapshot for a graphical release (stdlib only)."""
import argparse
import concurrent.futures
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
from xml.etree import ElementTree

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta={};self.canonical='';self.title='';self.h1=[];self.links=set();self.schemas=[];self.stack=[];self.buffer='';self.mode=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta' and a.get('name') in ['description','robots']:self.meta[a['name']]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href','')
        if tag=='a' and a.get('href','').startswith('/'):self.links.add(a['href'])
        if tag in ['title','h1'] or tag=='script' and a.get('type')=='application/ld+json':self.mode=tag;self.buffer=''
    def handle_data(self,data):
        if self.mode:self.buffer+=data
    def handle_endtag(self, tag):
        if self.mode==tag:
            content=re.sub(r'\s+',' ',self.buffer).strip()
            if tag=='title':self.title=content
            elif tag=='h1':self.h1.append(content)
            elif tag=='script':self.schemas.append(json.loads(self.buffer))
            self.mode=None;self.buffer=''

def get(url):
    with urlopen(Request(url,headers={'User-Agent':'IAvarone-Design-SEO-Check/1.0'}),timeout=45) as response:return response.status,response.read().decode()

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--base',required=True);parser.add_argument('--output',required=True);parser.add_argument('--compare');parser.add_argument('--extra-paths');args=parser.parse_args()
    base=args.base.rstrip('/');_,sitemap=get(base+'/sitemap.xml')
    paths=sorted({urlsplit(e.text).path or '/' for e in ElementTree.fromstring(sitemap).iter() if e.tag.endswith('loc')})
    sitemap_paths=paths.copy()
    if args.extra_paths:paths=sorted(set(paths)|set(json.loads(Path(args.extra_paths).read_text())))
    def capture(path):
        status,html=get(base+path);p=Page();p.feed(html)
        return {'path':path,'status':status,'title':p.title,'h1':p.h1,'canonical':p.canonical,'meta':p.meta,'internalLinks':sorted(p.links),'schemas':p.schemas}
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=list(pool.map(capture,paths))
    resources={}
    for path in ['/robots.txt','/llms.txt','/llms-full.txt','/pricing.md']:
        status,body=get(base+path);resources[path]={'status':status,'sha256':hashlib.sha256(body.encode()).hexdigest()}
    result={'base':base,'pages':pages,'resources':resources,'sitemapPaths':sitemap_paths}
    if args.compare:
        before=json.loads(Path(args.compare).read_text());old={p['path']:p for p in before['pages']};changes=[]
        if before.get('sitemapPaths',sitemap_paths)!=sitemap_paths:changes.append({'field':'sitemapRoutes'})
        if set(old)!=set(paths):changes.append({'field':'routes','before':sorted(old),'after':paths})
        for page in pages:
            previous=old.get(page['path'])
            if not previous:continue
            for key in ['status','title','h1','canonical','meta','schemas']:
                if previous[key]!=page[key]:changes.append({'path':page['path'],'field':key})
            missing=set(previous['internalLinks'])-set(page['internalLinks'])
            if missing:changes.append({'path':page['path'],'field':'removedInternalLinks','links':sorted(missing)})
        for path in resources:
            if before['resources'][path]!=resources[path]:changes.append({'path':path,'field':'resource'})
        result['changes']=changes
    Path(args.output).parent.mkdir(parents=True,exist_ok=True);Path(args.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'pages':len(pages),'resources':len(resources),'changes':result.get('changes',[])},ensure_ascii=False))
    if result.get('changes'):raise SystemExit(1)

if __name__=='__main__':main()
