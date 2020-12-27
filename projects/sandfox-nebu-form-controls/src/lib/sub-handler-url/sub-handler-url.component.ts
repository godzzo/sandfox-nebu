import { SubHandler } from './../sub-handler/sub-handler.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'sffc-sub-handler-url',
  templateUrl: './sub-handler-url.component.html',
  styleUrls: ['./sub-handler-url.component.scss']
})
export class SubHandlerUrlComponent implements OnInit {
  @Input() caption = 'URL';
  @Input() placeholder = 'Másold ide a kapcsolódó URL-t';
  @Input() name = 'urls';
  @Input() formGroup: FormGroup;
  @Input() fieldName = 'url';

  @Input() childName: string;
  @Input() parentApi: string;
  @Input() parentId: any;

  @Input() readOnlyMode = false;

  @Input() specItemTemplate: TemplateRef<any>;
  @Input() specPosition = 'before';

  public urlHandler = new class implements SubHandler {
    constructor(public parent: SubHandlerUrlComponent) {}

    createNewFormGroup(item: any): FormGroup {
      item[this.parent.fieldName] = '';

      return this.parent.formBuilder.group(item);
    }

    createItemFormGroup(item: any): FormGroup{
      return this.parent.formBuilder.group(item);
    }
  }(this);

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }
}
