import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ModalAddService } from '../modal-add.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent implements OnInit {

  formProduct: FormGroup;
  constructor(private modalAddService: ModalAddService,
              private formBuilder: FormBuilder) {
  this.formProduct = this.formBuilder.group({
    name: ['',[Validators.required]],
    code: ['',[Validators.required, Validators.pattern('^[a-zA-Z]{3,3}-[0-9]{4,4}$')]],
    date: ['',[Validators.required]],
    price: ['',[Validators.required]],
    description: ['',[Validators.required]],
    rating: ['',[Validators.required]],
    
  })
               }

  ngOnInit() {
  }
  ocultarModal(){
    this.modalAddService.ocultarModal();
  }
  saveData(){
    console.log(this.formProduct.value);
  }
  
}
