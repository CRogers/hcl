#!/bin/sh

# See https://github.com/CRogers/FileWatcher

rb="; node tools/browser_compiler.js"

filewatcher "src/" "*.coffee" "coffee -b -o bin/ -c :path$rb" "rm lib/:wefile.js$rb" &
filewatcher "src/tests/" "*.coffee" "coffee -b -o tests/ -c :path" "rm tests/:wefile.js" &
filewatcher "src/tools/" "*.coffee" "coffee -b -o tools/ -c :path" "rm tools/:wefile.js" &
filewatcher "src/chips/" "*.coffee" "coffee -b -s -p <:path >chips/:wefile.json$rb" "rm chips/:wefile.json$rb"
