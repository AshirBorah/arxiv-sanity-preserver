"""
Queries arxiv API and downloads papers (the query is a parameter).
The script is intended to enrich an existing database pickle (by default db.p),
so this file will be loaded first, and then new results will be added to it.
"""

import os
import time
import pickle
import random
import argparse
import urllib.request
import feedparser
import json

from utils import Config, safe_pickle_dump, add_pdf_url_to_record

def encode_feedparser_dict(d):
  """
  helper function to get rid of feedparser bs with a deep copy.
  I hate when libs wrap simple things in their own classes.
  """
  if isinstance(d, feedparser.FeedParserDict) or isinstance(d, dict):
    j = {}
    for k in d.keys():
      j[k] = encode_feedparser_dict(d[k])
    return j
  elif isinstance(d, list):
    l = []
    for k in d:
      l.append(encode_feedparser_dict(k))
    return l
  else:
    return d

def parse_arxiv_url(url):
  """
  examples is http://arxiv.org/abs/1512.08756v2
  we want to extract the raw id and the version
  """
  ix = url.rfind('/')
  idversion = url[ix+1:] # extract just the id (and the version)
  parts = idversion.split('v')
  assert len(parts) == 2, 'error parsing url ' + url
  return parts[0], int(parts[1])

if __name__ == "__main__":

  # parse input arguments
  parser = argparse.ArgumentParser()
  parser.add_argument('--start_date', type=str, default='2020-02-01', help='The start date of query in YYYY-MM-DD format')
  parser.add_argument('--end_date', type=str, default='2020-02-02', help='The end date of query in YYYY-MM-DD format')
  parser.add_argument('--start_index', type=int, default=0, help='start index of the search')
  parser.add_argument('--results-per-iteration', type=int, default=100, help='passed to biorxiv API')
  parser.add_argument('--wait-time', type=float, default=1.0, help='lets be gentle to arxiv API (in number of seconds)')
  parser.add_argument('--break-on-no-added', type=int, default=0, help='break out early if all returned query papers are already in db? 1=yes, 0=no')
  args = parser.parse_args()

  # misc hardcoded variables
  base_url = 'https://api.biorxiv.org/detail/' # base api query url
  print('Searching arXiv from %s to %s' % (args.start_date, args.end_date))

  # lets load the existing database to memory
  try:
    db = pickle.load(open(Config.db_path, 'rb'))
  except Exception as e:
    print('error loading existing database:')
    print(e)
    print('starting from an empty database')
    db = {}

  # -----------------------------------------------------------------------------
  # main loop where we fetch the new results
  print('Database has %d entries at start' % (len(db), ))
  num_added_total = 0


  query = '%s/%s/%i' % (args.start_date,args.end_date,args.start_index)

  print(base_url+query)
  with urllib.request.urlopen(base_url+query) as url:
      response = json.load(url)

  print(response['messages'])
  print(response['messages'][0])
  total_responses = int(response['messages'][0]['total'])
  print("Got %i entries" % (total_responses))

  num_added = 0
  num_skipped = 0

  for index in range(args.start_index,total_responses,100):
      query = '%s/%s/%i' % (args.start_date,args.end_date,index)
      # print(base_url+query)
      with urllib.request.urlopen(base_url+query) as url:
          # print(url)
          response = json.load(url)

      for entry in response['collection']:

          entry = add_pdf_url_to_record(entry)
          # extract just the raw arxiv id and version for this paper

          entry_doi = entry['doi']
          entry['version'] = int(entry['version'])
          print(entry)
          break

          # add to our database if we didn't have it before, or if this is a new version
          if not entry['doi'] in db or int(entry['version']) > int(db[entry_doi]['version']):
            db[entry_doi] = entry
            print('Updated %s added v%s' % (entry['title'], entry['version']))
            num_added += 1
            num_added_total += 1
          else:
            num_skipped += 1

      # print some information
      print('Added %d papers of %d in this query, already had %d. Current index %d' % (num_added, total_responses, num_skipped, index))

      if len(response['collection']) == 0:
        print('Received no results from arxiv. Rate limiting? Exiting. Restart later maybe.')
        break

      if num_added == 0 and args.break_on_no_added == 1:
        print('No new papers were added. Assuming no new papers exist. Exiting.')
        break

      print('Sleeping for %i seconds' % (args.wait_time , ))
      time.sleep(args.wait_time + random.uniform(0, 1))

      if num_added_total >0 and index%5000==0:
        print('Saving database with %d papers to %s' % (len(db), Config.db_path))
        safe_pickle_dump(db, Config.db_path)

  # save the database before we quit, if we found anything new
  if num_added_total >0:
    print('Saving database with %d papers to %s' % (len(db), Config.db_path))
    safe_pickle_dump(db, Config.db_path)
