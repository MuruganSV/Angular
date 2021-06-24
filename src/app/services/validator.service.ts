import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ValidatorService {
    // Name validation 
        static emptyusernameValidator(control: FormControl) {
            if (control.value) {
                // const matches = control.value.match(/^[A-Za-z\s]+$/);
                // const matches = control.value.match('');
                return (control.value || '').trim().length !== 0;
            } else {
                return false;
            }
        }

        static minlengthUserNameValidator(control: FormControl) {
            if (control.value) {
                // const matches = control.value.match(/^[A-Za-z\s]+$/);
                // const matches = control.value.match('');
                return (control.value || '').trim().length > 2;
            } else {
                return false;
            }
        }

        static maxlengthUserNamePasswordValidator(control: FormControl) {
            if (control.value) {
                // const matches = control.value.match(/^[A-Za-z\s]+$/);
                // const matches = control.value.match('');
                return (control.value || '').trim().length < 21;
            } else {
                return false;
            }
        }

        static userNamePatternValidator(control: FormControl) {
            if (control.value) {
                // const matches = control.value.match(/^[A-Za-z\s]+$/);
                // const matches = control.value.match('');
                return (control.value || '').trim().length !== 0;
            } else {
                return false;
            }
        }

        
        
        
}