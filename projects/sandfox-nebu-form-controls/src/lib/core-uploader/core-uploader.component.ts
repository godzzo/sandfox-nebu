import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  UploaderOptions,
  UploadStatus,
} from 'ngx-uploader';

@Component({
  selector: 'sffc-core-uploader',
  templateUrl: './core-uploader.component.html',
  styleUrls: ['./core-uploader.component.scss'],
})
export class CoreUploaderComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();

  @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>();

  @Input() extraTemplate: TemplateRef<any>;

  @Input() options: UploaderOptions = {
    concurrency: 0,
    maxUploads: 10,
    maxFileSize: 100 * 1024 * 1024,
  };
  files: UploadFile[] = [];

  dragOver: boolean;

  @Input() url: string;

  constructor() {}

  ngOnInit(): void {}

  onUploadOutput(output: UploadOutput): void {
    console.log('onUploadOutput', output);

    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.url,
        method: 'POST',
        data: { foo: 'bar' },
      };

      this.uploadInput.emit(event);
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      this.files.push(output.file);
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      const index = this.files.findIndex(
        (file) =>
          typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (
      output.type === 'rejected' &&
      typeof output.file !== 'undefined'
    ) {
      // console.log(output.file.name + ' rejected');
    }

    this.progressStatus();
  }

  progressStatus() {
    this.files = this.files.filter((file) => {
      console.log('DONE', { file, response: file.response });

      if (file.progress.status === UploadStatus.Done) {
        const item = {
          name: file.response.fileName,
          title: file.response.fileName,
          path: file.response.guid,
          logicRemove: 0,
        };

        this.addNewItem(item);
      }

      return file.progress.status !== UploadStatus.Done;
    });
  }

  addNewItem(item: any) {
    this.fileUploaded.emit(item);
  }
}
