GitHub: https://github.com/Narduw/wiki-table-generator</br>
NPM: https://www.npmjs.com/package/wiki-table-generator

Generates a table containing data formatted according to MediaWiki standard.
The CLI uses ```:``` as the column separator. You can configure this yourself when using the ```TableFactory``` module.

Usage: npx wiki-table-generator "path/filename"

e.g.:

file:
```
column0 : column1
column0 : column1: column2
column0 : column1 : column2 :column3
column0 : column1 : : column3
: column1 : column2 :
```

result:
```
{|
|-
| column0
| column1
| 
| 
|-
| column0
| column1
| column2
| 
|-
| column0
| column1
| column2
| column3
|-
| column0
| column1
| 
| column3
|-
| 
| column1
| column2
| 
|}
```