import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";

import { ClientiService } from "./clienti.service";
import { map } from "rxjs/operators";

export class CodFidValidator {

  static createValidator(clientiService: ClientiService): AsyncValidatorFn {

    return (control: AbstractControl): Observable<ValidationErrors> => {
      if (clientiService.checkCliente(control.value) != null)
      {
        return clientiService.checkCliente(control.value).pipe(
          map((result: boolean) => !result ? null : {invalidAsync: true})
        );
      }
      else
        return of(null);
    };

  }
}
