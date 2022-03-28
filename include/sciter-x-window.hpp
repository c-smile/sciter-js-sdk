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
 * sciter::window and sciter::application - high level window wrapper
 * Use these if you just need to create basic Sciter windows.
 * Check /demos/uminimal and /demos/usciter samples.
 */

#pragma once

#ifndef __sciter_x_window_hpp__
#define __sciter_x_window_hpp__

#include "sciter-x-types.h"
#include "sciter-x.h"
#include "sciter-x-dom.h"
#include "sciter-x-api.h"
//#include "sciter-x-threads.h"
#include "sciter-x-dom.hpp"
#include "sciter-x-host-callback.h"
#include "aux-asset.h"
#include "aux-slice.h"
#include <algorithm>

// main UI application routine
int uimain( std::function<int()> run );
// {
//   ... initialization and window creation
//   int r = run();
//   ... optional de-initialization
//   return r;
// }

/**sciter namespace.*/
namespace sciter
{
  namespace application
  {
    const std::vector<sciter::string>& argv();
    HINSTANCE hinstance();

    inline void start() {  
      std::vector<const WCHAR*> args;
      for (auto& arg : argv()) args.push_back(arg.c_str());
      SciterExec(SCITER_APP_INIT, (UINT_PTR)args.size(), (UINT_PTR)&args[0]); }
    inline int  run() { return SciterExec(SCITER_APP_LOOP, 0, 0); }
    inline bool request_quit(int rv) { return SciterExec(SCITER_APP_STOP, 0, 0); }
    inline void shutdown() { SciterExec(SCITER_APP_SHUTDOWN, 0, 0); }
  }

  class window : public sciter::event_handler
               , public sciter::host<window>
  {
    friend sciter::host<window>;
  public:

    window( UINT creationFlags, RECT frame = RECT() ) {
      asset_add_ref();
      _hwnd = ::SciterCreateWindow(creationFlags, (frame.right - frame.left) > 0 ? &frame: NULL,NULL,this,NULL);
    }

    //virtual ~window() {}

    bool is_valid() const { return _hwnd != 0; }

    virtual long asset_add_ref() { return asset::asset_add_ref(); }
    virtual long asset_release() { return asset::asset_release(); }

    void collapse() { bind(); ::SciterWindowExec(_hwnd,SCITER_WINDOW_SET_STATE, SCITER_WINDOW_STATE_MINIMIZED,0); }
    void expand( bool maximize = false) { bind(); ::SciterWindowExec(_hwnd,SCITER_WINDOW_SET_STATE, maximize ? SCITER_WINDOW_STATE_MAXIMIZED: SCITER_WINDOW_STATE_SHOWN,0); }
    void request_close() // requests window to be closed, note: script can reject the closure
                         { ::SciterWindowExec(_hwnd,SCITER_WINDOW_SET_STATE, SCITER_WINDOW_STATE_CLOSED,FALSE); }
    void close() { ::SciterWindowExec(_hwnd,SCITER_WINDOW_SET_STATE, SCITER_WINDOW_STATE_CLOSED,TRUE); }
    void activate(bool bring_to_front = false) { bind(); ::SciterWindowExec(_hwnd, SCITER_WINDOW_ACTIVATE, bring_to_front, 0); }

    /*OBSOLETE*/ void dismiss() { request_close(); }

    bool load(aux::bytes utf8_html, const WCHAR* base_url = 0)
    {
      bind(); return FALSE != ::SciterLoadHtml(_hwnd, utf8_html.start, UINT(utf8_html.length), base_url);
    }
    bool load(aux::chars utf8_html, const WCHAR* base_url = 0)
    {
      bind(); return FALSE != ::SciterLoadHtml(_hwnd, (LPCBYTE)utf8_html.start, UINT(utf8_html.length), base_url);
    }
    bool load(const WCHAR* url)
    {
      bind(); return FALSE != ::SciterLoadFile(_hwnd, url);
    }

  // sciter::host traits:
    HWINDOW   get_hwnd() const { return _hwnd; }
    HINSTANCE get_resource_instance() const { return application::hinstance(); }

    //sciter::om::iasset
    static const char* interface_name() { return "window.sciter.com"; }

    void bind() {
      if (_hwnd && !_bound) {
        _bound = true;
        setup_callback();
        sciter::attach_dom_event_handler(get_hwnd(), this);
      }
    }
  protected:
    virtual LRESULT on_engine_destroyed() 
    { 
      _hwnd = 0; asset_release();
      return 0; 
    }

#if defined(WINDOWS)
    virtual LRESULT on_message( HWINDOW hwnd, UINT msg, WPARAM wParam, LPARAM lParam, SBOOL& handled ) {
      //switch(msg) {
      //  case WM_SIZE: on_size(); break; 
      //  case WM_MOVE: on_move(); break; 
      //}
      return 0;
    }

    static LRESULT SC_CALLBACK msg_delegate(HWINDOW hwnd, UINT msg, WPARAM wParam, LPARAM lParam, LPVOID pParam, SBOOL* pHandled)
    {
      window* win = static_cast<window*>(pParam);
      return win->on_message(hwnd, msg, wParam, lParam, *pHandled);
    }

#endif
  private:
     HWINDOW _hwnd;
     bool    _bound = false;
   };
}

#endif
