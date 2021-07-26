import { Component, OnInit } from '@angular/core';
import { Register } from '../register';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  // @ts-ignore
   formRegister: FormGroup;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.createForm(new Register());
  }

  createForm(cliente: Register) {
    this.formRegister = new FormGroup({
      nome: new FormControl(cliente.nome, Validators.required),
      email : new FormControl(cliente.email, Validators.required),
      telefone : new FormControl(cliente.telefone, Validators.required)
    })
  }

  onSubmit(user: Register){
    let baseURL: string = 'http://localhost:2333/api/v1/register';

    const parms = new HttpParams()
      .set('nome', user.nome)
      .set('email', user.email)
      .set('telefone', user.telefone);

    this.httpClient.post(`${baseURL}`, null,{'params': parms})
      .subscribe(data => {
        console.log("Success");
      },
        error => {
      console.error('There was an error!', error);
    });
    this.formRegister.reset(new Register());
  }

  get nome(){
    return this.formRegister.get('nome');
  }

  get email(){
    return this.formRegister.get('email');
  }

  get telefone(){
    return this.formRegister.get('telefone');
  }
}
