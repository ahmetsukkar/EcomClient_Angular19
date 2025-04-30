import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map, of, switchMap, timer } from "rxjs";
import { AccountService } from "../../account/account.service";

@Injectable({ providedIn: 'root' })

export class EmailValidator {
    constructor(private accountService: AccountService) { } //Inject the AccountService to use its methods


    ValidateEmailNotToken(): AsyncValidatorFn {
        return controls => {
            return timer(1000).pipe(
                switchMap(() => {
                    if (!controls.value) {
                        return of(null); //If the control value is empty, return null (no error)
                    }
                    return this.accountService.checkEmailExists(controls.value).pipe(
                        map((res: any) => {
                            return res ? { emailExists: true } : null; //Check if the email exists and return an error if it does
                        })
                    )
                })
            )
        }
    }
}