import {FormControl} from "@angular/forms";

export class ValidatorService {

    static noWhitespaceValidatorOrNull(control: FormControl) {
        if (control.value == null) return null;
        let isWhitespace = (control.value || '').trim().length === 0;
        let isValid = !isWhitespace;
        return isValid ? null : {'whitespace': true}
    }

}
