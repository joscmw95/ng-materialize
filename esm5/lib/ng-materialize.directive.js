/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { CustomEvent } from './custom-event-polyfill';
import { isPlatformBrowser } from '@angular/common';
/**
 * @record
 */
export function MaterializeAction() { }
function MaterializeAction_tsickle_Closure_declarations() {
    /** @type {?} */
    MaterializeAction.prototype.action;
    /** @type {?} */
    MaterializeAction.prototype.params;
}
var NgMaterializeDirective = /** @class */ (function () {
    function NgMaterializeDirective(platformId, _el) {
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
    Object.defineProperty(NgMaterializeDirective.prototype, "materializeParams", {
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
    Object.defineProperty(NgMaterializeDirective.prototype, "materializeActions", {
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
    Object.defineProperty(NgMaterializeDirective.prototype, "materialize", {
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
    Object.defineProperty(NgMaterializeDirective.prototype, "materializeSelectOptions", {
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
    NgMaterializeDirective.prototype.ngAfterViewInit = /**
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
    NgMaterializeDirective.prototype.ngOnChanges = /**
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
    NgMaterializeDirective.prototype.ngOnDestroy = /**
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
    NgMaterializeDirective.prototype.ngDoCheck = /**
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
    NgMaterializeDirective.prototype.performElementRemotion = /**
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
    NgMaterializeDirective.prototype.performElementUpdates = /**
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
            var /** @type {?} */ datePicker = jqueryPickerElement_1[this._functionName].apply(jqueryPickerElement_1, tslib_1.__spread(this._params));
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
            var /** @type {?} */ timePicker = jqueryPickerElement_2[this._functionName].apply(jqueryPickerElement_2, tslib_1.__spread(this._params));
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
    NgMaterializeDirective.prototype.performLocalElementUpdates = /**
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
                            jQueryElement[functionName].apply(jQueryElement, tslib_1.__spread(params));
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
                                Materialize[functionName].apply(Materialize, tslib_1.__spread(params));
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
    NgMaterializeDirective.prototype.isTooltip = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "tooltip");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isSelect = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "material_select");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isDatePicker = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "pickadate");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isTimePicker = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "pickatime");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isChips = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "material_chip");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isAutocomplete = /**
     * @return {?}
     */
    function () {
        return (this._functionName && this._functionName === "autocomplete");
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.isTextarea = /**
     * @return {?}
     */
    function () {
        return this._el.nativeElement.nodeName == "TEXTAREA";
    };
    /**
     * @return {?}
     */
    NgMaterializeDirective.prototype.enableDPButtons = /**
     * @return {?}
     */
    function () {
        $('.picker__clear').removeAttr("disabled");
        $('.picker__today').removeAttr("disabled");
        $('.picker__close').removeAttr("disabled");
        $('.picker__select--year').removeAttr("disabled");
        $('.picker__select--month').removeAttr("disabled");
    };
    NgMaterializeDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[materialize]'
                },] },
    ];
    /** @nocollapse */
    NgMaterializeDirective.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
        { type: ElementRef, },
    ]; };
    NgMaterializeDirective.propDecorators = {
        "init": [{ type: Output },],
        "materializeParams": [{ type: Input },],
        "materializeActions": [{ type: Input },],
        "materialize": [{ type: Input },],
        "materializeSelectOptions": [{ type: Input },],
        "ngModel": [{ type: Input },],
    };
    return NgMaterializeDirective;
}());
export { NgMaterializeDirective };
function NgMaterializeDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgMaterializeDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgMaterializeDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgMaterializeDirective.propDecorators;
    /** @type {?} */
    NgMaterializeDirective.prototype._params;
    /** @type {?} */
    NgMaterializeDirective.prototype._functionName;
    /** @type {?} */
    NgMaterializeDirective.prototype.previousValue;
    /** @type {?} */
    NgMaterializeDirective.prototype.previousDisabled;
    /** @type {?} */
    NgMaterializeDirective.prototype._waitFunction;
    /** @type {?} */
    NgMaterializeDirective.prototype.isBrowser;
    /** @type {?} */
    NgMaterializeDirective.prototype.changeListenerShouldBeAdded;
    /** @type {?} */
    NgMaterializeDirective.prototype.init;
    /** @type {?} */
    NgMaterializeDirective.prototype.initialized;
    /** @type {?} */
    NgMaterializeDirective.prototype.ngModel;
    /** @type {?} */
    NgMaterializeDirective.prototype.platformId;
    /** @type {?} */
    NgMaterializeDirective.prototype._el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWxpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWxpemUvIiwic291cmNlcyI6WyJsaWIvbmctbWF0ZXJpYWxpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFLTixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7OztJQXdDbEQsZ0NBQXlDLFlBQTRCLEdBQWU7UUFBM0MsZUFBVSxHQUFWLFVBQVU7UUFBa0IsUUFBRyxHQUFILEdBQUcsQ0FBWTt1QkFaM0QsSUFBSTs2QkFDRyxJQUFJOzZCQUNaLElBQUk7Z0NBQ0QsS0FBSzs2QkFDSCxFQUFFO3lCQUNGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7MkNBRXpCLElBQUk7b0JBRWxCLElBQUksWUFBWSxFQUFROzJCQUMxQixLQUFLO0tBRzFCOzBCQUdVLHFEQUFpQjs7Ozs7a0JBQUMsTUFBVztZQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hDOzs7OzswQkFJTSxzREFBa0I7Ozs7O2tCQUFDLE9BQWlEOztZQUMzRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWtDO29CQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNkLEVBQUUsQ0FBQyxD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S0FBSzs7aUNBM0ZSOztTQXdDYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIERvQ2hlY2ssXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21FdmVudCB9IGZyb20gJy4vY3VzdG9tLWV2ZW50LXBvbHlmaWxsJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgTWF0ZXJpYWxpemU6IGFueTtcblxuLy8gZXhwb3J0IHR5cGUgTWF0ZXJpYWxpemVPcHRpb25zID1cbi8vIFwiY29sbGFwc2libGVcIiB8XG4vLyBcImRyb3Bkb3duXCIgfFxuLy8gXCJtYXRlcmlhbGJveFwiIHxcbi8vIFwidGFic1wiIHxcbi8vIFwidG9vbHRpcFwiIHxcbi8vIFwiY2hhcmFjdGVyQ291bnRlclwiIHxcbi8vIFwibWF0ZXJpYWxfc2VsZWN0XCIgfFxuLy8gXCJzaWRlTmF2XCIgfFxuLy8gXCJtb2RhbFwiO1xuXG4vLyBcblxuZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbGl6ZUFjdGlvbiB7XG4gIGFjdGlvbjogc3RyaW5nO1xuICBwYXJhbXM6IFthbnldO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0ZXJpYWxpemVdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ01hdGVyaWFsaXplRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX3BhcmFtczogW2FueV0gPSBudWxsO1xuICBwcml2YXRlIF9mdW5jdGlvbk5hbWU6IHN0cmluZyA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNWYWx1ZSA9IG51bGw7XG4gIHByaXZhdGUgcHJldmlvdXNEaXNhYmxlZCA9IGZhbHNlO1xuICBwcml2YXRlIF93YWl0RnVuY3Rpb246IGFueSA9IHt9O1xuICBwcml2YXRlIGlzQnJvd3NlcjogYm9vbGVhbiA9IGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCk7XG5cbiAgcHJpdmF0ZSBjaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgaW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogT2JqZWN0LCBwcml2YXRlIF9lbDogRWxlbWVudFJlZikge1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZVBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5fcGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRVcGRhdGVzKCk7XG4gICAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplQWN0aW9ucyhhY3Rpb25zOiBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgTWF0ZXJpYWxpemVBY3Rpb24+KSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBhY3Rpb25zLnN1YnNjcmliZSgoYWN0aW9uOiBzdHJpbmcgfCBNYXRlcmlhbGl6ZUFjdGlvbikgPT4ge1xuICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoYWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhhY3Rpb24uYWN0aW9uLCBhY3Rpb24ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemUoZnVuY3Rpb25OYW1lOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuX2Z1bmN0aW9uTmFtZSA9IGZ1bmN0aW9uTmFtZTtcbiAgfVxuXG4gIC8vIHRoaXMgaXMgaGVyZSB0byB0cmlnZ2VyIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHNlbGVjdCBlbGVtZW50c1xuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplU2VsZWN0T3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgfVxuXG4gIC8vdXNlZCBmb3IgdGhlIGRhdGVwaWNrZXIgYXQgdGhlIG1vbWVudFxuICBASW5wdXQoKSBuZ01vZGVsO1xuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25DaGFuZ2VzKF91bnVzZWQ/KSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdCgpKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFJlbW90aW9uKCk7XG4gICAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdEb0NoZWNrKCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSkge1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChuYXRpdmVFbGVtZW50LmRpc2FibGVkICE9IHRoaXMucHJldmlvdXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c0Rpc2FibGVkID0gbmF0aXZlRWxlbWVudC5kaXNhYmxlZDtcbiAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKCFqUXVlcnlFbGVtZW50LmF0dHIoXCJtdWx0aXBsZVwiKSAmJiBuYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIHNlbGVjdCBjaGFuZ2VzIG9mIHRoZSBtb2RlbFxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gbmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzVGV4dGFyZWEoKSkge1xuICAgICAgICAgICAgICBpZiAobmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtRWxlbWVudFJlbW90aW9uKCkge1xuICAgICAgaWYgKHRoaXMuaXNUb29sdGlwKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBjb25zdCB0b29sdGlwSWQgPSBqUXVlcnlFbGVtZW50LmF0dHIoJ2RhdGEtdG9vbHRpcC1pZCcpO1xuICAgICAgICAgIGlmICh0b29sdGlwSWQpIHtcbiAgICAgICAgICAgICAgJCgnIycgKyB0b29sdGlwSWQpLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUVsZW1lbnRVcGRhdGVzKCkge1xuICAgICAgLy8gaXQgc2hvdWxkIGhhdmUgYmVlbiBjcmVhdGVkIGJ5IG5vdywgYnV0IGNvbmZpcm0gYW55d2F5XG4gICAgICBpZiAoTWF0ZXJpYWxpemUgJiYgTWF0ZXJpYWxpemUudXBkYXRlVGV4dEZpZWxkcykge1xuICAgICAgICAgIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMoKTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIHNlbGVjdCBjaGFuZ2VzIGZyb20gdGhlIEhUTUxcbiAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkgJiYgdGhpcy5jaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWUub3JpZ2luYWxFdmVudCB8fCAhZS5vcmlnaW5hbEV2ZW50LmludGVybmFsVG9NYXRlcmlhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQ6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAvL2lmIChqUXVlcnlFbGVtZW50LmF0dHIoXCJtdWx0aXBsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgLy9ldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJpbnB1dFwiLGZhbHNlLGZhbHNlLHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAvL31cbiAgICAgICAgICAgICAgICAgIC8vZWxzZSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5pbml0Q3VzdG9tRXZlbnQoXCJjaGFuZ2VcIiwgZmFsc2UsIGZhbHNlLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAgIGV2ZW50LmludGVybmFsVG9NYXRlcmlhbGl6ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0ZW5lclNob3VsZEJlQWRkZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNBdXRvY29tcGxldGUoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoYW5nZVwiLCBlID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImlucHV0XCIpKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0RhdGVQaWNrZXIoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpxdWVyeVBpY2tlckVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgY29uc3QgZGF0ZVBpY2tlciA9IGpxdWVyeVBpY2tlckVsZW1lbnRbdGhpcy5fZnVuY3Rpb25OYW1lXSguLi50aGlzLl9wYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHBpY2tlciA9IGRhdGVQaWNrZXIucGlja2FkYXRlKCdwaWNrZXInKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubmdNb2RlbCkgeyAvLyBQUiAyOTIgLSAxXG4gICAgICAgICAgICAgICAgICBwaWNrZXIuc2V0KCdzZWxlY3QnLCB0aGlzLm5nTW9kZWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBqcXVlcnlQaWNrZXJFbGVtZW50LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBwaWNrZXIuc2V0KCdzZWxlY3QnLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAganF1ZXJ5UGlja2VyRWxlbWVudC5vbignY2hhbmdlJywgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNUaW1lUGlja2VyKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqcXVlcnlQaWNrZXJFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGNvbnN0IHRpbWVQaWNrZXIgPSBqcXVlcnlQaWNrZXJFbGVtZW50W3RoaXMuX2Z1bmN0aW9uTmFtZV0oLi4udGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBwaWNrZXIgPSB0aW1lUGlja2VyLnBpY2thdGltZSgncGlja2VyJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm5nTW9kZWwpIHtcbiAgICAgICAgICAgICAgICAgIHBpY2tlci52YWwodGhpcy5uZ01vZGVsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBpY2tlci52YWwoanF1ZXJ5UGlja2VyRWxlbWVudC52YWwoKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAganF1ZXJ5UGlja2VyRWxlbWVudC5vbignY2hhbmdlJywgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNDaGlwcygpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuYWRkXCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLmFkZFwiLCBjaGlwKSkpKTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5kZWxldGVcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuZGVsZXRlXCIsIGNoaXApKSkpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLnNlbGVjdFwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5zZWxlY3RcIiwgY2hpcCkpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVGV4dGFyZWEoKSkge1xuICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImF1dG9yZXNpemVcIiwge1xuICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICAgICAgICB9KSkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGZ1bmN0aW9uTmFtZSA9IHRoaXMuX2Z1bmN0aW9uTmFtZSwgcGFyYW1zID0gdGhpcy5fcGFyYW1zKSB7XG4gICAgICBpZiAodGhpcy5fd2FpdEZ1bmN0aW9uW2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdID0gdHJ1ZTtcblxuICAgICAgJChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAoZnVuY3Rpb25OYW1lKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICBpZiAoalF1ZXJ5RWxlbWVudFtmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSguLi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtcyBoYXMgdG8gYmUgYW4gYXJyYXkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5RWxlbWVudFtmdW5jdGlvbk5hbWVdKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBmYWxsYmFjayB0byBydW5uaW5nIHRoaXMgZnVuY3Rpb24gb24gdGhlIGdsb2JhbCBNYXRlcmlhbGl6ZSBvYmplY3RcbiAgICAgICAgICAgICAgICAgIGlmIChNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtcyBoYXMgdG8gYmUgYW4gYXJyYXkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBtYXRlcmlhbGl6ZSBmdW5jdGlvbiAnJ1wiICsgZnVuY3Rpb25OYW1lICsgXCInIG9uIGVsZW1lbnQgb3IgdGhlIGdsb2JhbCBNYXRlcmlhbGl6ZSBvYmplY3QuXCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdC5lbWl0KCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzVG9vbHRpcCgpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJ0b29sdGlwXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1NlbGVjdCgpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJtYXRlcmlhbF9zZWxlY3RcIik7XG4gIH1cblxuICBwcml2YXRlIGlzRGF0ZVBpY2tlcigpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJwaWNrYWRhdGVcIik7XG4gIH1cblxuICBwcml2YXRlIGlzVGltZVBpY2tlcigpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJwaWNrYXRpbWVcIik7XG4gIH1cblxuICBwcml2YXRlIGlzQ2hpcHMoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwibWF0ZXJpYWxfY2hpcFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBdXRvY29tcGxldGUoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwiYXV0b2NvbXBsZXRlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1RleHRhcmVhKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQubm9kZU5hbWUgPT0gXCJURVhUQVJFQVwiO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmFibGVEUEJ1dHRvbnMoKSB7XG4gICAgICAkKCcucGlja2VyX19jbGVhcicpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX3RvZGF5JykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fY2xvc2UnKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX19zZWxlY3QtLXllYXInKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX19zZWxlY3QtLW1vbnRoJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICB9XG59XG4iXX0=