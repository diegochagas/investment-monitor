import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-options',
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss']
})
export class SelectOptionsComponent implements OnChanges {
  @Input() title = "";
  @Input() dataOptions = [];
  @Input() selectedOption = "";
  @Input() multiple = false;

  formGroupSelectOptions: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formGroupSelectOptions = this.formBuilder.group({
      val: ['', [Validators.required]]
    });
  }

  ngOnChanges(changes) {
    if (changes.selectedOption) {
      if (!changes.selectedOption.firstChange) {
        this.formGroupSelectOptions.patchValue({
          val: changes.selectedOption.currentValue
        });
      }
    }
  }

}
