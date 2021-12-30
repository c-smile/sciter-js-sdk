//
//  sciter-xlib-main.cpp
//
//  Copyright (c) 2021 Andrew Fedoniouk. All rights reserved.
//

#include <X11/Xlib.h>
#include <locale.h>

#include "sciter-x-window.hpp"

namespace sciter {

  namespace application {
    HINSTANCE hinstance() { return 0; }
  }

}

#ifndef SKIP_MAIN
int main (int argc, char *argv[])
{
  ::SciterExec(SCITER_APP_INIT,(UINT_PTR)argc,(UINT_PTR)argv);

  auto message_pump = []() -> int {
    ::SciterExec(SCITER_APP_LOOP,0,0);
    return 0;
  };

  return uimain(message_pump);
}
#endif

