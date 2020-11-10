
newoption {
   trigger     = "windowsxp",
   description = "Will add Windows XP support"
}

newoption {
   trigger     = "device",
   value       = "DESKTOP|HANDHELD|IOT",
   description = "target device",
   default     = "DESKTOP",
   allowed = {
      { "DESKTOP",   "Desktop machine" },
      { "HANDHELD",  "Mobile device" },
      { "IOT",       "IoT device" }
   }
}

defines { "DEVICE=" .. _OPTIONS["device"] }


if( _TARGET_OS ~= "macosx") then  -- we are not auto generating XCode solutions for a while
                                  -- structure of typical XCode is not trivial - requires manual inputs.
function osabbr() 
  if( _TARGET_OS == "macosx") then return "osx" 
  elseif( _TARGET_OS == "windows") then return "win"
  elseif( _TARGET_OS == "linux") then return "lnx"
  else return "unk"
  end
end

-- function that setups target dir according to configuration
function settargetdir() 
  basedir = basedir or ""
  targetdir ("bin." .. osabbr() .."/%{cfg.platform}")
  filter "configurations:*Skia" 
    targetdir ("bin." .. osabbr() .."/%{cfg.platform}skia")
  filter {}
end

if _OPTIONS["windowsxp"] then 

  filter {"system:windows", "action:vs2015", "platforms:not arm64" }
    toolset "v140_xp"
  filter {"system:windows", "action:vs2017", "platforms:not arm64" }
    toolset "v141_xp"
  filter {}
end    


workspace "sciter.sdk"
  configurations { "Debug", "Release" }
  platforms { "x32", "x64", "arm32", "arm64" } 

  cppdialect "C++14" 

  staticruntime "On"
  
  -- -- location "build"
  filter "system:windows"
    configurations { "DebugSkia", "ReleaseSkia" }
    location "build.windows"
    links { "shell32", "advapi32", "ole32", "oleaut32", "comdlg32" }
    removeplatforms "arm32"
    systemversion "latest"
  filter "system:macosx"
    location "build.macosx"
    filter "system:macosx"
    links { "CoreFoundation.framework", "Cocoa.framework" }
    buildoptions { "-fobjc-arc" }
  filter "system:linux"
    location("build.linux/" .. string.lower(_OPTIONS["device"]))
    defines { "_GNU_SOURCE" }
    buildoptions {
     "`pkg-config gtk+-3.0 --cflags`",      
     "`pkg-config fontconfig --cflags`",
     "-fPIC",
     "-Wno-unknown-pragmas",
     "-Wno-write-strings",
     "-ldl",
    }
    linkoptions { 
      "-fPIC",
      "-pthread",
    }

  filter {}

  includedirs { "include" }  

  flags { "MultiProcessorCompile" }

  filter "platforms:x32"
    architecture "x86"
  filter "platforms:x64"
    architecture "x86_64"  
  filter "platforms:arm64"
    architecture "ARM64"  
  filter "platforms:arm32"
    architecture "ARM"  


  filter {"platforms:x32", "system:windows"}
    defines { "WIN32" }
  filter {"platforms:x64", "system:windows"}
    defines { "WIN32","WIN64" }      
  filter {"platforms:arm64", "system:windows"}
    defines { "WIN32","WIN64", "ARM64" }      

  filter "configurations:Debug*"
    defines { "DEBUG", "_DEBUG" }
    symbols "On"

  filter "configurations:Release*"
    defines { "NDEBUG"}  
    optimize "Size"
    symbols "Off"
    flags { "LinkTimeOptimization" }

  filter {"system:windows"}
    defines { "_CRT_SECURE_NO_WARNINGS" } 
 
  filter {}

project "usciter"
  kind "WindowedApp"
  language "C++"

  dpiawareness "HighPerMonitor"

  files { "demos/usciter/usciter.cpp",
          "sqlite/*.h",
          "sqlite/*.cpp",
          "sqlite/sqlite-wrap.c" }

  settargetdir()

  filter "system:windows"
    removeplatforms { "x64" }
    removeconfigurations { "*skia" }
    files {"include/sciter-*.h",
           "include/sciter-*.hpp",
           "include/aux-*.*",
           "include/sciter-win-main.cpp",
           "demos/usciter/win-res/usciter.rc",
           "demos/usciter/win-res/dpi-aware.manifest" }
    prebuildcommands { 
      "%{prj.location}..\\bin.win\\packfolder.exe %{prj.location}..\\demos\\usciter\\res %{prj.location}..\\demos\\usciter\\resources.cpp -v \"resources\""
    }

  filter "system:macosx"
    files {"include/sciter-osx-main.mm"}
  filter "system:linux"
    files {"include/sciter-gtk-main.cpp"}
    buildoptions {
       "`pkg-config gtk+-3.0 --cflags`"
    }
    linkoptions { 
       "`pkg-config gtk+-3.0 --libs`",
       "`pkg-config fontconfig --libs`",
       "-fPIC",
       "-pthread",
       "-Wl,--no-undefined",
       "-ldl",
    }

  filter {}

-- sciter extension library - SQLite
project "sciter-sqlite"

  kind "SharedLib"
  language "C++"

  targetprefix "" -- do not prepend it with "lib..."

  files { "sqlite/*.h",
          "sqlite/*.cpp",
          "sqlite/sqlite-wrap.c" }

  settargetdir()

  removeconfigurations { "*skia" }  

  filter "system:windows"
    files {"sqlite/sciter-sqlite.def" }
  filter {}

end