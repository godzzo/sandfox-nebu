import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-foobar-form',
  templateUrl: './foobar-form.component.html',
  styleUrls: ['./foobar-form.component.scss'],
})
export class FoobarFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      title: 'Hello World',
      type: null,
      isActive: true,
    });
  }

  ngOnInit(): void {}
}
