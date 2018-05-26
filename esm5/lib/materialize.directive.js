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
export { MaterializeDirective };
function MaterializeDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaterializeDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaterializeDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MaterializeDirective.propDecorators;
    /** @type {?} */
    MaterializeDirective.prototype._params;
    /** @type {?} */
    MaterializeDirective.prototype._functionName;
    /** @type {?} */
    MaterializeDirective.prototype.previousValue;
    /** @type {?} */
    MaterializeDirective.prototype.previousDisabled;
    /** @type {?} */
    MaterializeDirective.prototype._waitFunction;
    /** @type {?} */
    MaterializeDirective.prototype.isBrowser;
    /** @type {?} */
    MaterializeDirective.prototype.changeListenerShouldBeAdded;
    /** @type {?} */
    MaterializeDirective.prototype.init;
    /** @type {?} */
    MaterializeDirective.prototype.initialized;
    /** @type {?} */
    MaterializeDirective.prototype.ngModel;
    /** @type {?} */
    MaterializeDirective.prototype.platformId;
    /** @type {?} */
    MaterializeDirective.prototype._el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWxpemUvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWxpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFLTixZQUFZLEVBQ1osV0FBVyxFQUNYLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7Ozs7OztJQXdDbEQsOEJBQXlDLFlBQTRCLEdBQWU7UUFBM0MsZUFBVSxHQUFWLFVBQVU7UUFBa0IsUUFBRyxHQUFILEdBQUcsQ0FBWTt1QkFaM0QsSUFBSTs2QkFDRyxJQUFJOzZCQUNaLElBQUk7Z0NBQ0QsS0FBSzs2QkFDSCxFQUFFO3lCQUNGLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7MkNBRXpCLElBQUk7b0JBRWxCLElBQUksWUFBWSxFQUFROzJCQUMxQixLQUFLO0tBRzFCOzBCQUdVLG1EQUFpQjs7Ozs7a0JBQUMsTUFBVztZQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2FBQ2hDOzs7OzswQkFJTSxvREFBa0I7Ozs7O2tCQUFDLE9BQWlEOztZQUMzRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLE1BQWtDO29CQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDO3dCQUNkLEVBQUUsQ0FBQyxDQUFDLE9B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K0JBM0ZSOztTQXdDYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIERvQ2hlY2ssXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBBZnRlclZpZXdJbml0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21FdmVudCB9IGZyb20gJy4vY3VzdG9tLWV2ZW50LXBvbHlmaWxsJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZGVjbGFyZSB2YXIgJDogYW55O1xuZGVjbGFyZSB2YXIgTWF0ZXJpYWxpemU6IGFueTtcblxuLy8gZXhwb3J0IHR5cGUgTWF0ZXJpYWxpemVPcHRpb25zID1cbi8vIFwiY29sbGFwc2libGVcIiB8XG4vLyBcImRyb3Bkb3duXCIgfFxuLy8gXCJtYXRlcmlhbGJveFwiIHxcbi8vIFwidGFic1wiIHxcbi8vIFwidG9vbHRpcFwiIHxcbi8vIFwiY2hhcmFjdGVyQ291bnRlclwiIHxcbi8vIFwibWF0ZXJpYWxfc2VsZWN0XCIgfFxuLy8gXCJzaWRlTmF2XCIgfFxuLy8gXCJtb2RhbFwiO1xuXG4vLyBcblxuZXhwb3J0IGludGVyZmFjZSBNYXRlcmlhbGl6ZUFjdGlvbiB7XG4gIGFjdGlvbjogc3RyaW5nO1xuICBwYXJhbXM6IGFueVtdO1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbWF0ZXJpYWxpemVdJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbGl6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9wYXJhbXM6IGFueVtdID0gbnVsbDtcbiAgcHJpdmF0ZSBfZnVuY3Rpb25OYW1lOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzVmFsdWUgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfd2FpdEZ1bmN0aW9uOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBpc0Jyb3dzZXI6IGJvb2xlYW4gPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuXG4gIHByaXZhdGUgY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcHVibGljIGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCwgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemVQYXJhbXMocGFyYW1zOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZUFjdGlvbnMoYWN0aW9uczogRXZlbnRFbWl0dGVyPHN0cmluZyB8IE1hdGVyaWFsaXplQWN0aW9uPikge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgYWN0aW9ucy5zdWJzY3JpYmUoKGFjdGlvbjogc3RyaW5nIHwgTWF0ZXJpYWxpemVBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoYWN0aW9uLmFjdGlvbiwgYWN0aW9uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH0pXG4gICAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplKGZ1bmN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgICB0aGlzLl9mdW5jdGlvbk5hbWUgPSBmdW5jdGlvbk5hbWU7XG4gIH1cblxuICAvLyB0aGlzIGlzIGhlcmUgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGZvciBzZWxlY3QgZWxlbWVudHNcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZVNlbGVjdE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gIH1cblxuICAvL3VzZWQgZm9yIHRoZSBkYXRlcGlja2VyIGF0IHRoZSBtb21lbnRcbiAgQElucHV0KCkgbmdNb2RlbDtcblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhfdW51c2VkPykge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nRG9DaGVjaygpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAobmF0aXZlRWxlbWVudC5kaXNhYmxlZCAhPSB0aGlzLnByZXZpb3VzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNEaXNhYmxlZCA9IG5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikgJiYgbmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBvZiB0aGUgbW9kZWxcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBuYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgdG9vbHRpcElkID0galF1ZXJ5RWxlbWVudC5hdHRyKCdkYXRhLXRvb2x0aXAtaWQnKTtcbiAgICAgICAgICBpZiAodG9vbHRpcElkKSB7XG4gICAgICAgICAgICAgICQoJyMnICsgdG9vbHRpcElkKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1FbGVtZW50VXBkYXRlcygpIHtcbiAgICAgIC8vIGl0IHNob3VsZCBoYXZlIGJlZW4gY3JlYXRlZCBieSBub3csIGJ1dCBjb25maXJtIGFueXdheVxuICAgICAgaWYgKE1hdGVyaWFsaXplICYmIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMpIHtcbiAgICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBmcm9tIHRoZSBIVE1MXG4gICAgICBpZiAodGhpcy5pc1NlbGVjdCgpICYmIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFlLm9yaWdpbmFsRXZlbnQgfHwgIWUub3JpZ2luYWxFdmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50OiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgLy9pZiAoalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgIC8vZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiaW5wdXRcIixmYWxzZSxmYWxzZSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICBldmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQXV0b2NvbXBsZXRlKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGFuZ2VcIiwgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNEYXRlUGlja2VyKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqcXVlcnlQaWNrZXJFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSBqcXVlcnlQaWNrZXJFbGVtZW50W3RoaXMuX2Z1bmN0aW9uTmFtZV0oLi4udGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBwaWNrZXIgPSBkYXRlUGlja2VyLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm5nTW9kZWwpIHsgLy8gUFIgMjkyIC0gMVxuICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdGhpcy5uZ01vZGVsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ganF1ZXJ5UGlja2VyRWxlbWVudC52YWwoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVGltZVBpY2tlcigpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QganF1ZXJ5UGlja2VyRWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBjb25zdCB0aW1lUGlja2VyID0ganF1ZXJ5UGlja2VyRWxlbWVudFt0aGlzLl9mdW5jdGlvbk5hbWVdKC4uLnRoaXMuX3BhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcGlja2VyID0gdGltZVBpY2tlci5waWNrYXRpbWUoJ3BpY2tlcicpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5uZ01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKHRoaXMubmdNb2RlbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKGpxdWVyeVBpY2tlckVsZW1lbnQudmFsKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ2hpcHMoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLmFkZFwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5hZGRcIiwgY2hpcCkpKSk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuZGVsZXRlXCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLmRlbGV0ZVwiLCBjaGlwKSkpKTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5zZWxlY3RcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuc2VsZWN0XCIsIGNoaXApKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJhdXRvcmVzaXplXCIsIHtcbiAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgICAgICAgfSkpKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhmdW5jdGlvbk5hbWUgPSB0aGlzLl9mdW5jdGlvbk5hbWUsIHBhcmFtcyA9IHRoaXMuX3BhcmFtcykge1xuICAgICAgaWYgKHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IHRydWU7XG5cbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnlFbGVtZW50W2Z1bmN0aW9uTmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcnVubmluZyB0aGlzIGZ1bmN0aW9uIG9uIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICBpZiAoTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0oKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgbWF0ZXJpYWxpemUgZnVuY3Rpb24gJydcIiArIGZ1bmN0aW9uTmFtZSArIFwiJyBvbiBlbGVtZW50IG9yIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0LlwiKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXQuZW1pdCgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Rvb2x0aXAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwidG9vbHRpcFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTZWxlY3QoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwibWF0ZXJpYWxfc2VsZWN0XCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0RhdGVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2FkYXRlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1RpbWVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2F0aW1lXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NoaXBzKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcIm1hdGVyaWFsX2NoaXBcIik7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0b2NvbXBsZXRlKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcImF1dG9jb21wbGV0ZVwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUZXh0YXJlYSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09IFwiVEVYVEFSRUFcIjtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlRFBCdXR0b25zKCkge1xuICAgICAgJCgnLnBpY2tlcl9fY2xlYXInKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX190b2RheScpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX2Nsb3NlJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS15ZWFyJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS1tb250aCcpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgfVxufVxuIl19