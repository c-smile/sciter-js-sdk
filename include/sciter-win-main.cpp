
#include "sciter-x-window.hpp"
#include "sciter-x-threads.h"

#define WIN32_LEAN_AND_MEAN             // Exclude rarely-used stuff from Windows headers
// Windows Header Files:
#include <windows.h>
#include <shellapi.h>

#include <vector>

HINSTANCE ghInstance = THIS_HINSTANCE;

#ifndef SKIP_MAIN

int APIENTRY wWinMain(HINSTANCE hInstance,
                      HINSTANCE hPrevInstance,
                      LPWSTR    lpCmdLine,
                      int       nCmdShow)
{
  ghInstance = hInstance;
	UNREFERENCED_PARAMETER(hPrevInstance);
	UNREFERENCED_PARAMETER(lpCmdLine);
  UNREFERENCED_PARAMETER(nCmdShow);

#if defined(MANUAL_LOOP)
  OleInitialize(0); // for system drag-n-drop

  // comment this out if you need system theming
  ::SciterSetOption(NULL,SCITER_SET_UX_THEMING,TRUE);

  auto message_pump = []() -> int {
    MSG msg;
    // Main message loop:
	  while (GetMessage(&msg, NULL, 0, 0))
	  {
  	  TranslateMessage(&msg);
		  DispatchMessage(&msg);
	  }
    return (int) msg.wParam;
  };

  int r = uimain(message_pump);

  OleUninitialize();
#else 
  SciterExec(SCITER_APP_INIT, 0, 0);
  int r = uimain([]() -> int { return SciterExec(SCITER_APP_LOOP, 0, 0); });
  SciterExec(SCITER_APP_SHUTDOWN, 0, 0);
#endif
  return r;
  
}
#endif
namespace sciter {

  namespace application 
  {
    const std::vector<sciter::string>& argv() {
      static std::vector<sciter::string> _argv;
      if( _argv.size() == 0 ) {
        int argc = 0;
        LPWSTR *arglist = CommandLineToArgvW(GetCommandLineW(), &argc);
        if( !arglist )
          return _argv;
        for( int i = 0; i < argc; ++i)
          _argv.push_back(arglist[i]);
        LocalFree(arglist);
      }
      return _argv;
    } 

    HINSTANCE hinstance() {
      return ghInstance;
    }

  }
  
  LRESULT window::on_message( HWINDOW hwnd, UINT msg, WPARAM wParam, LPARAM lParam, SBOOL& pHandled )
  {
     //switch(msg) {
     //  case WM_SIZE: on_size(); break; 
     //  case WM_MOVE: on_move(); break; 
     //}
     return 0;
  }

  LRESULT SC_CALLBACK window::msg_delegate(HWINDOW hwnd, UINT msg, WPARAM wParam, LPARAM lParam, LPVOID pParam, SBOOL* pHandled)
  {
    window* win = static_cast<window*>( pParam );
    return win->on_message( hwnd, msg, wParam, lParam,*pHandled);
  }

}

