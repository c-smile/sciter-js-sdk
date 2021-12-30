
#include "sciter-x-window.hpp"
#include "sciter-x-graphics.hpp"


class gSciter: public sciter::window {
public:
  gSciter() : window(SW_TITLEBAR | SW_RESIZEABLE | SW_CONTROLS | SW_MAIN /*| SW_ENABLE_DEBUG - frame sets it manually*/) {}

#if defined(TEST)
  int foo(int p) { return p + 42; }
  int bar(int p1, int p2) { return p1 + p2; }
  std::vector<int> vector() { return {1,2,3}; }

  int get_windowHandle() {
    return (int)(intptr_t)get_hwnd();
  }

  SOM_PASSPORT_BEGIN(uSciter)
    SOM_FUNCS(
      SOM_FUNC(foo),
      SOM_FUNC(bar),
      SOM_FUNC(vector),
    )
    SOM_PROPS(SOM_RO_VIRTUAL_PROP(windowHandle,get_windowHandle))
  SOM_PASSPORT_END
#endif

};

#include "resources.cpp"

int uimain(std::function<int()> run ) {

  //SciterSetOption(NULL, SCITER_SET_GFX_LAYER, GFX_LAYER_SKIA_DX12);
  SciterSetOption(NULL, SCITER_SET_GFX_LAYER, GFX_LAYER_SKIA_VULKAN);
  //SciterSetOption(NULL, SCITER_SET_GFX_LAYER, GFX_LAYER_SKIA_OPENGL);
  //SciterSetOption(NULL, SCITER_SET_GFX_LAYER, GFX_LAYER_D2D);

  // comment this out if you need system theming
  //::SciterSetOption(NULL, SCITER_SET_UX_THEMING, TRUE);

  // enable features to be used from script
  ::SciterSetOption(NULL, SCITER_SET_SCRIPT_RUNTIME_FEATURES,
                          ALLOW_FILE_IO |
                          ALLOW_SOCKET_IO |
                          ALLOW_EVAL |
                          ALLOW_SYSINFO );

#ifdef _DEBUG
  sciter::debug_output_console console; //- uncomment it if you will need console window
#endif

  sciter::archive::instance().open(aux::elements_of(resources)); // bind resources[] (defined in "resources.cpp") with the archive

  sciter::om::hasset<gSciter> pwin = new gSciter();

  // example, setting "gsciter" media variable, check https://sciter.com/forums/topic/debugging-issues/
  SciterSetMediaType(pwin->get_hwnd(), WSTR("desktop,gsciter"));

  bool loaded = false;

  // note: this:://app URL is dedicated to the sciter::archive content associated with the application
  pwin->load(WSTR("this://app/default.htm"));

  //pwin->expand(); // script will do that

#if defined(TEST)
  sciter::value r1 = pwin->call_function("test", sciter::value(42));
  sciter::value r2 = pwin->eval(const_wchars("test(32)"));
#endif

  return run();

}
