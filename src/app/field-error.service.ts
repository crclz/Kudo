import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, MinLengthValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldErrorService {

  constructor() { }

  hintControl(control: AbstractControl): string {
    if (control.valid) {
      return '';
    }
    if (!control.dirty && !control.touched) {
      return '';
    }

    if (!control.errors)
      return "";

    if ('required' in control.errors) {
      return "必填";
    }

    if ('minlength' in control.errors) {
      var { requiredLength, actualLength } = control.errors.minlength;
      return `最小长度: ` + requiredLength;
    }

    if ('maxlength' in control.errors) {
      var { requiredLength, actualLength } = control.errors.maxlength;
      return `最大长度: ` + requiredLength;
    }

    console.error("unknown error type", control.errors)
    return "未知错误";
  }

  formField(form: FormGroup, field: string): string {
    var control = form.get(field);
    if (control == null) {
      throw "Unknown field name" + field;
    }

    return this.hintControl(control);
  }
}
