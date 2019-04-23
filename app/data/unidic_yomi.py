# coding:utf-8

import re
import os
import glob

re_pair = re.compile('^([ァ-ンー]+)\-([a-zA-Z \'\-\(\)]+)')
UNIDIC_PATH = './unidic-mecab_kana-accent-2.1.2_src'

with open('result.tsv', 'w') as out_fd:
    for csvfile in glob.glob(os.path.join(UNIDIC_PATH, '*.csv')):
        with open(csvfile) as dic_fd:
            prev_alphabets = prev_yomi = ''
            for line in dic_fd:
                columns = line.split(',')
                for (yomi, alphabets) in re_pair.findall(columns[11]):
                    if prev_alphabets == alphabets and len(yomi) <= len(prev_yomi):
                        pass
                    else:
                        out_fd.write('%s\t%s\n' % (alphabets.lower(), yomi))
                    prev_alphabets = alphabets
                    prev_yomi = yomi