
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
  return _TARGET_OS
end

-- function that setups target dir according to configuration
function settargetdir() 
  basedir = basedir or ""
  targetdir ("bin/" .. osabbr() .."/%{cfg.platform}")
  filter "configurations:*Skia" 
    targetdir ("bin/" .. osabbr() .."/%{cfg.platform}skia")
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
  --platforms { "x32", "x64", "arm32", "arm64" } 

  cppdialect "C++14" 

  staticruntime "On"
  
  -- -- location "build"
  filter "system:windows"
    configurations { "DebugSkia", "ReleaseSkia" }
    location ("build/" .. osabbr())
    links { "shell32", "advapi32", "ole32", "oleaut32", "comdlg32" }
    platforms { "x32", "x64", "arm64" }
    systemversion "latest"
  filter "system:macosx"
    location ("build/" .. osabbr())
    links { "CoreFoundation.framework", "Cocoa.framework", "IOKit.framework" }
    platforms { "x64" }
  filter "system:linux"
    location("build/" .. osabbr() .. "/" .. string.lower(_OPTIONS["device"]))
    platforms { "x64", "arm32" }
    defines { "_GNU_SOURCE" }
    buildoptions {
     "`pkg-config gtk+-3.0 --cflags`",      
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
    --removeconfigurations { "*skia" }
    files {"include/sciter-*.h",
           "include/sciter-*.hpp",
           "include/aux-*.*",
           "include/sciter-win-main.cpp",
           "include/behaviors/behavior_drawing.cpp",
           "include/behaviors/behavior_video_generator.cpp",
           "demos/usciter/win-res/usciter.rc",
           "demos/usciter/win-res/dpi-aware.manifest" }
    prebuildcommands { 
      "%{prj.location}..\\..\\bin\\".. osabbr() .. "\\packfolder.exe %{prj.location}..\\..\\demos\\usciter\\res %{prj.location}..\\..\\demos\\usciter\\resources.cpp -v \"resources\""
    }

  filter "system:macosx"
    files {"include/sciter-osx-main.mm"}
    targetdir ("bin/" .. osabbr())
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
       "-no-pie"
    }

  filter {}

project "inspector"
  kind "WindowedApp"
  language "C++"

  dpiawareness "HighPerMonitor"

  files { "demos/inspector/inspector.cpp" }

  settargetdir()

  filter "system:windows"
    removeconfigurations { "*skia" }
    files {"include/sciter-*.h",
           "include/sciter-*.hpp",
           "include/aux-*.*",
           "include/sciter-win-main.cpp",
           "demos/inspector/win-res/inspector.rc",
           "demos/inspector/win-res/dpi-aware.manifest" }
    prebuildcommands { 
      "%{prj.location}..\\..\\bin\\".. osabbr() .. "\\packfolder.exe %{prj.location}..\\..\\demos\\inspector\\res %{prj.location}..\\..\\demos\\inspector\\resources.cpp -v \"resources\""
    }

  filter "system:macosx"
    files {"include/sciter-osx-main.mm"}
    targetdir ("bin/" .. osabbr())
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
       "-no-pie"
    }

  filter {}

project "integration"
  kind "WindowedApp"
  language "C++"

  dpiawareness "HighPerMonitor"

  files { "demos/integration/frame.cpp" }

  settargetdir()

  filter "system:windows"
    removeplatforms { "x64" }
    removeconfigurations { "*skia" }
    files {"include/sciter-*.h",
           "include/sciter-*.hpp",
           "include/aux-*.*",
           "include/sciter-win-main.cpp",
           "demos/integration/win-res/integration.rc",
           "demos/integration/win-res/dpi-aware.manifest" }
    prebuildcommands { 
      "%{prj.location}..\\..\\bin\\".. osabbr() .. "\\packfolder.exe %{prj.location}..\\..\\demos\\integration\\res %{prj.location}..\\..\\demos\\integration\\resources.cpp -v \"resources\""
    }

  filter "system:macosx"
    files {"include/sciter-osx-main.mm"}
    targetdir ("bin/" .. osabbr())
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


if( _TARGET_OS == "windows") then 

  project "sciter-dx"
    kind "WindowedApp"
    language "C++"

    dpiawareness "HighPerMonitor"

    files { "demos/windows-directx/*.*" }

    files {"include/sciter-*.h",
           "include/sciter-*.hpp",
           "include/aux-*.*"}

    settargetdir()

    removeplatforms { "x64" }
    removeconfigurations { "*skia" }
    filter {}
