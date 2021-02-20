## sys.fs.splitpath()

The function splits path on dir and file parts:  


```JavaScript
sys.fs.splitpath(path:string) : [dirpath:string, file:string]
```

### parameters

- *path* : string, path of folder or file;

### returns

The function returns pair (array of two elements) : 

- ```[0]```, string, path of dir without trailing '/'; 
- ```[1]```, string, file portion - name and extension;

### notes

Uses ```dirname()``` and ```basename()``` on Posix. ```_splitpath()``` on Windows.



