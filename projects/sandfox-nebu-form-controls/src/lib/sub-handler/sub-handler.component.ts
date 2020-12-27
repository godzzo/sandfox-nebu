import { Component, OnInit, Input, TemplateRef, } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

export interface SubHandler {
  createItemFormGroup(item: any): FormGroup;
  createNewFormGroup(item: any): FormGroup;

  // filterItem(item: any): boolean;
}

/*
 * Parameters:
 * @Input() items - Data Source
 * @Input() itemTemplate - List Item Template
 * @Input() subHandler - Callbacks with return
 *
 * Primary Functions:
 * - Data: Input
 * - Events: onAdd, onRemove, onSelect, onFilter... - ???
 * - Create New Item: Callback
 * - Render List Item: Input TemplateRef
 * - Render New Item Form: Input TemplateRef
 * - Handler FormGroup/FormArray: Input and Logic
 *
 * Secondary Functions:
 * - DataSource: Input - Observable
 * - Render Filter Form: Input TemplateRef
 * - Filter: Callback ??? - Call SubHandlerComponent to filter items, or send filtered items?
 * - Remove Confirm Dialog - ??? - maybe boolean Input or Callback
 * -
 *
 */
@Component({
  selector: 'sffc-sub-handler',
  templateUrl: './sub-handler.component.html',
  styleUrls: ['./sub-handler.component.scss']
})
export class SubHandlerComponent implements OnInit {
  @Input() name: string;
  @Input() parentFormGroup: FormGroup;
  @Input() parentName: string;
  @Input() parentApi: string;
  @Input() childName: string;
  @Input() parentId: string;

  @Input() subHandler: SubHandler;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() newTemplate: TemplateRef<any>;

  @Input() caption = 'Caption';
  @Input() readOnlyMode = false;
  @Input() hasNewButton = true;

  formArray: FormArray;
  formGroupNewItem: FormGroup;


  constructor(
    protected dataService: DataService,
  ) {}

  ngOnInit() {
    console.log(`SubHandlerComponent ngOnInit ${this.name}`, {own: this, newTemplate: this.newTemplate});

    this.formArray = this.parentFormGroup.controls[this.name] as FormArray;

    this.dataService.getChildrenToFormArray(
      this.parentId, this.parentFormGroup, this.parentApi, this.childName, this.name, this.readOnlyMode);

    this.initItems();
  }

  initItems() {
    this.prepareNewItem();
  }

  prepareNewItem() {
    const newItem: any = {logicRemove: 0};
    this.formGroupNewItem = this.subHandler.createNewFormGroup(newItem);
  }

  onRemove(event, form, index) {
    this.dataService.deleteItem(this.parentFormGroup, index, form, this.name);
  }

  onAddNewItem() {
    this.formArray.push(this.formGroupNewItem);

    this.prepareNewItem();
  }
}
