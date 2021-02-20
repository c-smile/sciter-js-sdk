## sys.fs.watch()

Monitors files or folders for changes. Wraps [libuv::uv_fs_event_t](http://docs.libuv.org/en/v1.x/fs_event.html).


```JavaScript
sys.fs.watch(path, callback ) : WatchFS
```

### parameters

- *path* : string, path of folder or file to monitor;
- *callback* : function(path:string,events:int), calback function to be called on changes of file or files in folder. *events* is an ORed combination of two flags:
   - *0x01* - rename event;
   - *0x02* - change event;

### returns

The function returns watch object that has: 

- ```watch.path```, property, string, read-only : original path that sys.fs.watch() was called with; 
- ```watch.close()```, method : it should be called to stop the watch operation; 

### notes

If used on folder, `sys.fs.watch()` will do deep monitoring - on this folder content and sub-folders inside it.

It is recommended to call ```watch.close()``` on all active watch monitors before quiting.


