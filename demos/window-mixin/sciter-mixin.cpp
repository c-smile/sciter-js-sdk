// sciter-mixin.cpp : Defines the entry point for the application.
//

#include "framework.h"
#include "sciter-mixin.h"

#define MAX_LOADSTRING 100

// Global Variables:
HINSTANCE hInst;                                // current instance
WCHAR szTitle[MAX_LOADSTRING];                  // The title bar text
WCHAR szWindowClass[MAX_LOADSTRING];            // the main window class name

// Forward declarations of functions included in this code module:
ATOM                MyRegisterClass(HINSTANCE hInstance);
BOOL                InitInstance(HINSTANCE, int);
LRESULT CALLBACK    WndProc(HWND, UINT, WPARAM, LPARAM);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                     _In_opt_ HINSTANCE hPrevInstance,
                     _In_ LPWSTR    lpCmdLine,
                     _In_ int       nCmdShow)
{
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);

    OleInitialize(NULL);

    sciter::debug_output _; // VS Debug Output console wireing

    // Initialize global strings
    LoadStringW(hInstance, IDS_APP_TITLE, szTitle, MAX_LOADSTRING);
    LoadStringW(hInstance, IDC_SCITERMIXIN, szWindowClass, MAX_LOADSTRING);
    MyRegisterClass(hInstance);

    // Perform application initialization:
    if (!InitInstance (hInstance, nCmdShow))
    {
        return FALSE;
    }

    HACCEL hAccelTable = LoadAccelerators(hInstance, MAKEINTRESOURCE(IDC_SCITERMIXIN));

    MSG msg;

    // Main message loop:
    while (GetMessage(&msg, nullptr, 0, 0))
    {
        if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
    }

    return (int) msg.wParam;
}



//
//  FUNCTION: MyRegisterClass()
//
//  PURPOSE: Registers the window class.
//
ATOM MyRegisterClass(HINSTANCE hInstance)
{
    WNDCLASSEXW wcex;

    wcex.cbSize = sizeof(WNDCLASSEX);

    wcex.style          = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc    = WndProc;
    wcex.cbClsExtra     = 0;
    wcex.cbWndExtra     = 0;
    wcex.hInstance      = hInstance;
    wcex.hIcon          = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_SCITERMIXIN));
    wcex.hCursor        = LoadCursor(nullptr, IDC_ARROW);
    wcex.hbrBackground  = (HBRUSH)(COLOR_WINDOW+1);
    wcex.lpszMenuName   = MAKEINTRESOURCEW(IDC_SCITERMIXIN);
    wcex.lpszClassName  = szWindowClass;
    wcex.hIconSm        = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

    return RegisterClassExW(&wcex);
}

//
//   FUNCTION: InitInstance(HINSTANCE, int)
//
//   PURPOSE: Saves instance handle and creates main window
//
//   COMMENTS:
//
//        In this function, we save the instance handle in a global variable and
//        create and display the main program window.
//

UINT SC_CALLBACK SciterCallback(LPSCITER_CALLBACK_NOTIFICATION pns, LPVOID callbackParam);

BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
   hInst = hInstance; // Store instance handle in our global variable

   HWND hWnd = CreateWindowW(szWindowClass, szTitle, WS_OVERLAPPEDWINDOW,
      CW_USEDEFAULT, 0, CW_USEDEFAULT, 0, nullptr, nullptr, hInstance, nullptr);

   if (!hWnd)
   {
      return FALSE;
   }

   SciterSetCallback(hWnd, SciterCallback, NULL);

   SciterLoadFile(hWnd, TEXT("res:main.html"));
   
   ShowWindow(hWnd, nCmdShow);
   UpdateWindow(hWnd);

   return TRUE;
}

//
//  FUNCTION: WndProc(HWND, UINT, WPARAM, LPARAM)
//
//  PURPOSE: Processes messages for the main window.
//
//  WM_COMMAND  - process the application menu
//  WM_PAINT    - Paint the main window
//  WM_DESTROY  - post a quit message and return
//
//
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_COMMAND:
        {
            int wmId = LOWORD(wParam);
            // Parse the menu selections:
            switch (wmId)
            {
            case IDM_ABOUT:
                {
                  SciterCall(hWnd, "about", 0, NULL, NULL);
                }
                break;
            case IDM_EXIT:
                DestroyWindow(hWnd);
                break;
            default:
                return DefWindowProc(hWnd, message, wParam, lParam);
            }
        }
        break;
    case WM_DESTROY:
        PostQuitMessage(0);
        // fall through, SciterProcND also needs WM_DESTROY
    default:
// SCITER+++
    {
      BOOL bHandled = FALSE;
      LRESULT lResult = ::SciterProcND(hWnd, message, wParam, lParam, &bHandled);
      if (bHandled) return lResult;
      return ::DefWindowProc(hWnd, message, wParam, lParam);
    }
// SCITER---
    }
    return 0;
}

// SCITER+++

// handle SC_LOAD_DATA requests - get data from resources of this application
UINT DoLoadData(LPSCN_LOAD_DATA pnmld)
{
  LPCBYTE pb = 0; UINT cb = 0;
  aux::wchars wu = aux::chars_of(pnmld->uri);
  if (wu.like(WSTR("res:*")))
  {
    // then by calling possibly overloaded load_resource_data method
    if (sciter::load_resource_data(hInst, wu.start + 4, pb, cb))
      ::SciterDataReady(pnmld->hwnd, pnmld->uri, pb, cb);
  }
  return LOAD_OK;
}

// fulfill SC_ATTACH_BEHAVIOR request - native DOM element implementations
UINT DoAttachBehavior(LPSCN_ATTACH_BEHAVIOR lpab)
{
  sciter::event_handler *pb = sciter::behavior_factory::create(lpab->behaviorName, lpab->element);
  if (pb)
  {
    lpab->elementTag = pb;
    lpab->elementProc = sciter::event_handler::element_proc;
    return TRUE;
  }
  return FALSE;
}

UINT SC_CALLBACK SciterCallback(LPSCITER_CALLBACK_NOTIFICATION pns, LPVOID callbackParam)
{
  // here are all notifiactions
  switch (pns->code)
  {
  case SC_LOAD_DATA:          return DoLoadData((LPSCN_LOAD_DATA)pns);
  case SC_ATTACH_BEHAVIOR:    return DoAttachBehavior((LPSCN_ATTACH_BEHAVIOR)pns);
  }
  return 0;
}
// SCITER ---

