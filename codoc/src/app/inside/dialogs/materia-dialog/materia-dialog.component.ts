import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-materia-dialog',
  templateUrl: './materia-dialog.component.html',
  styleUrls: ['./materia-dialog.component.css']
})
export class MateriaDialogComponent implements OnInit {
  toppings = this._formBuilder.group({
    pepperoni: false,
    extracheese: false,
    mushroom: false,
  });
  ngOnInit(): void {
  }

  constructor(private _formBuilder: FormBuilder) {
   
  }
}