#!/bin/sh

# See https://github.com/CRogers/FileWatcher

rb="; node tools/browser_compiler.js"
#alias haml='node node_modules/haml/lib/cli.js'

filewatcher "src/" "*.coffee" "coffee -b -o bin/ -c :path$rb" "rm bin/:wefile.js$rb" &
filewatcher "src/tests/" "*.coffee" "coffee -b -o tests/ -c :path" "rm tests/:wefile.js" &
filewatcher "src/tools/" "*.coffee" "coffee -b -o tools/ -c :path$rb" "rm tools/:wefile.js" &
filewatcher "src/chips/" "*.coffee" "coffee -b -s -p <:path >chips/:wefile.json$rb" "rm chips/:wefile.json$rb" &

filewatcher "src/browser/js/" "*.coffee" "coffee -b -o browser/js/ -c :path" "rm browser/js/:wefile.js" &
filewatcher "src/browser/" "*.haml" "haml <:path >browser/:wefile.html" "rm browser/:wefile.html" &

sass --watch src/browser/stylesheets/:browser/css/
