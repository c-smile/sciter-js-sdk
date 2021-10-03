# module `@env`

The module represents current OS and running environment.

#### constants:

* `env.OS` - OS identification name, for example `"Windows-8.1"`
* `env.PLATFORM` - OS/platform generic name: `"Windows"`, `"OSX"`, `"Linux"`, `"Android"`, etc.
* `env.DEVICE` - device type: `"desktop"`, `"mobile"`

#### functions:

* `env.language()` 

  returns two-letter language abbreviation of user's default language, for example `"en"` for English.

* `env.country()` 

  returns two-letter country abbreviation, for example `"CA"` for Canada.  

* `env.userName()` 

  returns current user name. 

* `env.machineName()` 
  
  machine network name.  

* `env.domainName()` 
  
  machine network domain.

* `env.launch(path)` 
  
  method to open documents and start applications;

    Example: `env.launch("https://sciter.com")` will open default browser with that url.

* `env.home([relpath]): string` 

  converts relative path to absolute path using location of sciter.dll as a base. 

* `env.homeURL([relpath]): string` 
 
  same as `env.home(relpath)` but returns "file://..." URL.

* `env.path(name,[relpath]): string` 

  returns location of well known folders on user machine, name is one of: 

  * "home" - user's home folder;
  * "applications" - applications a.k.a program files;
  * "root" - file system root;
  * "desktop" - desktop folder;
  * "appdata" - applications data folder;
  * "downloads"
  * "documents"
  * "music"
  * "videos"
  * "pictures"
  
  If _relpath_ is provided the function returns absolute path of that relpath combined with the folder path.

* `env.pathURL(name): string` 
 
  same as `env.path(name)` but returns "file://..." URL.

* `env.variable(name:string [,toset:string | null]): string` 

  [getenv](https://man7.org/linux/man-pages/man3/getenv.3.html)/[setenv(,,true)](https://man7.org/linux/man-pages/man3/setenv.3.html)/unsetenv() ( if _toset_ is _null_ )

* `env.exec()` 
 
  execute comma-separated arguments. Example: `exec("scapp.exe", "main.html")`


