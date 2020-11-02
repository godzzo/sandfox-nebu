import { SandfoxNebuFormControlsService } from '../sandfox-nebu-form-controls.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sffc-form-tinymce',
  templateUrl: './form-tinymce.component.html',
  styleUrls: ['./form-tinymce.component.scss'],
})
export class FormTinymceComponent implements OnInit {
  @Input() name = 'Simple';
  @Input() caption = 'WYSIWYG';
  @Input() formGroup: FormGroup;
  @Input() readOnlyMode = false;

  config = {
    height: 500,
    menubar: false,
    base_url: '/tinymce', // Root for resources
    suffix: '', // .min Suffix to use when loading resources
    plugins: ['lists, hr, code, paste'],
    toolbar:
      'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | hr ',
  };

  constructor(protected formService: SandfoxNebuFormControlsService) {
    console.log('FormTinymceComponent', this.config);
  }

  ngOnInit() {}

  getStatus() {
    const control = this.formGroup.controls[this.name];

    return this.formService.getControlStatus(control);
  }
}
