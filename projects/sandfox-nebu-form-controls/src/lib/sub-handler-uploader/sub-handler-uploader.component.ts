import { environment } from '@env/environment';
import { SubHandler } from './../sub-handler/sub-handler.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';

export interface SubUploaderHandler {
  prepareNewItem(item: any);
}

@Component({
  selector: 'sffc-sub-handler-uploader',
  templateUrl: './sub-handler-uploader.component.html',
  styleUrls: ['./sub-handler-uploader.component.scss'],
})
export class SubHandlerUploaderComponent implements OnInit {
  @Input() caption: string = 'Caption';
  @Input() name: string = 'urls';
  @Input() formGroup: FormGroup;

  @Input() childName: string;
  @Input() parentApi: string;
  @Input() parentId: any;

  @Input() readOnlyMode = false;

  @Input() specItemTemplate: TemplateRef<any>;

  formArray: FormArray;

  @Input() handler: SubHandler = new (class implements SubHandler {
    constructor(public parent: SubHandlerUploaderComponent) {}

    createNewFormGroup(item: any): FormGroup {
      // item[this.parent.fieldName] = '';

      return this.parent.formBuilder.group(item);
    }

    createItemFormGroup(item: any): FormGroup {
      return this.parent.formBuilder.group(item);
    }
  })(this);

  @Input() uploaderHandler: SubUploaderHandler;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formArray = this.formGroup.controls[this.name] as FormArray;
  }

  onFileUploaded(file) {
    console.log('onFileUploaded', file);

    if (this.uploaderHandler) {
      this.uploaderHandler.prepareNewItem(file);
    }

    const formGroup = this.formBuilder.group(file);

    this.formArray.push(formGroup);
  }

  getDownloadPath(data) {
    return `${environment.baseUrl}/files/${data.path}`;
  }

  getExtension(path) {
    const parts = path.toLowerCase().split('.');

    return parts[parts.length - 1];
  }

  isImage(path) {
    return ['jpg', 'png', 'tiff', 'tif', 'bmp', 'jpeg', 'webp'].includes(
      this.getExtension(path)
    );
  }
}
