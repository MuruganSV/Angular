// import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
// import * as ng from "angular";

// export const getControlName = (control: ng.forms.AbstractControl) =>
// {
//     var controlName = null;
//     var parent = control["_parent"];

//     // only such parent, which is FormGroup, has a dictionary 
//     // with control-names as a key and a form-control as a value
//     if (parent instanceof ng.forms.FormGroup)
//     {
//         // now we will iterate those keys (i.e. names of controls)
//         Object.keys(parent.controls).forEach((name) =>
//         {
//             // and compare the passed control and 
//             // a child control of a parent - with provided name (we iterate them all)
//             if (control === parent.controls[name])
//             {
//                 // both are same: control passed to Validator
//                 //  and this child - are the same references
//                 controlName = name;
//             }
//         });
//     }
//     // we either found a name or simply return null
//     return controlName;
// }