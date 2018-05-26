/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
export class MaterializeDirective {
    /**
     * @param {?} platformId
     * @param {?} _el
     */
    constructor(platformId, _el) {
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
    /**
     * @param {?} params
     * @return {?}
     */
    set materializeParams(params) {
        if (this.isBrowser) {
            this._params = params;
            this.performElementUpdates();
        }
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    set materializeActions(actions) {
        if (this.isBrowser) {
            actions.subscribe((action) => {
                window.setTimeout(() => {
                    if (typeof action === "string") {
                        this.performLocalElementUpdates(action);
                    }
                    else {
                        this.performLocalElementUpdates(action.action, action.params);
                    }
                }, 1);
            });
        }
    }
    /**
     * @param {?} functionName
     * @return {?}
     */
    set materialize(functionName) {
        this._functionName = functionName;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set materializeSelectOptions(options) {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.isBrowser) {
            this.performElementUpdates();
        }
    }
    /**
     * @param {?=} _unused
     * @return {?}
     */
    ngOnChanges(_unused) {
        if (this.isBrowser) {
            if (this.isSelect()) {
                setTimeout(() => this.performLocalElementUpdates(), 10);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.isBrowser) {
            this.performElementRemotion();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.isBrowser) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jQueryElement = $(nativeElement);
            if (this.isSelect()) {
                let /** @type {?} */ shouldUpdate = false;
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
    }
    /**
     * @return {?}
     */
    performElementRemotion() {
        if (this.isTooltip()) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jQueryElement = $(nativeElement);
            const /** @type {?} */ tooltipId = jQueryElement.attr('data-tooltip-id');
            if (tooltipId) {
                $('#' + tooltipId).remove();
            }
        }
    }
    /**
     * @return {?}
     */
    performElementUpdates() {
        // it should have been created by now, but confirm anyway
        if (Materialize && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
        // handle select changes from the HTML
        if (this.isSelect() && this.changeListenerShouldBeAdded) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jQueryElement = $(nativeElement);
            jQueryElement.on("change", e => {
                if (!e.originalEvent || !e.originalEvent.internalToMaterialize) {
                    const /** @type {?} */ event = document.createEvent("CustomEvent");
                    //if (jQueryElement.attr("multiple")) {
                    //event.initCustomEvent("input",false,false,undefined);
                    //}
                    //else {
                    event.initCustomEvent("change", false, false, undefined);
                    //}
                    event.internalToMaterialize = true;
                    nativeElement.dispatchEvent(event);
                }
            });
            this.changeListenerShouldBeAdded = false;
        }
        if (this.isAutocomplete()) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jQueryElement = $(nativeElement);
            jQueryElement.on("change", e => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("input")))));
        }
        if (this.isDatePicker()) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jqueryPickerElement = $(nativeElement);
            const /** @type {?} */ datePicker = jqueryPickerElement[this._functionName](...this._params);
            const /** @type {?} */ picker = datePicker.pickadate('picker');
            setTimeout(() => {
                if (this.ngModel) {
                    // PR 292 - 1
                    picker.set('select', this.ngModel);
                }
                else {
                    const /** @type {?} */ value = jqueryPickerElement.val();
                    if (value && value.length > 0) {
                        picker.set('select', value);
                    }
                }
                jqueryPickerElement.on('change', e => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("input")))));
            });
        }
        if (this.isTimePicker()) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jqueryPickerElement = $(nativeElement);
            const /** @type {?} */ timePicker = jqueryPickerElement[this._functionName](...this._params);
            const /** @type {?} */ picker = timePicker.pickatime('picker');
            setTimeout(() => {
                if (this.ngModel) {
                    picker.val(this.ngModel);
                }
                else {
                    picker.val(jqueryPickerElement.val());
                }
                jqueryPickerElement.on('change', e => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("input")))));
            });
        }
        if (this.isChips()) {
            const /** @type {?} */ nativeElement = this._el.nativeElement;
            const /** @type {?} */ jQueryElement = $(nativeElement);
            jQueryElement.on("chip.add", (e, chip) => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("chip.add", chip)))));
            jQueryElement.on("chip.delete", (e, chip) => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("chip.delete", chip)))));
            jQueryElement.on("chip.select", (e, chip) => nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("chip.select", chip)))));
        }
        if (this.isTextarea()) {
            this._el.nativeElement.dispatchEvent((/** @type {?} */ (CustomEvent("autoresize", {
                bubbles: true,
                cancelable: false,
                detail: undefined
            }))));
        }
        this.performLocalElementUpdates();
    }
    /**
     * @param {?=} functionName
     * @param {?=} params
     * @return {?}
     */
    performLocalElementUpdates(functionName = this._functionName, params = this._params) {
        if (this._waitFunction[functionName]) {
            return;
        }
        this._waitFunction[functionName] = true;
        $(document).ready(() => {
            this._waitFunction[functionName] = false;
            if (functionName) {
                const /** @type {?} */ jQueryElement = $(this._el.nativeElement);
                if (jQueryElement[functionName]) {
                    if (params) {
                        if (params instanceof Array) {
                            jQueryElement[functionName](...params);
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
                                Materialize[functionName](...params);
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
                if (!this.initialized) {
                    this.initialized = true;
                    this.init.emit();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    isTooltip() {
        return (this._functionName && this._functionName === "tooltip");
    }
    /**
     * @return {?}
     */
    isSelect() {
        return (this._functionName && this._functionName === "material_select");
    }
    /**
     * @return {?}
     */
    isDatePicker() {
        return (this._functionName && this._functionName === "pickadate");
    }
    /**
     * @return {?}
     */
    isTimePicker() {
        return (this._functionName && this._functionName === "pickatime");
    }
    /**
     * @return {?}
     */
    isChips() {
        return (this._functionName && this._functionName === "material_chip");
    }
    /**
     * @return {?}
     */
    isAutocomplete() {
        return (this._functionName && this._functionName === "autocomplete");
    }
    /**
     * @return {?}
     */
    isTextarea() {
        return this._el.nativeElement.nodeName == "TEXTAREA";
    }
    /**
     * @return {?}
     */
    enableDPButtons() {
        $('.picker__clear').removeAttr("disabled");
        $('.picker__today').removeAttr("disabled");
        $('.picker__close').removeAttr("disabled");
        $('.picker__select--year').removeAttr("disabled");
        $('.picker__select--month').removeAttr("disabled");
    }
}
MaterializeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[materialize]'
            },] },
];
/** @nocollapse */
MaterializeDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
];
MaterializeDirective.propDecorators = {
    "init": [{ type: Output },],
    "materializeParams": [{ type: Input },],
    "materializeActions": [{ type: Input },],
    "materialize": [{ type: Input },],
    "materializeSelectOptions": [{ type: Input },],
    "ngModel": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWxpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWxpemUvIiwic291cmNlcyI6WyJsaWIvbWF0ZXJpYWxpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUtOLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7QUEwQnBELE1BQU07Ozs7O0lBY0osWUFBeUMsWUFBNEIsR0FBZTtRQUEzQyxlQUFVLEdBQVYsVUFBVTtRQUFrQixRQUFHLEdBQUgsR0FBRyxDQUFZO3VCQVozRCxJQUFJOzZCQUNHLElBQUk7NkJBQ1osSUFBSTtnQ0FDRCxLQUFLOzZCQUNILEVBQUU7eUJBQ0YsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzsyQ0FFekIsSUFBSTtvQkFFbEIsSUFBSSxZQUFZLEVBQVE7MkJBQzFCLEtBQUs7S0FHMUI7Ozs7O1FBR1UsaUJBQWlCLENBQUMsTUFBVztRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQzs7Ozs7O1FBSU0sa0JBQWtCLENBQUMsT0FBaUQ7UUFDM0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQWtDLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDM0M7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osSUFBSSxDQUFDLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO3FCQUNqRTtpQkFDSixFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1QsQ0FBQyxDQUFBO1NBQ0w7Ozs7OztRQUlNLFdBQVcsQ0FBQyxZQUFvQjtRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQzs7Ozs7O1FBSzNCLHdCQUF3QixDQUFDLE9BQVk7Ozs7O0lBTXpDLGVBQWU7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDaEM7Ozs7OztJQUdFLFdBQVcsQ0FBQyxPQUFRO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUMzRDtTQUNKOzs7OztJQUdFLFdBQVc7UUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztTQUNqQzs7Ozs7SUFHRSxTQUFTO1FBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzdDLHVCQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEIscUJBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDekIsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQztvQkFDL0MsWUFBWSxHQUFHLElBQUksQ0FBQztpQkFDdkI7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O29CQUUvRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7b0JBQ3pDLFlBQVksR0FBRyxJQUFJLENBQUM7aUJBQ3ZCO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7aUJBQ3JDO2FBQ0o7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO29CQUN6QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztpQkFDaEM7YUFDSjtTQUNKO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7SUFHVCxzQkFBc0I7UUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuQix1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7WUFDN0MsdUJBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2Qyx1QkFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMvQjtTQUNKOzs7OztJQUdHLHFCQUFxQjs7UUFFekIsRUFBRSxDQUFDLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDbEM7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUM7WUFDdEQsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzdDLHVCQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO29CQUM3RCx1QkFBTSxLQUFLLEdBQVEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7Ozs7b0JBS3ZELEtBQUssQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7O29CQUd6RCxLQUFLLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO29CQUNuQyxhQUFhLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QzthQUNKLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQywyQkFBMkIsR0FBRyxLQUFLLENBQUM7U0FDNUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHVCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUM3Qyx1QkFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRXZDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxtQkFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0Y7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLHVCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUM3Qyx1QkFBTSxtQkFBbUIsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFN0MsdUJBQU0sVUFBVSxHQUFHLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RSx1QkFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFDZixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLHVCQUFNLEtBQUssR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDeEMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQy9CO2lCQUNKO2dCQUNELG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzthQUNuRyxDQUFDLENBQUM7U0FDTjtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsdUJBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzdDLHVCQUFNLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUU3Qyx1QkFBTSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVFLHVCQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDekM7Z0JBQ0QsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQU0sV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ25HLENBQUMsQ0FBQztTQUNOO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqQix1QkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7WUFDN0MsdUJBQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2QyxhQUFhLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQU0sV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUM3RyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQU0sV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNuSCxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQU0sV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUN0SDtRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFNLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pFLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsU0FBUzthQUNwQixDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ1I7UUFFRCxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQzs7Ozs7OztJQUc5QiwwQkFBMEIsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDdkYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUV4QyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUV6QyxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVCQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDaEQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDVCxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7eUJBQzFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNKLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQzt5QkFDakQ7cUJBQ0o7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7cUJBQ2pDO2lCQUNKO2dCQUFDLElBQUksQ0FBQyxDQUFDOztvQkFFSixFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzRCQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dDQUMxQixXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQzs2QkFDeEM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDOzZCQUNqRDt5QkFDSjt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDSixXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQzt5QkFDL0I7cUJBQ0o7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsR0FBRyxZQUFZLEdBQUcsZ0RBQWdELENBQUMsQ0FBQztxQkFDOUg7aUJBQ0o7Z0JBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ3BCO2FBRUo7U0FFSixDQUFDLENBQUM7Ozs7O0lBR0MsU0FBUztRQUNiLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQzs7Ozs7SUFHNUQsUUFBUTtRQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDOzs7OztJQUdwRSxZQUFZO1FBQ2hCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxXQUFXLENBQUMsQ0FBQzs7Ozs7SUFHOUQsWUFBWTtRQUNoQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLENBQUM7Ozs7O0lBRzlELE9BQU87UUFDWCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLENBQUM7Ozs7O0lBR2xFLGNBQWM7UUFDbEIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGNBQWMsQ0FBQyxDQUFDOzs7OztJQUdqRSxVQUFVO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUM7Ozs7O0lBR2pELGVBQWU7UUFDbkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztZQTdSeEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O3lDQWVjLE1BQU0sU0FBQyxXQUFXO1lBcEQvQixVQUFVOzs7cUJBaURULE1BQU07a0NBTU4sS0FBSzttQ0FRTCxLQUFLOzRCQWVMLEtBQUs7eUNBTUwsS0FBSzt3QkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBEb0NoZWNrLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRXZlbnQgfSBmcm9tICcuL2N1c3RvbS1ldmVudC1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbmRlY2xhcmUgdmFyIE1hdGVyaWFsaXplOiBhbnk7XG5cbi8vIGV4cG9ydCB0eXBlIE1hdGVyaWFsaXplT3B0aW9ucyA9XG4vLyBcImNvbGxhcHNpYmxlXCIgfFxuLy8gXCJkcm9wZG93blwiIHxcbi8vIFwibWF0ZXJpYWxib3hcIiB8XG4vLyBcInRhYnNcIiB8XG4vLyBcInRvb2x0aXBcIiB8XG4vLyBcImNoYXJhY3RlckNvdW50ZXJcIiB8XG4vLyBcIm1hdGVyaWFsX3NlbGVjdFwiIHxcbi8vIFwic2lkZU5hdlwiIHxcbi8vIFwibW9kYWxcIjtcblxuLy8gXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWxpemVBY3Rpb24ge1xuICBhY3Rpb246IHN0cmluZztcbiAgcGFyYW1zOiBhbnlbXTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdGVyaWFsaXplXSdcbn0pXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBfcGFyYW1zOiBhbnlbXSA9IG51bGw7XG4gIHByaXZhdGUgX2Z1bmN0aW9uTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgcHJpdmF0ZSBwcmV2aW91c1ZhbHVlID0gbnVsbDtcbiAgcHJpdmF0ZSBwcmV2aW91c0Rpc2FibGVkID0gZmFsc2U7XG4gIHByaXZhdGUgX3dhaXRGdW5jdGlvbjogYW55ID0ge307XG4gIHByaXZhdGUgaXNCcm93c2VyOiBib29sZWFuID0gaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKTtcblxuICBwcml2YXRlIGNoYW5nZUxpc3RlbmVyU2hvdWxkQmVBZGRlZCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBpbml0ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplUGFyYW1zKHBhcmFtczogYW55KSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICB0aGlzLl9wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemVBY3Rpb25zKGFjdGlvbnM6IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBNYXRlcmlhbGl6ZUFjdGlvbj4pIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIGFjdGlvbnMuc3Vic2NyaWJlKChhY3Rpb246IHN0cmluZyB8IE1hdGVyaWFsaXplQWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWN0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGFjdGlvbi5hY3Rpb24sIGFjdGlvbi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9KVxuICAgICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZShmdW5jdGlvbk5hbWU6IHN0cmluZykge1xuICAgICAgdGhpcy5fZnVuY3Rpb25OYW1lID0gZnVuY3Rpb25OYW1lO1xuICB9XG5cbiAgLy8gdGhpcyBpcyBoZXJlIHRvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiBmb3Igc2VsZWN0IGVsZW1lbnRzXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemVTZWxlY3RPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICB9XG5cbiAgLy91c2VkIGZvciB0aGUgZGF0ZXBpY2tlciBhdCB0aGUgbW9tZW50XG4gIEBJbnB1dCgpIG5nTW9kZWw7XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRVcGRhdGVzKCk7XG4gICAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoX3VudXNlZD8pIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKCksIDEwKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50UmVtb3Rpb24oKTtcbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ0RvQ2hlY2soKSB7XG4gICAgICBpZiAodGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBpZiAodGhpcy5pc1NlbGVjdCgpKSB7XG4gICAgICAgICAgICAgIGxldCBzaG91bGRVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgIT0gdGhpcy5wcmV2aW91c0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzRGlzYWJsZWQgPSBuYXRpdmVFbGVtZW50LmRpc2FibGVkO1xuICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoIWpRdWVyeUVsZW1lbnQuYXR0cihcIm11bHRpcGxlXCIpICYmIG5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgc2VsZWN0IGNoYW5nZXMgb2YgdGhlIG1vZGVsXG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBuYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNUZXh0YXJlYSgpKSB7XG4gICAgICAgICAgICAgIGlmIChuYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c1ZhbHVlID0gbmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRVcGRhdGVzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1FbGVtZW50UmVtb3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc1Rvb2x0aXAoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IHRvb2x0aXBJZCA9IGpRdWVyeUVsZW1lbnQuYXR0cignZGF0YS10b29sdGlwLWlkJyk7XG4gICAgICAgICAgaWYgKHRvb2x0aXBJZCkge1xuICAgICAgICAgICAgICAkKCcjJyArIHRvb2x0aXBJZCkucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtRWxlbWVudFVwZGF0ZXMoKSB7XG4gICAgICAvLyBpdCBzaG91bGQgaGF2ZSBiZWVuIGNyZWF0ZWQgYnkgbm93LCBidXQgY29uZmlybSBhbnl3YXlcbiAgICAgIGlmIChNYXRlcmlhbGl6ZSAmJiBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKSB7XG4gICAgICAgICAgTWF0ZXJpYWxpemUudXBkYXRlVGV4dEZpZWxkcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgc2VsZWN0IGNoYW5nZXMgZnJvbSB0aGUgSFRNTFxuICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSAmJiB0aGlzLmNoYW5nZUxpc3RlbmVyU2hvdWxkQmVBZGRlZCkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICAgICAgICAgIGlmICghZS5vcmlnaW5hbEV2ZW50IHx8ICFlLm9yaWdpbmFsRXZlbnQuaW50ZXJuYWxUb01hdGVyaWFsaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBldmVudDogYW55ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICAgICAgICAgICAgICAgIC8vaWYgKGpRdWVyeUVsZW1lbnQuYXR0cihcIm11bHRpcGxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAvL2V2ZW50LmluaXRDdXN0b21FdmVudChcImlucHV0XCIsZmFsc2UsZmFsc2UsdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudChcImNoYW5nZVwiLCBmYWxzZSwgZmFsc2UsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgICAgICAgZXZlbnQuaW50ZXJuYWxUb01hdGVyaWFsaXplID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmNoYW5nZUxpc3RlbmVyU2hvdWxkQmVBZGRlZCA9IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0F1dG9jb21wbGV0ZSgpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hhbmdlXCIsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzRGF0ZVBpY2tlcigpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QganF1ZXJ5UGlja2VyRWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBjb25zdCBkYXRlUGlja2VyID0ganF1ZXJ5UGlja2VyRWxlbWVudFt0aGlzLl9mdW5jdGlvbk5hbWVdKC4uLnRoaXMuX3BhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcGlja2VyID0gZGF0ZVBpY2tlci5waWNrYWRhdGUoJ3BpY2tlcicpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5uZ01vZGVsKSB7IC8vIFBSIDI5MiAtIDFcbiAgICAgICAgICAgICAgICAgIHBpY2tlci5zZXQoJ3NlbGVjdCcsIHRoaXMubmdNb2RlbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGpxdWVyeVBpY2tlckVsZW1lbnQudmFsKCk7XG4gICAgICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHBpY2tlci5zZXQoJ3NlbGVjdCcsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBqcXVlcnlQaWNrZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBlID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImlucHV0XCIpKSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc1RpbWVQaWNrZXIoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpxdWVyeVBpY2tlckVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgICAgY29uc3QgdGltZVBpY2tlciA9IGpxdWVyeVBpY2tlckVsZW1lbnRbdGhpcy5fZnVuY3Rpb25OYW1lXSguLi50aGlzLl9wYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHBpY2tlciA9IHRpbWVQaWNrZXIucGlja2F0aW1lKCdwaWNrZXInKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMubmdNb2RlbCkge1xuICAgICAgICAgICAgICAgICAgcGlja2VyLnZhbCh0aGlzLm5nTW9kZWwpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGlja2VyLnZhbChqcXVlcnlQaWNrZXJFbGVtZW50LnZhbCgpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBqcXVlcnlQaWNrZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBlID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImlucHV0XCIpKSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0NoaXBzKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5hZGRcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuYWRkXCIsIGNoaXApKSkpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLmRlbGV0ZVwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5kZWxldGVcIiwgY2hpcCkpKSk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuc2VsZWN0XCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLnNlbGVjdFwiLCBjaGlwKSkpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNUZXh0YXJlYSgpKSB7XG4gICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiYXV0b3Jlc2l6ZVwiLCB7XG4gICAgICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkZXRhaWw6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pKSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoZnVuY3Rpb25OYW1lID0gdGhpcy5fZnVuY3Rpb25OYW1lLCBwYXJhbXMgPSB0aGlzLl9wYXJhbXMpIHtcbiAgICAgIGlmICh0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fd2FpdEZ1bmN0aW9uW2Z1bmN0aW9uTmFtZV0gPSB0cnVlO1xuXG4gICAgICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fd2FpdEZ1bmN0aW9uW2Z1bmN0aW9uTmFtZV0gPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChmdW5jdGlvbk5hbWUpIHtcbiAgICAgICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQodGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgIGlmIChqUXVlcnlFbGVtZW50W2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5RWxlbWVudFtmdW5jdGlvbk5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyYW1zIGhhcyB0byBiZSBhbiBhcnJheS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBqUXVlcnlFbGVtZW50W2Z1bmN0aW9uTmFtZV0oKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIGZhbGxiYWNrIHRvIHJ1bm5pbmcgdGhpcyBmdW5jdGlvbiBvbiB0aGUgZ2xvYmFsIE1hdGVyaWFsaXplIG9iamVjdFxuICAgICAgICAgICAgICAgICAgaWYgKE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSguLi5wYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyYW1zIGhhcyB0byBiZSBhbiBhcnJheS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIG1hdGVyaWFsaXplIGZ1bmN0aW9uICcnXCIgKyBmdW5jdGlvbk5hbWUgKyBcIicgb24gZWxlbWVudCBvciB0aGUgZ2xvYmFsIE1hdGVyaWFsaXplIG9iamVjdC5cIik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0LmVtaXQoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUb29sdGlwKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcInRvb2x0aXBcIik7XG4gIH1cblxuICBwcml2YXRlIGlzU2VsZWN0KCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcIm1hdGVyaWFsX3NlbGVjdFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNEYXRlUGlja2VyKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcInBpY2thZGF0ZVwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUaW1lUGlja2VyKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcInBpY2thdGltZVwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDaGlwcygpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJtYXRlcmlhbF9jaGlwXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0F1dG9jb21wbGV0ZSgpIHtcbiAgICAgIHJldHVybiAodGhpcy5fZnVuY3Rpb25OYW1lICYmIHRoaXMuX2Z1bmN0aW9uTmFtZSA9PT0gXCJhdXRvY29tcGxldGVcIik7XG4gIH1cblxuICBwcml2YXRlIGlzVGV4dGFyZWEoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5ub2RlTmFtZSA9PSBcIlRFWFRBUkVBXCI7XG4gIH1cblxuICBwcml2YXRlIGVuYWJsZURQQnV0dG9ucygpIHtcbiAgICAgICQoJy5waWNrZXJfX2NsZWFyJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fdG9kYXknKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX19jbG9zZScpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX3NlbGVjdC0teWVhcicpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX3NlbGVjdC0tbW9udGgnKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gIH1cbn1cbiJdfQ==