/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} type
 * @param {?=} detail
 * @param {?=} params
 * @return {?}
 */
export function CustomEvent(type, detail = undefined, params = { bubbles: false, cancelable: false }) {
    var /** @type {?} */ event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, params.bubbles, params.cancelable, detail);
    return event;
}
if ("undefined" != typeof window && "Event" in window) {
    CustomEvent.prototype = (/** @type {?} */ (window)).Event.prototype;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWV2ZW50LXBvbHlmaWxsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWxpemUvIiwic291cmNlcyI6WyJsaWIvY3VzdG9tLWV2ZW50LXBvbHlmaWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxNQUFNLHNCQUF3QixJQUFJLEVBQUUsTUFBTSxHQUFHLFNBQVMsRUFBRSxNQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7SUFDbEcscUJBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUUsYUFBYSxDQUFFLENBQUM7SUFDbEQsS0FBSyxDQUFDLGVBQWUsQ0FBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBRSxDQUFDO0lBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUM7Q0FDaEI7QUFDRCxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUUsT0FBTyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDbEQsV0FBVyxDQUFDLFNBQVMsR0FBRyxtQkFBQyxNQUFhLEVBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0NBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIEN1c3RvbUV2ZW50ICggdHlwZSwgZGV0YWlsID0gdW5kZWZpbmVkLCBwYXJhbXMgPSB7IGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSB9ICkge1xyXG4gICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdDdXN0b21FdmVudCcgKTtcclxuICAgIGV2ZW50LmluaXRDdXN0b21FdmVudCggdHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBkZXRhaWwgKTtcclxuICAgIHJldHVybiBldmVudDtcclxufVxyXG5pZiAoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyAmJiBcIkV2ZW50XCIgaW4gd2luZG93KSB7XHJcbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSAod2luZG93IGFzIGFueSkuRXZlbnQucHJvdG90eXBlO1xyXG59Il19