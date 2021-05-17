# module `@env`

The module represents current OS and running environment.

#### constants:

* `env.OS` - OS identification name, for example `"Windows-8.1"`
* `env.PLATFORM` - OS/platform generic name: `"Windows"`, `"OSX"`, `"Linux"`, `"Android"`, etc.
* `env.DEVICE` - device type: `"desktop"`, `"mobile"`

#### functions:

* `env.language()` - returns two-letter language abbreviation of user's default language, for example `"en"` for English.
* `env.country()` - returns two-letter country abbreviation, for example `"CA"` for Canada.  
* `env.userName()` - returns current user name. 
* `env.machineName()` - machine network name.  
* `env.domainName()` - machine network domain.
* `env.launch(path)` - method to open documents and start applications;
    Example: `env.launch("https://sciter.com")` will open default browser with that url.
* `env.home([relpath]): string` - converts relative path to absolute path using location of sciter.dll as a base. 
* `env.path(name): string` - returns location of well known folders on user machine, name is one of: 
  * "USER_HOME"
  * "SYSTEM"
  * "SYSTEM_BIN"
  * "PROGRAM_FILES"
  * "USER_APPDATA"
  * "COMMON_APPDATA"
  * "USER_DOCUMENTS"
  * "COMMON_DOCUMENTS"
  * "DOWNLOADS"
* `env.variable(name:string [,toset:string | null]): string` - TBD
* `env.variables(): object` - TBD
* `env.exec()` execute comma-separated arguments. `exec("scapp", "main.html")`


