import { __spread } from 'tslib';
import { Directive, ElementRef, Input, Output, EventEmitter, PLATFORM_ID, Inject, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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
function CustomEvent(type, detail, params) {
    if (detail === void 0) { detail = undefined; }
    if (params === void 0) { params = { bubbles: false, cancelable: false }; }
    var /** @type {?} */ event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, params.bubbles, params.cancelable, detail);
    return event;
}
if ("undefined" != typeof window && "Event" in window) {
    CustomEvent.prototype = (/** @type {?} */ (window)).Event.prototype;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterializeDirective = /** @class */ (function () {
    function MaterializeDirective(platformId, _el) {
        this.platformId = platformId;
        this._el = _el;
        this._params = null;
        this._functionName = null;
        this.previousValue = null;
        this.previousDisabled = false;
        this._waitFunction = {};
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.changeListenerShouldBeAdded = true;
        this.init = new EventEmitter();
        this.initialized = false;
    }
    Object.defineProperty(MaterializeDirective.prototype, "materializeParams", {
        set: /**
         * @param {?} params
         * @return {?}
         */
        function (params) {
            if (this.isBrowser) {
                this._params = params;
                this.performElementUpdates();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeActions", {
        set: /**
         * @param {?} actions
         * @return {?}
         */
        function (actions) {
            var _this = this;
            if (this.isBrowser) {
                actions.subscribe(function (action) {
                    window.setTimeout(function () {
                        if (typeof action === "string") {
                            _this.performLocalElementUpdates(action);
                        }
                        else {
                            _this.performLocalElementUpdates(action.action, action.params);
                        }
                    }, 1);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materialize", {
        set: /**
         * @param {?} functionName
         * @return {?}
         */
        function (functionName) {
            this._functionName = functionName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MaterializeDirective.prototype, "materializeSelectOptions", {
        set: /**
         * @param {?} options
         * @return {?}
         */
        function (options) {
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            this.performElementUpdates();
        }
    };
    /**
     * @param {?=} _unused
     * @return {?}
     */
    MaterializeDirective.prototype.ngOnChanges = /**
     * @param {?=} _unused
     * @return {?}
     */
    function (_unused) {
        var _this = this;
        if (this.isBrowser) {
            if (this.isSelect()) {
                setTimeout(function () { return _this.performLocalElementUpdates(); }, 10);
            }
        }
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            this.performElementRemotion();
        }
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.isBrowser) {
            var /** @type {?} */ nativeElement = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement);
            if (this.isSelect()) {
                var /** @type {?} */ shouldUpdate = false;
                if (nativeElement.disabled != this.previousDisabled) {
                    this.previousDisabled = nativeElement.disabled;
                    shouldUpdate = true;
                }
                if (!jQueryElement.attr("multiple") && nativeElement.value != this.previousValue) {
                    // handle select changes of the model
                    this.previousValue = nativeElement.value;
                    shouldUpdate = true;
                }
                if (shouldUpdate) {
                    this.performLocalElementUpdates();
                }
            }
            else if (this.isTextarea()) {
                if (nativeElement.value != this.previousValue) {
                    this.previousValue = nativeElement.value;
                    this.performElementUpdates();
                }
            }
        }
        return false;
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.performElementRemotion = /**
     * @return {?}
     */
    function () {
        if (this.isTooltip()) {
            var /** @type {?} */ nativeElement = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement);
            var /** @type {?} */ tooltipId = jQueryElement.attr('data-tooltip-id');
            if (tooltipId) {
                $('#' + tooltipId).remove();
            }
        }
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.performElementUpdates = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // it should have been created by now, but confirm anyway
        if (Materialize && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
        // handle select changes from the HTML
        if (this.isSelect() && this.changeListenerShouldBeAdded) {
            var /** @type {?} */ nativeElement_1 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_1);
            jQueryElement.on("change", function (e) {
                if (!e.originalEvent || !e.originalEvent.internalToMaterialize) {
                    var /** @type {?} */ event_1 = document.createEvent("CustomEvent");
                    //if (jQueryElement.attr("multiple")) {
                    //event.initCustomEvent("input",false,false,undefined);
                    //}
                    //else {
                    //if (jQueryElement.attr("multiple")) {
                    //event.initCustomEvent("input",false,false,undefined);
                    //}
                    //else {
                    event_1.initCustomEvent("change", false, false, undefined);
                    //}
                    //}
                    event_1.internalToMaterialize = true;
                    nativeElement_1.dispatchEvent(event_1);
                }
            });
            this.changeListenerShouldBeAdded = false;
        }
        if (this.isAutocomplete()) {
            var /** @type {?} */ nativeElement_2 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_2);
            jQueryElement.on("change", function (e) { return nativeElement_2.dispatchEvent((/** @type {?} */ (CustomEvent("input")))); });
        }
        if (this.isDatePicker()) {
            var /** @type {?} */ nativeElement_3 = this._el.nativeElement;
            var /** @type {?} */ jqueryPickerElement_1 = $(nativeElement_3);
            var /** @type {?} */ datePicker = jqueryPickerElement_1[this._functionName].apply(jqueryPickerElement_1, __spread(this._params));
            var /** @type {?} */ picker_1 = datePicker.pickadate('picker');
            setTimeout(function () {
                if (_this.ngModel) {
                    // PR 292 - 1
                    picker_1.set('select', _this.ngModel);
                }
                else {
                    var /** @type {?} */ value = jqueryPickerElement_1.val();
                    if (value && value.length > 0) {
                        picker_1.set('select', value);
                    }
                }
                jqueryPickerElement_1.on('change', function (e) { return nativeElement_3.dispatchEvent((/** @type {?} */ (CustomEvent("input")))); });
            });
        }
        if (this.isTimePicker()) {
            var /** @type {?} */ nativeElement_4 = this._el.nativeElement;
            var /** @type {?} */ jqueryPickerElement_2 = $(nativeElement_4);
            var /** @type {?} */ timePicker = jqueryPickerElement_2[this._functionName].apply(jqueryPickerElement_2, __spread(this._params));
            var /** @type {?} */ picker_2 = timePicker.pickatime('picker');
            setTimeout(function () {
                if (_this.ngModel) {
                    picker_2.val(_this.ngModel);
                }
                else {
                    picker_2.val(jqueryPickerElement_2.val());
                }
                jqueryPickerElement_2.on('change', function (e) { return nativeElement_4.dispatchEvent((/** @type {?} */ (CustomEvent("input")))); });
            });
        }
        if (this.isChips()) {
            var /** @type {?} */ nativeElement_5 = this._el.nativeElement;
            var /** @type {?} */ jQueryElement = $(nativeElement_5);
            jQueryElement.on("chip.add", function (e, chip) { return nativeElement_5.dispatchEvent((/** @type {?} */ (CustomEvent("chip.add", chip)))); });
            jQueryElement.on("chip.delete", function (e, chip) { return nativeElement_5.dispatchEvent((/** @type {?} */ (CustomEvent("chip.delete", chip)))); });
            jQueryElement.on("chip.select", function (e, chip) { return nativeElement_5.dispatchEvent((/** @type {?} */ (CustomEvent("chip.select", chip)))); });
        }
        if (this.isTextarea()) {
            this._el.nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("autoresize", {
                bubbles: true,
                cancelable: false,
                detail: undefined
            }))));
        }
        this.performLocalElementUpdates();
    };
    /**
     * @param {?=} functionName
     * @param {?=} params
     * @return {?}
     */
    MaterializeDirective.prototype.performLocalElementUpdates = /**
     * @param {?=} functionName
     * @param {?=} params
     * @return {?}
     */
    function (functionName, params) {
        var _this = this;
        if (functionName === void 0) { functionName = this._functionName; }
        if (params === void 0) { params = this._params; }
        if (this._waitFunction[functionName]) {
            return;
        }
        this._waitFunction[functionName] = true;
        $(document).ready(function () {
            _this._waitFunction[functionName] = false;
            if (functionName) {
                var /** @type {?} */ jQueryElement = $(_this._el.nativeElement);
                if (jQueryElement[functionName]) {
                    if (params) {
                        if (params instanceof Array) {
                            jQueryElement[functionName].apply(jQueryElement, __spread(params));
                        }
                        else {
                            throw new Error("Params has to be an array.");
                        }
                    }
                    else {
                        jQueryElement[functionName]();
                    }
                }
                else {
                    // fallback to running this function on the global Materialize object
                    if (Materialize[functionName]) {
                        if (params) {
                            if (params instanceof Array) {
                                Materialize[functionName].apply(Materialize, __spread(params));
                            }
                            else {
                                throw new Error("Params has to be an array.");
                            }
                        }
                        else {
                            Materialize[functionName]();
                        }
                    }
                    else {
                        throw new Error("Couldn't find materialize function ''" + functionName + "' on element or the global Materialize object.");
                    }
                }
                if (!_this.initialized) {
                    _this.initialized = true;
                    _this.init.emit();
                }
            }
        });
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTooltip = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "tooltip");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isSelect = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "material_select");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isDatePicker = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "pickadate");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTimePicker = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "pickatime");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isChips = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "material_chip");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isAutocomplete = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "autocomplete");
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.isTextarea = /**
     * @return {?}
     */
    function () {
        return this._el.nativeElement.nodeName == "TEXTAREA";
    };
    /**
     * @return {?}
     */
    MaterializeDirective.prototype.enableDPButtons = /**
     * @return {?}
     */
    function () {
        $('.picker__clear').removeAttr("disabled");
        $('.picker__today').removeAttr("disabled");
        $('.picker__close').removeAttr("disabled");
        $('.picker__select--year').removeAttr("disabled");
        $('.picker__select--month').removeAttr("disabled");
    };
    MaterializeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[materialize]'
                },] },
    ];
    /** @nocollapse */
    MaterializeDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: ElementRef, },
    ]; };
    MaterializeDirective.propDecorators = {
        "init": [{ type: Output },],
        "materializeParams": [{ type: Input },],
        "materializeActions": [{ type: Input },],
        "materialize": [{ type: Input },],
        "materializeSelectOptions": [{ type: Input },],
        "ngModel": [{ type: Input },],
    };
    return MaterializeDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterializeModule = /** @class */ (function () {
    function MaterializeModule() {
    }
    MaterializeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [MaterializeDirective],
                    exports: [MaterializeDirective]
                },] },
    ];
    return MaterializeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
