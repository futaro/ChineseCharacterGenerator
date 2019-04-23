#!/usr/bin/env bash

cd data

#echo "[Download UniDoc]" && \
#wget -O unidic-mecab_kana-accent-2.1.2_src.zip https://ja.osdn.net/dl/unidic/unidic-mecab_kana-accent-2.1.2_src.zip && \
#unzip unidic-mecab_kana-accent-2.1.2_src.zip

#echo "[Download mpaligner]" && \
#wget -O mpaligner_0.97.tar.gz https://ja.osdn.net/dl/mpaligner/mpaligner_0.97.tar.gz && \
#tar xzf mpaligner_0.97.tar.gz

#echo "[Make mpaligner]" && \
#cd mpaligner_0.97 && \
#make && \
#cd ..

#echo "[Download slearp]" && \
#wget -O slearp_0.96.tar.gz 'http://sourceforge.jp/frs/redir.php?m=jaist&f=%2Fslearp%2F61966%2Fslearp_0.96.tar.gz' && \
#tar -xf slearp_0.96.tar.gz

#echo "[Make slearp]" && \
#cd slearp_0.96_noParallel && \
#make && \
#cd ..

#echo "[Extraction UniDoc]" && \
#python unidic_yomi.py

echo "[Make Alignments]" && \
cat result.tsv | perl mpaligner_0.97/script/separate_for_char.pl utf8 > test.char_unit && \
./mpaligner_0.97/mpaligner -i test.char_unit

echo "[Make Estimation Model]" && \
./slearp_0.96_noParallel/slearp -t test.char_unit.align

echo '[DONE]'
