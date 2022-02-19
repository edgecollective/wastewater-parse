#!/bin/bash

python3 parse.py
git add waste.csv
git commit -m 'update'
git push
