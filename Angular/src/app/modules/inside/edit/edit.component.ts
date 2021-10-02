import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() entryId:any;
  @Input() expense:any;
  @Input() income:any;
  @Input() concept:any;
  form: FormGroup;
  mount:any;


  constructor(public activeModal: NgbActiveModal,   private fb: FormBuilder, private operationSvc:OperationsService) {
    this.form = this.fb.group({
      mount: ['', [Validators.required, Validators.minLength(1)]],
      concept: ['', [Validators.required, Validators.minLength(1)]],
    });

  }

  ngOnInit(): void {
    console.log(this.entryId)
    this.mounting()
  }
  mounting(){
    if(this.expense>0){
      this.mount = new Object(this.expense)
      this.expense = this.form.value.mount;
    }else{
      this.mount = new Object(this.income)
      this.income = this.form.value.mount;
    }
  }
  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }
  editOperation() {
    this.mounting();
    const editData = {
      entryId: this.entryId,
      expenses: this.expense,
      income:this.income,
      concept: this.form.value.concept,
    };
    const token = this.getToken();
    ///  console.log(token);
    ////console.log(editData);
    this.operationSvc.update(token, editData).subscribe((data) => {
      console.log(data);
      console.log(editData);
    });
    alert("This operation was edited successfully");
  }
}
