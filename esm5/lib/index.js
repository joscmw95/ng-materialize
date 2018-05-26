/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
export { MaterializeDirective } from "./materialize.directive";
export { MaterializeModule } from "./materialize.module";
if ("undefined" != typeof window && !("Materialize" in window)) {
    throw new Error("Couldn't find Materialize object on window. It is created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}
if ("undefined" != typeof window && !("Waves" in window)) {
    throw new Error("Couldn't find Waves object on window. It is supposed to be created by the materialize-css library. Please import materialize-css before importing angular2-materialize.");
}
/**
 * @param {...?} args
 * @return {?}
 */
export function toast() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    Materialize.toast.apply(Materialize, tslib_1.__spread(args));
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tYXRlcmlhbGl6ZS8iLCJzb3VyY2VzIjpbImxpYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBcUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUUsT0FBTyxNQUFNLElBQUksQ0FBQyxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxnS0FBZ0ssQ0FBQyxDQUFDO0NBQ25MO0FBQ0QsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFFLE9BQU8sTUFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sSUFBSSxLQUFLLENBQUMseUtBQXlLLENBQUMsQ0FBQztDQUM1TDs7Ozs7QUFLRCxNQUFNO0lBQWdCLGNBQU87U0FBUCxVQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPO1FBQVAseUJBQU87O0lBQzNCLFdBQVcsQ0FBQyxLQUFLLE9BQWpCLFdBQVcsbUJBQVUsSUFBSSxHQUFFO0NBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgTWF0ZXJpYWxpemVEaXJlY3RpdmUsIE1hdGVyaWFsaXplQWN0aW9uIH0gZnJvbSBcIi4vbWF0ZXJpYWxpemUuZGlyZWN0aXZlXCI7XHJcbmV4cG9ydCB7IE1hdGVyaWFsaXplTW9kdWxlIH0gZnJvbSBcIi4vbWF0ZXJpYWxpemUubW9kdWxlXCI7XHJcblxyXG5pZiAoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyAmJiAhKFwiTWF0ZXJpYWxpemVcIiBpbiB3aW5kb3cpKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBNYXRlcmlhbGl6ZSBvYmplY3Qgb24gd2luZG93LiBJdCBpcyBjcmVhdGVkIGJ5IHRoZSBtYXRlcmlhbGl6ZS1jc3MgbGlicmFyeS4gUGxlYXNlIGltcG9ydCBtYXRlcmlhbGl6ZS1jc3MgYmVmb3JlIGltcG9ydGluZyBhbmd1bGFyMi1tYXRlcmlhbGl6ZS5cIik7XHJcbn1cclxuaWYgKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cgJiYgIShcIldhdmVzXCIgaW4gd2luZG93KSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgV2F2ZXMgb2JqZWN0IG9uIHdpbmRvdy4gSXQgaXMgc3VwcG9zZWQgdG8gYmUgY3JlYXRlZCBieSB0aGUgbWF0ZXJpYWxpemUtY3NzIGxpYnJhcnkuIFBsZWFzZSBpbXBvcnQgbWF0ZXJpYWxpemUtY3NzIGJlZm9yZSBpbXBvcnRpbmcgYW5ndWxhcjItbWF0ZXJpYWxpemUuXCIpO1xyXG59XHJcblxyXG5kZWNsYXJlIHZhciBXYXZlczogYW55O1xyXG5kZWNsYXJlIHZhciBNYXRlcmlhbGl6ZTogYW55O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvYXN0KC4uLmFyZ3MpIHtcclxuICBNYXRlcmlhbGl6ZS50b2FzdCguLi5hcmdzKTtcclxufSJdfQ==