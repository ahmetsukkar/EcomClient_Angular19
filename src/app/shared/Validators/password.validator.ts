import { AbstractControl } from "@angular/forms";

export function ConfirmPassword(controls: AbstractControl): { [key: string]: boolean } | null {

    var password = controls.get('password'); //Get the password form control
    var confirmPassword = controls.get('confirmPassword'); //Get the confirm password form control

    if(password?.pristine || confirmPassword?.pristine) {
        return null; //If the password or confirm password field is pristine, return null (no error)
    }

    return password && confirmPassword && password.value !== confirmPassword.value 
    ? { 'passwordsMisMatch': true } 
    : null; //Check if the password and confirm password match
}