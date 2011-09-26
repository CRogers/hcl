#!/bin/sh

# See https://github.com/CRogers/FileWatcher

filewatcher "src/" "*.coffee" "coffee -b -o bin/ -c :path" "rm lib/:wefile.js" &
filewatcher "src/tests/" "*.coffee" "coffee -b -o tests/ -c :path" "rm tests/:wefile.js" &
filewatcher "src/chips/" "*.coffee" "coffee -b -s -p <:path >chips/:wefile.json" "rm chips/:wefile.json"
