import {
  EventEmitter,
  Component,
  OnInit,
  OnChanges,
  Output,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
} from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.component.html',
  styleUrls: ['./inside.component.scss'],
})
export class InsideComponent implements OnInit {
  form: FormGroup;
  incomes: any = [{}];
  expens: any = [{}];
  allOperations: any = [{}];
  headElements = ['Id', 'Date', 'Concept', 'Income', 'Expense', ''];
  incomeAmount: any;
  expenseAmount: any;
  totalSum: any;
  positive: any;
  negative: any;

  constructor(
    private operationSvc: OperationsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = this.fb.group({
      mount: [null, [Validators.required, Validators.minLength(1)]],
      concept: ['', [Validators.required, Validators.minLength(3)]],
      operation: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.income();
    this.expenses();
    this.total();
  }

  CreatOperation() {
    const mount = this.form.value.mount;
    const concept = this.form.value.concept;
    const operation = this.form.value.operation;

    ///expense operationType == 0
    /// income operationType == 1
    let operationType;
    let income;
    let expenses;
    if (operation == 1) {
      operationType = 1;
      income = parseFloat(mount);
    } else if (operation == 2) {
      operationType = 0;
      expenses = parseFloat(mount);
    }

    const newData = {
      income: income || null,
      expenses: expenses || null,
      concept: concept,
      operationType: operationType,
    };
    const token = this.getToken();
    this.operationSvc.create(token, newData).subscribe((data) => {
      console.log(data);
    });
    window.location.reload();
  }

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  income() {
    const token = this.getToken();
    this.operationSvc.income(token).subscribe((data) => {
      this.incomes = new Object(data);
      this.sum(this.incomes);
      return this.incomes;
    });
  }

  expenses() {
    const token = this.getToken();
    this.operationSvc.expense(token).subscribe((data) => {
      this.expens = new Object(data);

      this.sum(this.expens);

      this.concatJson();
      this.orderJson();
      this.total();

      return this.expens;
    });
  }

  sum(data: any) {
    const dataLenght = data.length;

    let sum = 0;
    if (dataLenght > 0) {
      const dataType = data[0].operationType;

      if (dataType == 1) {
        for (let i = 0; i < dataLenght; i++) {
          sum = sum + data[i].income;
        }
        this.incomeAmount = new Object(sum);
        return this.incomeAmount;
      } else if (dataType == 0) {
        for (let i = 0; i < dataLenght; i++) {
          sum = sum + data[i].expenses;
        }
        this.expenseAmount = new Object(sum);
        return this.expenseAmount;
      } else {
        console.log('dont work');
      }
    }
  }

  concatJson() {
    this.allOperations = new Object(this.incomes.concat(this.expens));

    return this.allOperations;
  }

  orderJson() {
    const key = 'entryId';

    this.allOperations.sort(function (a: any, b: any) {
      var x = a[key],
        y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
    let sortedInput = this.allOperations
      .slice()
      .sort((a: any, b: any) => b.entryId - a.entryId);
    this.allOperations = sortedInput;
    /* If want to have - in empty colums */
    /*     for (let i = 0; i < this.allOperations.length; i++) {
      if(this.allOperations[i].expenses == null){
        this.allOperations[i].expenses = "-"
      }
    }
 */
    return this.allOperations;
  }

  total() {
    if (this.incomeAmount == null) {
      this.incomeAmount = 0;
    } else if (this.expenseAmount == null) {
      this.expenseAmount = 0;
    }
    this.totalSum = this.incomeAmount - this.expenseAmount;

    if (this.totalSum > 0) {
      this.positive = new Object(this.totalSum);
    } else if (this.totalSum < 0) {
      this.negative = new Object(this.totalSum);
    } else {
      this.positive = 0;
    }
  }

  deleteOperation(entryId: any) {
    const entry = {
      entryId: entryId,
    };

    const token = this.getToken();
    this.operationSvc.delete(token, entry).subscribe((data) => {
      console.log('Operation Deleted');
    });
    window.location.reload();
  }

  modalRef(entryId: number, income: any, expense: any, concept: string) {
    entryId = entryId;
    income = income || 0;
    expense = expense || 0;
    const dialogRef = this.modalService.open(EditComponent, {});
    dialogRef.componentInstance.income = income;
    dialogRef.componentInstance.entryId = entryId;
    dialogRef.componentInstance.expense = expense;
    dialogRef.componentInstance.concept = concept;
  }
}
