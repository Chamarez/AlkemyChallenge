import { EventEmitter, Component, OnInit, OnChanges, Output, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss']
})
export class InsideComponent implements OnInit {
  form: FormGroup;
  incomes: any = [{}];
  expens: any = [{}];
  allOperations:any = [{}];
  headElements = ['ID', 'Concept', 'Income', 'Expense', "Date", ""];
  incomeAmount:any;
  expenseAmount:any;
  totalSum:any;
  positive:any;
  negative:any;

  constructor(private operationSvc:OperationsService, private fb: FormBuilder) {

    this.form = this.fb.group({
      mount: [null, [Validators.required ]],
      concept: ['',[Validators.required]],
      operation: ['',[Validators.required]],
    }
    );




    this.income();
    this.expenses();





   }
  ngOnInit(): void {

  }








deleteOperation(){
  const entry = {
    entryId:12
  };
  const token = this.getToken();
  this.operationSvc.delete(token, entry).subscribe((data) =>{

    console.log(data);
    console.log(entry);

});

}


CreatOperation(){
  const mount = this.form.value.mount;
  const concept = this.form.value.concept;
  const operation = this.form.value.operation;


  ///expense operationType == 0
  /// income operationType == 1
  let operationType;
  let income;
  let expenses;
  if(operation == 1){
  operationType = 1;
  income= parseFloat(mount);

  }else if (operation == 2){
    operationType = 0;
    expenses= parseFloat(mount);
  }

  const newData = {
    income:income || null,
    expenses:expenses || null,
    concept:concept,
    operationType:operationType
  };
  const token = this.getToken();
///  console.log(token);
  ////console.log(editData);
   this.operationSvc.create(token, newData).subscribe((data) =>{
    console.log(data);

}) ;

}

EditOperation(){


  const editData = {
    operationType:1,
    entryId:25,
    expenses:555,
    concept:"sandias"
  };
  const token = this.getToken();
///  console.log(token);
  ////console.log(editData);
  this.operationSvc.update(token, editData).subscribe((data) =>{
    console.log(data);
    console.log(editData);
});
}



getToken(){
  const token = localStorage.getItem('token');
  return token
}


income(){
  const token = this.getToken();
  this.operationSvc.income(token).subscribe((data) =>{
    this.incomes = new Object(data);
    this.sum(this.incomes)
    return this.incomes;
});

}


expenses(){
  const token = this.getToken();
  this.operationSvc.expense(token).subscribe((data) =>{
    this.expens = new Object(data);
    this.sum(this.expens);
    let a = this.concatJson()
    this.orderJson()
    this.total()

    return this.expens;
});
}


sum(data:any){
const dataLenght = data.length;
let sum = 0;
const dataType = data[0].operationType

if(dataType ==1){
  for(let i = 0; i < dataLenght; i++){
    sum = sum + data[i].income;
  }
  this.incomeAmount = new Object(sum);
  return this.incomeAmount;
}else{
  for(let i = 0; i < dataLenght; i++){
    sum = sum + data[i].expenses;

  }
  this.expenseAmount = new Object(sum);
  return this.expenseAmount

}
}


concatJson(){
this.allOperations =new Object(this.incomes.concat(this.expens))
return this.allOperations;
}

orderJson(){
  const key = "entryId"

  this.allOperations.sort(function (a:any, b:any) {
    var x = a[key],
    y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));

},

);
let sortedInput = this.allOperations.slice().sort((a:any, b:any) => b.entryId - a.entryId);
this.allOperations = sortedInput
return this.allOperations;
}


total(){
  this.totalSum = this.incomeAmount - this.expenseAmount;
  console.log(this.totalSum)
  if(this.totalSum>0){
    this.positive = new Object(this.totalSum);
  }else{
    this.negative = new Object(this.totalSum);

  }

}



}