function toast() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    Materialize.toast.apply(Materialize, __spread(args));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MaterializeDirective, MaterializeModule, toast };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWxpemUuanMubWFwIiwic291cmNlcyI6WyJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9jdXN0b20tZXZlbnQtcG9seWZpbGwudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9tYXRlcmlhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9tYXRlcmlhbGl6ZS5tb2R1bGUudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKCB0eXBlLCBkZXRhaWwgPSB1bmRlZmluZWQsIHBhcmFtcyA9IHsgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlIH0gKSB7XHJcbiAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCggJ0N1c3RvbUV2ZW50JyApO1xyXG4gICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KCB0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIGRldGFpbCApO1xyXG4gICAgcmV0dXJuIGV2ZW50O1xyXG59XHJcbmlmIChcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93ICYmIFwiRXZlbnRcIiBpbiB3aW5kb3cpIHtcclxuICAgIEN1c3RvbUV2ZW50LnByb3RvdHlwZSA9ICh3aW5kb3cgYXMgYW55KS5FdmVudC5wcm90b3R5cGU7XHJcbn0iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIERvQ2hlY2ssXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21FdmVudCB9IGZyb20gJy4vY3VzdG9tLWV2ZW50LXBvbHlmaWxsJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgTWF0ZXJpYWxpemU6IGFueTtcblxuLy8gZXhwb3J0IHR5cGUgTWF0ZXJpYWxpemVPcHRpb25zID1cbi8vIFwiY29sbGFwc2libGVcIiB8XG4vLyBcImRyb3Bkb3duXCIgfFxuLy8gXCJtYXRlcmlhbGJveFwiIHxcbi8vIFwidGFic1wiIHxcbi8vIFwidG9vbHRpcFwiIHxcbi8vIFwiY2hhcmFjdGVyQ291bnRlclwiIHxcbi8vIFwibWF0ZXJpYWxfc2VsZWN0XCIgfFxuLy8gXCJzaWRlTmF2XCIgfFxuLy8gXCJtb2RhbFwiO1xuXG4vLyBcblxuZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbGl6ZUFjdGlvbiB7XG4gIGFjdGlvbjogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0ZXJpYWxpemVdJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbGl6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9wYXJhbXM6IGFueVtdID0gbnVsbDtcbiAgcHJpdmF0ZSBfZnVuY3Rpb25OYW1lOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzVmFsdWUgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfd2FpdEZ1bmN0aW9uOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBpc0Jyb3dzZXI6IGJvb2xlYW4gPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuXG4gIHByaXZhdGUgY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcHVibGljIGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCwgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemVQYXJhbXMocGFyYW1zOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZUFjdGlvbnMoYWN0aW9uczogRXZlbnRFbWl0dGVyPHN0cmluZyB8IE1hdGVyaWFsaXplQWN0aW9uPikge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgYWN0aW9ucy5zdWJzY3JpYmUoKGFjdGlvbjogc3RyaW5nIHwgTWF0ZXJpYWxpemVBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoYWN0aW9uLmFjdGlvbiwgYWN0aW9uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH0pXG4gICAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplKGZ1bmN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgICB0aGlzLl9mdW5jdGlvbk5hbWUgPSBmdW5jdGlvbk5hbWU7XG4gIH1cblxuICAvLyB0aGlzIGlzIGhlcmUgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGZvciBzZWxlY3QgZWxlbWVudHNcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZVNlbGVjdE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gIH1cblxuICAvL3VzZWQgZm9yIHRoZSBkYXRlcGlja2VyIGF0IHRoZSBtb21lbnRcbiAgQElucHV0KCkgbmdNb2RlbDtcblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhfdW51c2VkPykge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nRG9DaGVjaygpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAobmF0aXZlRWxlbWVudC5kaXNhYmxlZCAhPSB0aGlzLnByZXZpb3VzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNEaXNhYmxlZCA9IG5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikgJiYgbmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBvZiB0aGUgbW9kZWxcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBuYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgdG9vbHRpcElkID0galF1ZXJ5RWxlbWVudC5hdHRyKCdkYXRhLXRvb2x0aXAtaWQnKTtcbiAgICAgICAgICBpZiAodG9vbHRpcElkKSB7XG4gICAgICAgICAgICAgICQoJyMnICsgdG9vbHRpcElkKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1FbGVtZW50VXBkYXRlcygpIHtcbiAgICAgIC8vIGl0IHNob3VsZCBoYXZlIGJlZW4gY3JlYXRlZCBieSBub3csIGJ1dCBjb25maXJtIGFueXdheVxuICAgICAgaWYgKE1hdGVyaWFsaXplICYmIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMpIHtcbiAgICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBmcm9tIHRoZSBIVE1MXG4gICAgICBpZiAodGhpcy5pc1NlbGVjdCgpICYmIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFlLm9yaWdpbmFsRXZlbnQgfHwgIWUub3JpZ2luYWxFdmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50OiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgLy9pZiAoalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgIC8vZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiaW5wdXRcIixmYWxzZSxmYWxzZSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICBldmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQXV0b2NvbXBsZXRlKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGFuZ2VcIiwgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNEYXRlUGlja2VyKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqcXVlcnlQaWNrZXJFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSBqcXVlcnlQaWNrZXJFbGVtZW50W3RoaXMuX2Z1bmN0aW9uTmFtZV0oLi4udGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBwaWNrZXIgPSBkYXRlUGlja2VyLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm5nTW9kZWwpIHsgLy8gUFIgMjkyIC0gMVxuICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdGhpcy5uZ01vZGVsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ganF1ZXJ5UGlja2VyRWxlbWVudC52YWwoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVGltZVBpY2tlcigpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QganF1ZXJ5UGlja2VyRWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBjb25zdCB0aW1lUGlja2VyID0ganF1ZXJ5UGlja2VyRWxlbWVudFt0aGlzLl9mdW5jdGlvbk5hbWVdKC4uLnRoaXMuX3BhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcGlja2VyID0gdGltZVBpY2tlci5waWNrYXRpbWUoJ3BpY2tlcicpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5uZ01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKHRoaXMubmdNb2RlbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKGpxdWVyeVBpY2tlckVsZW1lbnQudmFsKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ2hpcHMoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLmFkZFwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5hZGRcIiwgY2hpcCkpKSk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuZGVsZXRlXCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLmRlbGV0ZVwiLCBjaGlwKSkpKTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5zZWxlY3RcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuc2VsZWN0XCIsIGNoaXApKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJhdXRvcmVzaXplXCIsIHtcbiAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgICAgICAgfSkpKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhmdW5jdGlvbk5hbWUgPSB0aGlzLl9mdW5jdGlvbk5hbWUsIHBhcmFtcyA9IHRoaXMuX3BhcmFtcykge1xuICAgICAgaWYgKHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IHRydWU7XG5cbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnlFbGVtZW50W2Z1bmN0aW9uTmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcnVubmluZyB0aGlzIGZ1bmN0aW9uIG9uIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICBpZiAoTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0oKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgbWF0ZXJpYWxpemUgZnVuY3Rpb24gJydcIiArIGZ1bmN0aW9uTmFtZSArIFwiJyBvbiBlbGVtZW50IG9yIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0LlwiKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXQuZW1pdCgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Rvb2x0aXAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwidG9vbHRpcFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTZWxlY3QoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwibWF0ZXJpYWxfc2VsZWN0XCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0RhdGVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2FkYXRlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1RpbWVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2F0aW1lXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NoaXBzKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcIm1hdGVyaWFsX2NoaXBcIik7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0b2NvbXBsZXRlKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcImF1dG9jb21wbGV0ZVwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUZXh0YXJlYSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09IFwiVEVYVEFSRUFcIjtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlRFBCdXR0b25zKCkge1xuICAgICAgJCgnLnBpY2tlcl9fY2xlYXInKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX190b2RheScpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX2Nsb3NlJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS15ZWFyJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS1tb250aCcpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdGVyaWFsaXplRGlyZWN0aXZlIH0gZnJvbSAnLi9tYXRlcmlhbGl6ZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW01hdGVyaWFsaXplRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW01hdGVyaWFsaXplRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbGl6ZU1vZHVsZSB7IH1cbiIsImV4cG9ydCB7IE1hdGVyaWFsaXplRGlyZWN0aXZlLCBNYXRlcmlhbGl6ZUFjdGlvbiB9IGZyb20gXCIuL21hdGVyaWFsaXplLmRpcmVjdGl2ZVwiO1xyXG5leHBvcnQgeyBNYXRlcmlhbGl6ZU1vZHVsZSB9IGZyb20gXCIuL21hdGVyaWFsaXplLm1vZHVsZVwiO1xyXG5cclxuaWYgKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cgJiYgIShcIk1hdGVyaWFsaXplXCIgaW4gd2luZG93KSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgTWF0ZXJpYWxpemUgb2JqZWN0IG9uIHdpbmRvdy4gSXQgaXMgY3JlYXRlZCBieSB0aGUgbWF0ZXJpYWxpemUtY3NzIGxpYnJhcnkuIFBsZWFzZSBpbXBvcnQgbWF0ZXJpYWxpemUtY3NzIGJlZm9yZSBpbXBvcnRpbmcgYW5ndWxhcjItbWF0ZXJpYWxpemUuXCIpO1xyXG59XHJcbmlmIChcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93ICYmICEoXCJXYXZlc1wiIGluIHdpbmRvdykpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIFdhdmVzIG9iamVjdCBvbiB3aW5kb3cuIEl0IGlzIHN1cHBvc2VkIHRvIGJlIGNyZWF0ZWQgYnkgdGhlIG1hdGVyaWFsaXplLWNzcyBsaWJyYXJ5LiBQbGVhc2UgaW1wb3J0IG1hdGVyaWFsaXplLWNzcyBiZWZvcmUgaW1wb3J0aW5nIGFuZ3VsYXIyLW1hdGVyaWFsaXplLlwiKTtcclxufVxyXG5cclxuZGVjbGFyZSB2YXIgV2F2ZXM6IGFueTtcclxuZGVjbGFyZSB2YXIgTWF0ZXJpYWxpemU6IGFueTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2FzdCguLi5hcmdzKSB7XHJcbiAgTWF0ZXJpYWxpemUudG9hc3QoLi4uYXJncyk7XHJcbn0iXSwibmFtZXMiOltdLCJtYXBw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