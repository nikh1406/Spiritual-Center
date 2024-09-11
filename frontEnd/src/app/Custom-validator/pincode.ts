import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function pincodeValidator(): ValidatorFn {
    return (control:AbstractControl) : {[key:string]:any} | null => {

        const value = /[^0-9]/.test(control.value);
        
        return !value ? null :{'invalidPincode':{value:control.value}}

        
    }
}