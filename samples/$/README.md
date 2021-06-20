zepto.js is patched by [zepto.js.patch](zepto.js.patch) to use "mouseenter" instead of "mouseover" and "mouseleave" instead of "mouseout"

Sciter does not support "mouseover" and "mouseout" as they are quite expensive and mostly useless if UA supports "mouseenter" and "mouseleave".

This patch makes zepto working as in browsers as in Sciter.