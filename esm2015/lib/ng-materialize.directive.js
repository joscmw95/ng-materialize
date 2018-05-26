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
export class NgMaterializeDirective {
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
NgMaterializeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[materialize]'
            },] },
];
/** @nocollapse */
NgMaterializeDirective.ctorParameters = () => [
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    { type: ElementRef, },
];
NgMaterializeDirective.propDecorators = {
    "init": [{ type: Output },],
    "materializeParams": [{ type: Input },],
    "materializeActions": [{ type: Input },],
    "materialize": [{ type: Input },],
    "materializeSelectOptions": [{ type: Input },],
    "ngModel": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbWF0ZXJpYWxpemUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbWF0ZXJpYWxpemUvIiwic291cmNlcyI6WyJsaWIvbmctbWF0ZXJpYWxpemUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUtOLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7QUEwQnBELE1BQU07Ozs7O0lBY0osWUFBeUMsWUFBNEIsR0FBZTtRQUEzQyxlQUFVLEdBQVYsVUFBVTtRQUFrQixRQUFHLEdBQUgsR0FBRyxDQUFZO3VCQVozRCxJQUFJOzZCQUNHLElBQUk7NkJBQ1osSUFBSTtnQ0FDRCxLQUFLOzZCQUNILEVBQUU7eUJBQ0YsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzsyQ0FFekIsSUFBSTtvQkFFbEIsSUFBSSxZQUFZLEVBQVE7MkJBQzFCLEtBQUs7S0FHMUI7Ozs7O1FBR1UsaUJBQWlCLENBQUMsTUFBVztRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQzs7Ozs7O1FBSU0sa0JBQWtCLENBQUMsT0FBaUQ7UUFDM0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQWtDLEVBQUUsRUFBRTtnQkFDckQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVB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Q0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssZUFBZSxDQUFDLENBQUM7Ozs7O0lBR2xFLGNBQWM7UUFDbEIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLGNBQWMsQ0FBQyxDQUFDOzs7OztJQUdqRSxVQUFVO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUM7Ozs7O0lBR2pELGVBQWU7UUFDbkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7OztZQTdSeEQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O3lDQWVjLE1BQU0sU0FBQyxXQUFXO1lBcEQvQixVQUFVOzs7cUJBaURULE1BQU07a0NBTU4sS0FBSzttQ0FRTCxLQUFLOzRCQWVMLEtBQUs7eUNBTUwsS0FBSzt3QkFLTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBEb0NoZWNrLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRXZlbnRFbWl0dGVyLFxuICBQTEFURk9STV9JRCxcbiAgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tRXZlbnQgfSBmcm9tICcuL2N1c3RvbS1ldmVudC1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmRlY2xhcmUgdmFyICQ6IGFueTtcbmRlY2xhcmUgdmFyIE1hdGVyaWFsaXplOiBhbnk7XG5cbi8vIGV4cG9ydCB0eXBlIE1hdGVyaWFsaXplT3B0aW9ucyA9XG4vLyBcImNvbGxhcHNpYmxlXCIgfFxuLy8gXCJkcm9wZG93blwiIHxcbi8vIFwibWF0ZXJpYWxib3hcIiB8XG4vLyBcInRhYnNcIiB8XG4vLyBcInRvb2x0aXBcIiB8XG4vLyBcImNoYXJhY3RlckNvdW50ZXJcIiB8XG4vLyBcIm1hdGVyaWFsX3NlbGVjdFwiIHxcbi8vIFwic2lkZU5hdlwiIHxcbi8vIFwibW9kYWxcIjtcblxuLy8gXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWF0ZXJpYWxpemVBY3Rpb24ge1xuICBhY3Rpb246IHN0cmluZztcbiAgcGFyYW1zOiBbYW55XTtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW21hdGVyaWFsaXplXSdcbn0pXG5leHBvcnQgY2xhc3MgTmdNYXRlcmlhbGl6ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9wYXJhbXM6IFthbnldID0gbnVsbDtcbiAgcHJpdmF0ZSBfZnVuY3Rpb25OYW1lOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzVmFsdWUgPSBudWxsO1xuICBwcml2YXRlIHByZXZpb3VzRGlzYWJsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfd2FpdEZ1bmN0aW9uOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSBpc0Jyb3dzZXI6IGJvb2xlYW4gPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuXG4gIHByaXZhdGUgY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgcHVibGljIGluaXQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IE9iamVjdCwgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgbWF0ZXJpYWxpemVQYXJhbXMocGFyYW1zOiBhbnkpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICB0aGlzLnBlcmZvcm1FbGVtZW50VXBkYXRlcygpO1xuICAgICAgfVxuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZUFjdGlvbnMoYWN0aW9uczogRXZlbnRFbWl0dGVyPHN0cmluZyB8IE1hdGVyaWFsaXplQWN0aW9uPikge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgYWN0aW9ucy5zdWJzY3JpYmUoKGFjdGlvbjogc3RyaW5nIHwgTWF0ZXJpYWxpemVBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmZvcm1Mb2NhbEVsZW1lbnRVcGRhdGVzKGFjdGlvbik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoYWN0aW9uLmFjdGlvbiwgYWN0aW9uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH0pXG4gICAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IG1hdGVyaWFsaXplKGZ1bmN0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgICB0aGlzLl9mdW5jdGlvbk5hbWUgPSBmdW5jdGlvbk5hbWU7XG4gIH1cblxuICAvLyB0aGlzIGlzIGhlcmUgdG8gdHJpZ2dlciBjaGFuZ2UgZGV0ZWN0aW9uIGZvciBzZWxlY3QgZWxlbWVudHNcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXRlcmlhbGl6ZVNlbGVjdE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gIH1cblxuICAvL3VzZWQgZm9yIHRoZSBkYXRlcGlja2VyIGF0IHRoZSBtb21lbnRcbiAgQElucHV0KCkgbmdNb2RlbDtcblxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhfdW51c2VkPykge1xuICAgICAgaWYgKHRoaXMuaXNCcm93c2VyKSB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3QoKSkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIHRoaXMucGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpO1xuICAgICAgfVxuICB9XG5cbiAgcHVibGljIG5nRG9DaGVjaygpIHtcbiAgICAgIGlmICh0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGlmICh0aGlzLmlzU2VsZWN0KCkpIHtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAobmF0aXZlRWxlbWVudC5kaXNhYmxlZCAhPSB0aGlzLnByZXZpb3VzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNEaXNhYmxlZCA9IG5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQ7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICghalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikgJiYgbmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBvZiB0aGUgbW9kZWxcbiAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNWYWx1ZSA9IG5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICAgICAgICBzaG91bGRVcGRhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucGVyZm9ybUxvY2FsRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICAgICAgaWYgKG5hdGl2ZUVsZW1lbnQudmFsdWUgIT0gdGhpcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzVmFsdWUgPSBuYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5wZXJmb3JtRWxlbWVudFVwZGF0ZXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybUVsZW1lbnRSZW1vdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzVG9vbHRpcCgpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgY29uc3QgdG9vbHRpcElkID0galF1ZXJ5RWxlbWVudC5hdHRyKCdkYXRhLXRvb2x0aXAtaWQnKTtcbiAgICAgICAgICBpZiAodG9vbHRpcElkKSB7XG4gICAgICAgICAgICAgICQoJyMnICsgdG9vbHRpcElkKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gIH1cblxuICBwcml2YXRlIHBlcmZvcm1FbGVtZW50VXBkYXRlcygpIHtcbiAgICAgIC8vIGl0IHNob3VsZCBoYXZlIGJlZW4gY3JlYXRlZCBieSBub3csIGJ1dCBjb25maXJtIGFueXdheVxuICAgICAgaWYgKE1hdGVyaWFsaXplICYmIE1hdGVyaWFsaXplLnVwZGF0ZVRleHRGaWVsZHMpIHtcbiAgICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBzZWxlY3QgY2hhbmdlcyBmcm9tIHRoZSBIVE1MXG4gICAgICBpZiAodGhpcy5pc1NlbGVjdCgpICYmIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QgalF1ZXJ5RWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFlLm9yaWdpbmFsRXZlbnQgfHwgIWUub3JpZ2luYWxFdmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50OiBhbnkgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO1xuICAgICAgICAgICAgICAgICAgLy9pZiAoalF1ZXJ5RWxlbWVudC5hdHRyKFwibXVsdGlwbGVcIikpIHtcbiAgICAgICAgICAgICAgICAgIC8vZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiaW5wdXRcIixmYWxzZSxmYWxzZSx1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAgICAgICAvL2Vsc2Uge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuaW5pdEN1c3RvbUV2ZW50KFwiY2hhbmdlXCIsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICAgICAgICBldmVudC5pbnRlcm5hbFRvTWF0ZXJpYWxpemUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJTaG91bGRCZUFkZGVkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQXV0b2NvbXBsZXRlKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGFuZ2VcIiwgZSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJpbnB1dFwiKSkpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNEYXRlUGlja2VyKCkpIHtcbiAgICAgICAgICBjb25zdCBuYXRpdmVFbGVtZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICBjb25zdCBqcXVlcnlQaWNrZXJFbGVtZW50ID0gJChuYXRpdmVFbGVtZW50KTtcblxuICAgICAgICAgIGNvbnN0IGRhdGVQaWNrZXIgPSBqcXVlcnlQaWNrZXJFbGVtZW50W3RoaXMuX2Z1bmN0aW9uTmFtZV0oLi4udGhpcy5fcGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBwaWNrZXIgPSBkYXRlUGlja2VyLnBpY2thZGF0ZSgncGlja2VyJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm5nTW9kZWwpIHsgLy8gUFIgMjkyIC0gMVxuICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdGhpcy5uZ01vZGVsKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0ganF1ZXJ5UGlja2VyRWxlbWVudC52YWwoKTtcbiAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcGlja2VyLnNldCgnc2VsZWN0JywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzVGltZVBpY2tlcigpKSB7XG4gICAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3QganF1ZXJ5UGlja2VyRWxlbWVudCA9ICQobmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICBjb25zdCB0aW1lUGlja2VyID0ganF1ZXJ5UGlja2VyRWxlbWVudFt0aGlzLl9mdW5jdGlvbk5hbWVdKC4uLnRoaXMuX3BhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcGlja2VyID0gdGltZVBpY2tlci5waWNrYXRpbWUoJ3BpY2tlcicpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5uZ01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKHRoaXMubmdNb2RlbCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwaWNrZXIudmFsKGpxdWVyeVBpY2tlckVsZW1lbnQudmFsKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGpxdWVyeVBpY2tlckVsZW1lbnQub24oJ2NoYW5nZScsIGUgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiaW5wdXRcIikpKSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ2hpcHMoKSkge1xuICAgICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgIGNvbnN0IGpRdWVyeUVsZW1lbnQgPSAkKG5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIGpRdWVyeUVsZW1lbnQub24oXCJjaGlwLmFkZFwiLCAoZSwgY2hpcCkgPT4gbmF0aXZlRWxlbWVudC5kaXNwYXRjaEV2ZW50KCg8YW55PkN1c3RvbUV2ZW50KFwiY2hpcC5hZGRcIiwgY2hpcCkpKSk7XG4gICAgICAgICAgalF1ZXJ5RWxlbWVudC5vbihcImNoaXAuZGVsZXRlXCIsIChlLCBjaGlwKSA9PiBuYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJjaGlwLmRlbGV0ZVwiLCBjaGlwKSkpKTtcbiAgICAgICAgICBqUXVlcnlFbGVtZW50Lm9uKFwiY2hpcC5zZWxlY3RcIiwgKGUsIGNoaXApID0+IG5hdGl2ZUVsZW1lbnQuZGlzcGF0Y2hFdmVudCgoPGFueT5DdXN0b21FdmVudChcImNoaXAuc2VsZWN0XCIsIGNoaXApKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc1RleHRhcmVhKCkpIHtcbiAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoKDxhbnk+Q3VzdG9tRXZlbnQoXCJhdXRvcmVzaXplXCIsIHtcbiAgICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRldGFpbDogdW5kZWZpbmVkXG4gICAgICAgICAgfSkpKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtTG9jYWxFbGVtZW50VXBkYXRlcyhmdW5jdGlvbk5hbWUgPSB0aGlzLl9mdW5jdGlvbk5hbWUsIHBhcmFtcyA9IHRoaXMuX3BhcmFtcykge1xuICAgICAgaWYgKHRoaXMuX3dhaXRGdW5jdGlvbltmdW5jdGlvbk5hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IHRydWU7XG5cbiAgICAgICQoZG9jdW1lbnQpLnJlYWR5KCgpID0+IHtcbiAgICAgICAgICB0aGlzLl93YWl0RnVuY3Rpb25bZnVuY3Rpb25OYW1lXSA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYgKGZ1bmN0aW9uTmFtZSkge1xuICAgICAgICAgICAgICBjb25zdCBqUXVlcnlFbGVtZW50ID0gJCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgICAgaWYgKGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnlFbGVtZW50W2Z1bmN0aW9uTmFtZV0oLi4ucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeUVsZW1lbnRbZnVuY3Rpb25OYW1lXSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgdG8gcnVubmluZyB0aGlzIGZ1bmN0aW9uIG9uIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICBpZiAoTWF0ZXJpYWxpemVbZnVuY3Rpb25OYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZVtmdW5jdGlvbk5hbWVdKC4uLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbXMgaGFzIHRvIGJlIGFuIGFycmF5LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGVyaWFsaXplW2Z1bmN0aW9uTmFtZV0oKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgbWF0ZXJpYWxpemUgZnVuY3Rpb24gJydcIiArIGZ1bmN0aW9uTmFtZSArIFwiJyBvbiBlbGVtZW50IG9yIHRoZSBnbG9iYWwgTWF0ZXJpYWxpemUgb2JqZWN0LlwiKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXQuZW1pdCgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Rvb2x0aXAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwidG9vbHRpcFwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTZWxlY3QoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwibWF0ZXJpYWxfc2VsZWN0XCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0RhdGVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2FkYXRlXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1RpbWVQaWNrZXIoKSB7XG4gICAgICByZXR1cm4gKHRoaXMuX2Z1bmN0aW9uTmFtZSAmJiB0aGlzLl9mdW5jdGlvbk5hbWUgPT09IFwicGlja2F0aW1lXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NoaXBzKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcIm1hdGVyaWFsX2NoaXBcIik7XG4gIH1cblxuICBwcml2YXRlIGlzQXV0b2NvbXBsZXRlKCkge1xuICAgICAgcmV0dXJuICh0aGlzLl9mdW5jdGlvbk5hbWUgJiYgdGhpcy5fZnVuY3Rpb25OYW1lID09PSBcImF1dG9jb21wbGV0ZVwiKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUZXh0YXJlYSgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50Lm5vZGVOYW1lID09IFwiVEVYVEFSRUFcIjtcbiAgfVxuXG4gIHByaXZhdGUgZW5hYmxlRFBCdXR0b25zKCkge1xuICAgICAgJCgnLnBpY2tlcl9fY2xlYXInKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XG4gICAgICAkKCcucGlja2VyX190b2RheScpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgICAgICQoJy5waWNrZXJfX2Nsb3NlJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS15ZWFyJykucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xuICAgICAgJCgnLnBpY2tlcl9fc2VsZWN0LS1tb250aCcpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcbiAgfVxufVxuIl19