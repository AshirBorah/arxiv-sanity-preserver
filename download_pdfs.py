import os
import time
import pickle
import shutil
import random
from  urllib.request import urlopen
from multiprocessing.pool import ThreadPool
import threading
import queue

from utils import Config

def download_pdf(pid,j):
  global numtot
  global numok
  pdf_url = j['links']
  print(pdf_url)
  #assert len(pdfs) == 1
  basename = pdf_url.split('/')[-1]
  print(basename)
  fname = os.path.join(Config.pdf_dir, basename)

  # try retrieve the pdf
  numtot += 1
  try:
    if not basename in have:
      print('fetching %s into %s' % (pdf_url, fname))
      req = urlopen(pdf_url, None, timeout_secs)
      with open(fname, 'wb') as fp:
          shutil.copyfileobj(req, fp)
      time.sleep(0.05 + random.uniform(0,0.1))
    else:
      print('%s exists, skipping' % (fname, ))
    numok+=1
  except Exception as e:
    print('error downloading: ', pdf_url)
    print(e)
  return pdf_url

  print('%d/%d of %d downloaded ok.' % (numok, numtot, len(db)))

timeout_secs = 10 # after this many seconds we give up on a paper
if not os.path.exists(Config.pdf_dir): os.makedirs(Config.pdf_dir)
have = set(os.listdir(Config.pdf_dir)) # get list of all pdfs we already have

numok = 0
numtot = 0
db = pickle.load(open(Config.db_path, 'rb'))
# for pid,j in db.items():
#     threading.Thread(target=download_pdf, args=(pid, j)).start()

def worker():
    while True:
        item= q.get()
        download_pdf(item[0], item[1])
        q.task_done()

num_worker_threads = 8

q = queue.Queue()
for i in range(num_worker_threads):
     t = threading.Thread(target=worker)
     t.daemon = True
     t.start()

for pid,j in db.items():
    q.put((pid,j))

q.join()

#
# for pid,j in db.items():
#     ThreadPool(8).imap_unordered(download_pdf, db.items())
#     download_pdf(pid,j)




print('final number of papers downloaded okay: %d/%d' % (numok, len(db)))