end

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

--end

project "glfw-opengl"
  --kind "ConsoleApp"
  kind "WindowedApp"
  language "C++"

  defines "WINDOWLESS"

  cppdialect "C++17" 

  removeconfigurations { "*Skia" }

  targetdir ("bin.lite/" .. osabbr() .."/%{cfg.platform}")

  dpiawareness "HighPerMonitor"

  configuration "windows"
    prebuildcommands { 
      "%{prj.location}..\\..\\bin\\windows\\packfolder.exe %{prj.location}..\\..\\demos.lite\\facade %{prj.location}..\\..\\demos.lite\\facade-resources.cpp -v \"resources\""
    }
  configuration {}

  -- ours:
  files { 
    "include/*.h", 
    "include/*.hpp",
    "demos.lite/sciter-glfw-opengl/*.h",
    "demos.lite/sciter-glfw-opengl/basic.cpp",
    "include/behaviors/behavior_drawing.cpp"
  }
  
    -- theirs, GLFW:
  includedirs { 
    "demos.lite/sciter-glfw-opengl",
    "demos.lite/glfw/include",
    "demos.lite/glfw/deps" }  

  files { 
    "demos.lite/glfw/src/context.c",
    "demos.lite/glfw/src/init.c",
    "demos.lite/glfw/src/input.c",
    "demos.lite/glfw/src/monitor.c",
    "demos.lite/glfw/src/vulkan.c",
    "demos.lite/glfw/src/window.c",
    "demos.lite/glfw/deps/glad.c",
  }

  filter "system:windows"
    entrypoint "mainCRTStartup"
    dpiawareness "HighPerMonitor"
    defines "_GLFW_WIN32"
    files {
      "demos.lite/glfw/src/win32_init.c",
      "demos.lite/glfw/src/win32_joystick.c",
      "demos.lite/glfw/src/win32_monitor.c",
      "demos.lite/glfw/src/win32_time.c",
      "demos.lite/glfw/src/win32_thread.c",
      "demos.lite/glfw/src/win32_window.c",
      "demos.lite/glfw/src/wgl_context.c",
      "demos.lite/glfw/src/egl_context.c",
      "demos.lite/glfw/src/osmesa_context.c",
    }
    links "shlwapi"
    removeplatforms { "arm64" }
  filter "system:macosx"
    defines "_GLFW_COCOA"
    files {
      "demos.lite/glfw/src/cocoa_platform.h",
      "demos.lite/glfw/src/cocoa_joystick.h",
      "demos.lite/glfw/src/posix_thread.h",
      "demos.lite/glfw/src/nsgl_context.h", 
      "demos.lite/glfw/src/egl_context.h",
      "demos.lite/glfw/src/osmesa_context.h",
      "demos.lite/glfw/src/cocoa_init.m",
      "demos.lite/glfw/src/cocoa_joystick.m",
      "demos.lite/glfw/src/cocoa_monitor.m",
      "demos.lite/glfw/src/cocoa_window.m",
      "demos.lite/glfw/src/cocoa_time.c",
      "demos.lite/glfw/src/posix_thread.c",
      "demos.lite/glfw/src/nsgl_context.m",
      "demos.lite/glfw/src/egl_context.c",
      "demos.lite/glfw/src/osmesa_context.c",
    } 
    links { "CoreVideo.framework" }
    targetdir ("bin/" .. osabbr())   
  filter "system:linux"  
    linkoptions { 
      "-Wall", 
      "-pthread", "-lm", 
      "-lX11","-lXrandr","-lXinerama", "-lXcursor",
      "-lGL", "-lGLU", "-ldl" }
    defines "_GLFW_X11" -- or "_GLFW_WAYLAND" or "_GLFW_MIR"
    files {
      "demos.lite/glfw/src/xkb_unicode.c",
      "demos.lite/glfw/src/glx_context.c",
      "demos.lite/glfw/src/egl_context.c",
      "demos.lite/glfw/src/osmesa_context.c",
      "demos.lite/glfw/src/posix_thread.*",
      "demos.lite/glfw/src/posix_time.*",
      "demos.lite/glfw/src/linux_*.*",
      "demos.lite/glfw/src/x11_*.*",
    }
    
  filter {}

end
