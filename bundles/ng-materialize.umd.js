(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-materialize', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ng-materialize'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,core,common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
        if (detail === void 0) {
            detail = undefined;
        }
        if (params === void 0) {
            params = { bubbles: false, cancelable: false };
        }
        var /** @type {?} */ event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, params.bubbles, params.cancelable, detail);
        return event;
    }
    if ("undefined" != typeof window && "Event" in window) {
        CustomEvent.prototype = ((window)).Event.prototype;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterializeDirective = (function () {
        function MaterializeDirective(platformId, _el) {
            this.platformId = platformId;
            this._el = _el;
            this._params = null;
            this._functionName = null;
            this.previousValue = null;
            this.previousDisabled = false;
            this._waitFunction = {};
            this.isBrowser = common.isPlatformBrowser(this.platformId);
            this.changeListenerShouldBeAdded = true;
            this.init = new core.EventEmitter();
            this.initialized = false;
        }
        Object.defineProperty(MaterializeDirective.prototype, "materializeParams", {
            set: /**
             * @param {?} params
             * @return {?}
             */ function (params) {
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
             */ function (actions) {
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
             */ function (functionName) {
                this._functionName = functionName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MaterializeDirective.prototype, "materializeSelectOptions", {
            set: /**
             * @param {?} options
             * @return {?}
             */ function (options) {
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
                    jQueryElement.on("change", function (e) { return nativeElement_2.dispatchEvent(((CustomEvent("input")))); });
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
                        jqueryPickerElement_1.on('change', function (e) { return nativeElement_3.dispatchEvent(((CustomEvent("input")))); });
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
                        jqueryPickerElement_2.on('change', function (e) { return nativeElement_4.dispatchEvent(((CustomEvent("input")))); });
                    });
                }
                if (this.isChips()) {
                    var /** @type {?} */ nativeElement_5 = this._el.nativeElement;
                    var /** @type {?} */ jQueryElement = $(nativeElement_5);
                    jQueryElement.on("chip.add", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.add", chip)))); });
                    jQueryElement.on("chip.delete", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.delete", chip)))); });
                    jQueryElement.on("chip.select", function (e, chip) { return nativeElement_5.dispatchEvent(((CustomEvent("chip.select", chip)))); });
                }
                if (this.isTextarea()) {
                    this._el.nativeElement.dispatchEvent(((CustomEvent("autoresize", {
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
                if (functionName === void 0) {
                    functionName = this._functionName;
                }
                if (params === void 0) {
                    params = this._params;
                }
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
            { type: core.Directive, args: [{
                        selector: '[materialize]'
                    },] },
        ];
        /** @nocollapse */
        MaterializeDirective.ctorParameters = function () {
            return [
                { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] },] },
                { type: core.ElementRef, },
            ];
        };
        MaterializeDirective.propDecorators = {
            "init": [{ type: core.Output },],
            "materializeParams": [{ type: core.Input },],
            "materializeActions": [{ type: core.Input },],
            "materialize": [{ type: core.Input },],
            "materializeSelectOptions": [{ type: core.Input },],
            "ngModel": [{ type: core.Input },],
        };
        return MaterializeDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterializeModule = (function () {
        function MaterializeModule() {
        }
        MaterializeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule],
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

    exports.MaterializeDirective = MaterializeDirective;
    exports.MaterializeModule = MaterializeModule;
    exports.toast = toast;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWxpemUudW1kLmpzLm1hcCIsInNvdXJjZXMiOltudWxsLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9jdXN0b20tZXZlbnQtcG9seWZpbGwudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9tYXRlcmlhbGl6ZS5kaXJlY3RpdmUudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9tYXRlcmlhbGl6ZS5tb2R1bGUudHMiLCJuZzovL25nLW1hdGVyaWFsaXplL2xpYi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBDdXN0b21FdmVudCAoIHR5cGUsIGRldGFpbCA9IHVuZGVmaW5lZCwgcGFyYW1zID0geyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UgfSApIHtcclxuICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCAnQ3VzdG9tRXZlbnQnICk7XHJcbiAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoIHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgZGV0YWlsICk7XHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbn1cclxuaWYgKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cgJiYgXCJFdmVudFwiIGluIHdpbmRvdykge1xyXG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gKHdpbmRvdyBhcyBhbnkpLkV2ZW50LnByb3RvdHlwZTtcclxufSIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRG9DaGVjayxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIEFmdGVyVmlld0luaXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgUExBVEZPUk1fSUQsXG4gIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEN1c3RvbUV2ZW50IH0gZnJvbSAnLi9jdXN0b20tZXZlbnQtcG9seWZpbGwnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5kZWNsYXJlIHZhciAkOiBhbnk7XG5kZWNsYXJlIHZhciBNYXRlcmlhbGl6ZTogYW55O1xuXG4vLyBleHBvcnQgdHlwZSBNYXRlcmlhbGl6ZU9wdGlvbnMgPVxuLy8gXCJjb2xsYXBzaWJsZVwiIHxcbi8vIFwiZHJvcGRvd25cIiB8XG4vLyBcIm1hdGVyaWFsYm94XCIgfFxuLy8gXCJ0YWJzXCIgfFxuLy8gXCJ0b29sdGlwXCIgfFxuLy8gXCJjaGFyYWN0ZXJDb3VudGVyXCIgfFxuLy8gXCJtYXRlcmlhbF9zZWxlY3RcIiB8XG4vLyBcInNpZGVOYXZcIiB8XG4vLyBcIm1vZGFsXCI7XG5cbi8vIFxuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGVyaWFsaXplQWN0aW9uIHtcbiAgYWN0aW9uOiBzdHJpbmc7XG4gIHBhcmFtczogYW55W107XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1ttYXRlcmlhbGl6ZV0nXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsaXplRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3BhcmFtczogYW55W10gPSBudWxsO1xuICBwcml2YXRlIF9mdW5jdGlvbk5hbWU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNWYWx1ZSA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNEaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF93YWl0RnVuY3Rpb246IGFueSA9IHt9O1xuICBwcml2YXRlIGlzQnJvd3NlcjogYm9vbGVhbiA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG5cbiAgcHJpdmF0ZSBjaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LCBwcml2YXRlIF9lbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRVcGRhdGVzKCk7XG4gICAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplQWN0aW9ucyhhY3Rpb25zOiBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgTWF0ZXJpYWxpemVBY3Rpb24+KSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBhY3Rpb25zLnN1YnNjcmliZSgoYWN0aW9uOiBzdHJpbmcgfCBNYXRlcmlhbGl6ZUFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhhY3Rpb24uYWN0aW9uLCBhY3Rpb24ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemUoZnVuY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuX2Z1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uTmFtZTtcbiAgfVxuXG4gIC8vIHRoaXMgaXMgaGVyZSB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHNlbGVjdCBlbGVtZW50c1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplU2VsZWN0T3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgfVxuXG4gIC8vdXNlZCBmb3IgdGhlIGRhdGVwaWNrZXIgYXQgdGhlIG1vbWVudFxuICBASW5wdXQoKSBuZ01vZGVsO1xuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKF91bnVzZWQ/KSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdCgpKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFJlbW90aW9uKCk7XG4gICAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdEb0NoZWNrKCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSkge1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChuYXRpdmVFbGVtZW50LmRpc2FibGVkICE9IHRoaXMucHJldmlvdXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0Rpc2FibGVkID0gbmF0aXZlRWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFqUXVlcnlFbGVtZW50LmF0dHIoXCJtdWx0aXBsZVwiKSAmJiBuYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHNlbGVjdCBjaGFuZ2VzIG9mIHRoZSBtb2RlbFxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gbmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVGV4dGFyZWEoKSkge1xuICAgICAgICAgICAgICBpZiAobmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtRWxlbWVudFJlbW90aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBjb25zdCB0b29sdGlwSWQgPSBqUXVlcnlFbGVtZW50LmF0dHIoJ2RhdGEtdG9vbHRpcC1pZCcpO1xuICAgICAgICAgIGlmICh0b29sdGlwSWQpIHtcbiAgICAgICAgICAgICAgJCgnIycgKyB0b29sdGlwSWQpLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUVsZW1lbnRVcGRhdGVzKCkge1xuICAgICAgLy8gaXQgc2hvdWxkIGhhdmUgYmVlbiBjcmVhdGVkIGJ5IG5vdywgYnV0IGNvbmZpcm0gYW55d2F5XG4gICAgICBpZiAoTWF0ZXJpYWxpemUgJiYgTWF0ZXJpYWxpemUudXBkYXRlVGV4dEZpZWxkcykge1xuICAgICAgICAgIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIHNlbGVjdCBjaGFuZ2VzIGZyb20gdGhlIEhUTUxcbiAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkgJiYgdGhpcy5jaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWUub3JpZ2luYWxFdmVudCB8fCAhZS5vcmlnaW5hbEV2ZW50LmludGVybmFsVG9NYXRlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQ6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAvL2lmIChqUXVlcnlFbGVtZW50LmF0dHIoXCJtdWx0aXBsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgLy9ldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJpbnB1dFwiLGZhbHNlLGZhbHNlLHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJjaGFuZ2VcIiwgZmFsc2UsIGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVybmFsVG9NYXRlcmlhbGl6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNBdXRvY29tcGxldGUoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoYW5nZVwiLCBlID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImlucHV0XCIpKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0RhdGVQaWNrZXIoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpxdWVyeVBpY2tlckVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgY29uc3QgZGF0ZVBpY2tlciA9IGpxdWVyeVBpY2tlckVsZW1lbnRbdGhpcy5fZnVuY3Rpb25OYW1lXSguLi50aGlzLl9wYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHBpY2tlciA9IGRhdGVQaWNrZXIucGlja2FkYXRlKCdwaWNrZXInKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubmdNb2RlbCkgeyAvLyBQUiAyOTIgLSAxXG4gICAgICAgICAgICAgICAgICBwaWNrZXIuc2V0KCdzZWxlY3QnLCB0aGlzLm5nTW9kZWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBqcXVlcnlQaWNrZXJFbGVtZW50LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBwaWNrZXIuc2V0KCdzZWxlY3QnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAganF1ZXJ5UGlja2VyRWxlbWVudC5vbignY2hhbmdlJywgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNUaW1lUGlja2VyKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqcXVlcnlQaWNrZXJFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGNvbnN0IHRpbWVQaWNrZXIgPSBqcXVlcnlQaWNrZXJFbGVtZW50W3RoaXMuX2Z1bmN0aW9uTmFtZV0oLi4udGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBwaWNrZXIgPSB0aW1lUGlja2VyLnBpY2thdGltZSgncGlja2VyJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm5nTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgIHBpY2tlci52YWwodGhpcy5uZ01vZGVsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBpY2tlci52YWwoanF1ZXJ5UGlja2VyRWxlbWVudC52YWwoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAganF1ZXJ5UGlja2VyRWxlbWVudC5vbignY2hhbmdlJywgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNDaGlwcygpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuYWRkXCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLmFkZFwiLCBjaGlwKSkpKTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5kZWxldGVcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuZGVsZXRlXCIsIGNoaXApKSkpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLnNlbGVjdFwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5zZWxlY3RcIiwgY2hpcCkpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVGV4dGFyZWEoKSkge1xuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImF1dG9yZXNpemVcIiwge1xuICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICAgICAgICB9KSkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGZ1bmN0aW9uTmFtZSA9IHRoaXMuX2Z1bmN0aW9uTmFtZSwgcGFyYW1zID0gdGhpcy5fcGFyYW1zKSB7XG4gICAgICBpZiAodGhpcy5fd2FpdEZ1bmN0aW9uW2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdID0gdHJ1ZTtcblxuICAgICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoZnVuY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAoalF1ZXJ5RWxlbWVudFtmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSguLi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtcyBoYXMgdG8gYmUgYW4gYXJyYXkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5RWxlbWVudFtmdW5jdGlvbk5hbWVdKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byBydW5uaW5nIHRoaXMgZnVuY3Rpb24gb24gdGhlIGdsb2JhbCBNYXRlcmlhbGl6ZSBvYmplY3RcbiAgICAgICAgICAgICAgICAgIGlmIChNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtcyBoYXMgdG8gYmUgYW4gYXJyYXkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBtYXRlcmlhbGl6ZSBmdW5jdGlvbiAnJ1wiICsgZnVuY3Rpb25OYW1lICsgXCInIG9uIGVsZW1lbnQgb3IgdGhlIGdsb2JhbCBNYXRlcmlhbGl6ZSBvYmplY3QuXCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdC5lbWl0KCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzVG9vbHRpcCgpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJ0b29sdGlwXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1NlbGVjdCgpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJtYXRlcmlhbF9zZWxlY3RcIik7XG4gIH1cblxuICBwcml2YXRlIGlzRGF0ZVBpY2tlcigpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJwaWNrYWRhdGVcIik7XG4gIH1cblxuICBwcml2YXRlIGlzVGltZVBpY2tlcigpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJwaWNrYXRpbWVcIik7XG4gIH1cblxuICBwcml2YXRlIGlzQ2hpcHMoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwibWF0ZXJpYWxfY2hpcFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBdXRvY29tcGxldGUoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwiYXV0b2NvbXBsZXRlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1RleHRhcmVhKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT0gXCJURVhUQVJFQVwiO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVEUEJ1dHRvbnMoKSB7XG4gICAgICAkKCcucGlja2VyX19jbGVhcicpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX3RvZGF5JykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fY2xvc2UnKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX19zZWxlY3QtLXllYXInKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX19zZWxlY3QtLW1vbnRoJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0ZXJpYWxpemVEaXJlY3RpdmUgfSBmcm9tICcuL21hdGVyaWFsaXplLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTWF0ZXJpYWxpemVEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbTWF0ZXJpYWxpemVEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsaXplTW9kdWxlIHsgfVxuIiwiZXhwb3J0IHsgTWF0ZXJpYWxpemVEaXJlY3RpdmUsIE1hdGVyaWFsaXplQWN0aW9uIH0gZnJvbSBcIi4vbWF0ZXJpYWxpemUuZGlyZWN0aXZlXCI7XHJcbmV4cG9ydCB7IE1hdGVyaWFsaXplTW9kdWxlIH0gZnJvbSBcIi4vbWF0ZXJpYWxpemUubW9kdWxlXCI7XHJcblxyXG5pZiAoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyAmJiAhKFwiTWF0ZXJpYWxpemVcIiBpbiB3aW5kb3cpKSB7XHJcbiAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBNYXRlcmlhbGl6ZSBvYmplY3Qgb24gd2luZG93LiBJdCBpcyBjcmVhdGVkIGJ5IHRoZSBtYXRlcmlhbGl6ZS1jc3MgbGlicmFyeS4gUGxlYXNlIGltcG9ydCBtYXRlcmlhbGl6ZS1jc3MgYmVmb3JlIGltcG9ydGluZyBhbmd1bGFyMi1tYXRlcmlhbGl6ZS5cIik7XHJcbn1cclxuaWYgKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cgJiYgIShcIldhdmVzXCIgaW4gd2luZG93KSkge1xyXG4gIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgV2F2ZXMgb2JqZWN0IG9uIHdpbmRvdy4gSXQgaXMgc3VwcG9zZWQgdG8gYmUgY3JlYXRlZCBieSB0aGUgbWF0ZXJpYWxpemUtY3NzIGxpYnJhcnkuIFBsZWFzZSBpbXBvcnQgbWF0ZXJpYWxpemUtY3NzIGJlZm9yZSBpbXBvcnRpbmcgYW5ndWxhcjItbWF0ZXJpYWxpemUuXCIpO1xyXG59XHJcblxyXG5kZWNsYXJlIHZhciBXYXZlczogYW55O1xyXG5kZWNsYXJlIHZhciBNYXRlcmlhbGl6ZTogYW55O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvYXN0KC4uLmFyZ3MpIHtcclxuICBNYXRlcmlhbGl6ZS50b2FzdCguLi5hcmdzKTtcclxufSJdLCJuYW1lcyI6WyJpc1BsYXRmb3JtQnJvd3NlciIsIkV2ZW50RW1pdHRlciIsIkRpcmVjdGl2ZSIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiRWxlbWVudFJlZiIsIk91dHB1dCIsIklucHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFBOzs7Ozs7Ozs7Ozs7OztBQWNBLG9CQWlHdUIsQ0FBQyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLENBQUM7WUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJO1lBQ0EsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSTtnQkFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5RTtRQUNELE9BQU8sS0FBSyxFQUFFO1lBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFD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