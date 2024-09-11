import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control:AbstractControl) : {[key:string]:any} | null => {

        const currentData = new Date();
        const twoMonthAngo = new Date(currentData.setMonth(currentData.getMonth() - 3));
        const selectedData = new Date(control.value);
        
        return selectedData >= twoMonthAngo ? null :{'invalidDate':{value:control.value}}
    }
}