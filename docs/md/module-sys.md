# module `@sys`

This module contains runtime methods modelled after NodeJS primitives.

To get reference to sys module use:

```JavaScript
import * as sys from "@sys"; // '@' is mandatory
```

All methods in the sys module follow NodeJS calling convention with the only exception - callbacks are not used - functions return promises instead so use them in async functions, like:

```JavaScript
const p = new sys.Pipe();

async function connect() {
  await p.connect('fooapp');
  console.log(`Connected to ${p.getpeername()}`);   
  ...
}
```

sys is built on top of [libuv](https://github.com/libuv/libuv) that Sciter.JS uses internally and QuickJS/libuv wrappers from [txiki project](https://github.com/saghul/txiki.js/). 

## `sys.fs` namespace - file system.

### functions

* #### `fs.open(path:string, flags:string [, mode:integer]): Promise(File)` 

  Opens file at path.

  _flags_ <string> :

  * 'a': Open file for appending. The file is created if it does not exist.
  * 'ax': Like 'a' but fails if the path exists.
  * 'a+': Open file for reading and appending. The file is created if it does not exist.
  * 'ax+': Like 'a+' but fails if the path exists.
  * 'as': Open file for appending in synchronous mode. The file is created if it does not exist.
  * 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist.
  * 'r': **default value**, Open file for reading. An exception occurs if the file does not exist.
  * 'r+': Open file for reading and writing. An exception occurs if the file does not exist.
  * 'rs+': Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.

    This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.

    This doesn't turn fs.open() or fsPromises.open() into a synchronous blocking call. If synchronous operation is desired, something like fs.$open() should be used.

  * 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  * 'wx': Like 'w' but fails if the path exists.
  * 'w+': Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
  * 'wx+': Like 'w+' but fails if the path exists.

  _mode_ Sets the file mode (permission and sticky bits) if the file is created. Default: 0o666 (readable and writable)

  Returns: _Promise_ that will be fulfilled with a _fs.File_ object.

  Refer to the POSIX open() documentation for more detail.

  Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented by Naming Files, Paths, and Namespaces. Under NTFS, if the filename contains a colon, Node.js will open a file system stream, as described by this MSDN page.

* #### `fs.$open(path:string, flags:string [, mode:integer]): File` 

  Synchronous version of `fs.open()`. Returns fs.File object, see below.  

* #### `fs.stat(path:string): Promise(stat)`

  Returns promise that resolves to the _stat_ structure (object) having these fields:

  ```C++
    int64     st_dev;      /* ID of device containing file */
    int64     st_ino;      /* inode number */
    int32     st_mode;     /* protection */
    int64     st_nlink;    /* number of hard links */
    int64     st_uid;      /* user ID of owner */
    int64     st_gid;      /* group ID of owner */
    int64     st_rdev;     /* device ID (if special file) */
    int64     st_size;     /* total size, in bytes */
    int64     st_blksize;  /* blocksize for file system I/O */
    int64     st_blocks;   /* number of 512B blocks allocated */
    float64   st_atime;    /* time of last access, seconds since 1970 */
    float64   st_mtime;    /* time of last modification, seconds since 1970 */
    float64   st_ctime;    /* time of last status change, seconds since 1970 */
    float64   st_birthtime;/* time of creation, seconds since 1970 */
  ```

  Throws an `Error` exception if the file/dir does not exist.

  Additionally it may have one of these:

  * isFile, true is that is a file
  * isDirectory, true is that is a directory
  * isSymbolicLink, true is that is a link

* #### `fs.$stat(): stat` - sync version of the above;

  Synchronous version of the above. Returns null if the file/dir does not exist.

* #### `fs.lstat(): promise(stat)`

  lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.

  See [lstat](https://linux.die.net/man/2/lstat)

* #### `fs.$lstat(): stat` - sync version of the above;

* `fs.realpath()`

* #### `fs.unlink(path:string) : Promise`
   
  Deletes the file.  If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted. See the POSIX unlink documentation for more detail.
  ```JS
    async function deleteFile(path) { await sys.fs.unlink(path) }
  ```

* `fs.rename() : Promise` - async file rename
* `fs.mkdtemp(template:string) : Promise(result:string)` - create unique temporary dir. The last six characters of template must be "XXXXXX"
* `fs.mkstemp(template:string) : Promise` - create unique temporary file. The last six characters of template must be "XXXXXX"
* `fs.rmdir(path) : Promise` - async delete dir
* `fs.$mkdir(path) : boolean` - creates folder (synchronous)
* `fs.copyfile() : Promise` - async file copy
* `fs.readdir() : Promise` - async read dir
* `fs.$readdir(): filelist` - reads folder content synchronously
* `fs.readfile() : Promise` - async file read;
* `fs.$readfile() : ArrayBuffer` - synchronous version of the above; 
* [`fs.watch()`](sys.fs/watch.md)
* [`fs.splitpath()`](sys.fs/splitpath.md)

## classes

### fs.File class - represents file. 

* `file.read([lengthToRead:int [, filePosition:int]]): Promise(Uint8Array)`
* `file.$read([lengthToRead:int [, filePosition:int]]): Uint8Array`
* `file.write(string|***Array|ArrayBuffer[,filePosition:int]) : Promise(result:int)` 
* `file.$write(string|***Array|ArrayBuffer[,filePosition:int]) : int` 
* `file.close() : Promise(undefined)`
* `file.$close() : undefined
* `file.fileno() : int`
* `file.stat() : Promise(object)`
* `file.path : string`

### fs.Dir class - directory visitor 

* `dir.close()`
* `dir.path`
* `dir.next()`
* `[async iterator]`

## Network functions

### TCP socket class 

* `socket.close()`
* `socket.read()`
* `socket.write()`
* `socket.shutdown()`
* `socket.fileno()`
* `socket.listen()`
* `socket.accept()`
* `socket.getsockname()`
* `socket.getpeername()`
* `socket.connect()`
* `socket.bind()`

### UDP socket class 

* `socket.close()`
* `socket.recv()`
* `socket.send()`
* `socket.fileno()`
* `socket.getsockname()`
* `socket.getpeername()`
* `socket.connect()`
* `socket.bind()`

### Pipe - IPC mostly  

* `socket.bind(name:string) : void` - create pipe
* `socket.listen() : void` - listen on pipe
* `socket.connect(name:string) : Promise` - async connect to existing pipe, throws `Error` if the pipe does not exist
* `socket.accept() : Promise(connection)` - async wait for connection on pipe
* `socket.close() : void` - close pipe
* `socket.read() : Promise(ArrayBuffer)` - async read from pipe
* `socket.write(text:string) : Promise(void)` - async write to pipe
* `socket.fileno()`
* `socket.getpeername() : string`
* `socket.getsockname() : string`

### TTY primitives 

* `tty.close()`
* `tty.read()`
* `tty.write()`
* `tty.fileno()`
* `tty.setMode()`
* `tty.getWinSize()`

## `sys.spawn()` - running processes with stdin/stdout/stderr redirection.

* `process.kill()`
* `process.wait()`
* `process.pid`
* `process.stdin`
* `process.stdout`
* `process.stderr`

## `sys.****` - miscellaneous functions.

* `sys.hrtime()`
* `sys.gettimeofday()`
* `sys.uname()`
* `sys.isatty()`
* `sys.environ()`
* `sys.getenv()`
* `sys.setenv()`
* `sys.unsetenv()`
* `sys.cwd()`
* `sys.homedir()`
* `sys.tmpdir()`
* `sys.exepath()`
* `sys.random()`
