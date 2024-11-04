# replace paths in the CSS
find "out/_next/static/css" -type f -exec sed -i '' 's/.\/_next\/static/\.\./g' {} +

# fix the regular expressions that are not escaped - add a \ before any / if there isn't one there already
find "out/_next/static/chunks" -type f -exec sed -i '' 's/\.\\/_next\\/data/.\/_next\/data/g' {} +