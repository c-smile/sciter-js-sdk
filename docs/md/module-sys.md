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

#### functions

* `fs.open(path, flags[, mode]): promise(File)` - [flags](https://nodejs.org/api/fs.html#fs_fspromises_open_path_flags_mode), mode sets the file mode (permission and sticky bits) if the file is created. Default: 0o666
* `fs.stat(): promise(stat)`
* `fs.$stat(): stat` - sync version of the above;
* `fs.lstat(): promise(stat)`
* `fs.$lstat(): stat` - sync version of the above;
* `fs.realpath()`
* `fs.unlink()`
* `fs.rename()`
* `fs.mkdtemp()`
* `fs.mkstemp()`
* `fs.rmdir()`
* `fs.$mkdir(path)` - creates folder (synchronous).
* `fs.copyfile()`
* `fs.readdir()`
* `fs.$readdir(): filelist` - reads folder content synchronously
* `fs.readfile() : promise` - async fileread;
* `fs.$readfile() : ArrayBuffer` - synchronous version of the above; 
* [`fs.watch()`](sys.fs/watch.md)
* [`fs.splitpath()`](sys.fs/splitpath.md)

#### classes

### fs.File class - represents file. 

* `file.read([lengthToRead:int [, filePosition:int]]): Promise(Uint8Array)`
* `file.write(string|***Array|ArrayBuffer[,filePosition:int]) : Promise(result:int)` 
* `file.close() : Promise(result:int)`
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

* `socket.close()`
* `socket.read()`
* `socket.write()`
* `socket.fileno()`
* `socket.listen()`
* `socket.accept()`
* `socket.getsockname()`
* `socket.getpeername()`
* `socket.connect()`
* `socket.bind()`

### TTY primitives 

* `tty.close()`
* `tty.read()`
* `tty.write()`
* `tty.fileno()`
* `tty.setMode()`
* `tty.getWinSize()`

## `sys.spawn()` - running processes with stdin/strout/stderr redirection.

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




