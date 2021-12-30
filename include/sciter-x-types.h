/*
 * The Sciter Engine of Terra Informatica Software, Inc.
 * http://sciter.com
 *
 * The code and information provided "as-is" without
 * warranty of any kind, either expressed or implied.
 *
 * (C) 2003-2015, Terra Informatica Software, Inc.
 */

/*
 * Sciter basic types, platform isolation declarations
 */

#ifndef sciter_sciter_x_types_h
#define sciter_sciter_x_types_h

#include "sciter-x-primitives.h"


#if defined(SCITER_LITE)
  #define WINDOWLESS
#endif

  enum GFX_LAYER
  {
    GFX_LAYER_GDI = 1, GFX_LAYER_CG = 1, /*Mac OS*/ GFX_LAYER_CAIRO = 1, /*GTK*/
#ifdef WINDOWS
    GFX_LAYER_WARP = 2, GFX_LAYER_D2D_WARP = GFX_LAYER_WARP,
    GFX_LAYER_D2D = 3,
#endif
    GFX_LAYER_SKIA = 4,
    GFX_LAYER_SKIA_RASTER = GFX_LAYER_SKIA,
    GFX_LAYER_SKIA_OPENGL = 5,
    GFX_LAYER_SKIA_VULKAN = 6,
#ifdef OSX
    GFX_LAYER_SKIA_METAL = 7,
#endif
#ifdef WINDOWS
    GFX_LAYER_SKIA_DX12 = 8,
#endif
    GFX_LAYER_AUTO = 0xFFFF,
  };


#if defined(WINDOWS)

  #ifdef STATIC_LIB
    void SciterInit( bool start);
  #endif

  #if defined(WINDOWLESS)
    #define HWINDOW LPVOID
  #else
    #define HWINDOW HWND
  #endif

  #define SCITER_DLL_NAME "sciter.dll"

#elif defined(OSX)

  #define HWINDOW LPVOID   // NSView*
  #define HINSTANCE LPVOID // NSApplication*
  #define HDC void*        // CGContextRef

  #define LRESULT long

  #define SCITER_DLL_NAME "libsciter.dylib"

#elif defined(LINUX)
  #if defined(WINDOWLESS)
    #define HWINDOW void*
  #else
    #include <X11/Xlib.h>
    //Window
    #define HWINDOW unsigned long
  //#else
  //  #include <gtk/gtk.h>
  //  #define HWINDOW GtkWidget*
  #endif

  #define HINSTANCE LPVOID //
  #define LRESULT long
  #define HDC LPVOID       // cairo_t

  #define SCITER_DLL_NAME "libsciter.so"

#elif defined(ANDROID)

  #define WINDOWLESS

  #define HWINDOW LPVOID

  #define HINSTANCE LPVOID //
  #define LRESULT long
  #define HDC LPVOID // not used anyway, draws on OpenGLESv2

  #define SCITER_DLL_NAME "libsciter.so"

#endif

#endif
