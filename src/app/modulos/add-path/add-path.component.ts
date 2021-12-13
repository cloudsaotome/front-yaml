import { Component } from '@angular/core';

import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

import { ResponseTemplate } from '../../modelos/response';
import { ArchivoService } from '../../services/archivo.service';

@Component({
  selector: 'app-add-path',
  templateUrl: './add-path.component.html',
  styleUrls: ['./add-path.component.css']
})
export class AddPathComponent {
  ok: boolean;
  isSuccess: boolean;
  hasFiles: boolean;
  response: ResponseTemplate;
  fileList: File[];

  constructor(
    private spinner: NgxSpinnerService,
    private archivoService: ArchivoService
  ){
    this.ok = false;
    this.isSuccess = false;
    this.hasFiles = false;
    this.response = new ResponseTemplate();
    this.fileList = [];
  }

  SeleccionArchivos(event){
    try{
      this.spinner.show();
      this.fileList = event.target.files;
      if(this.fileList.length > 0){
        this.hasFiles = true;
      } else {
        this.hasFiles = false;
      }
    } catch(error) {
      console.log(error);
      this.MostrarAlerta("Error", error, "error");
    } finally {
      this.spinner.hide();
    }
  }

  async SubirContratos(){
    try {
      this.spinner.show();
      const formData: FormData = new FormData();
      for(let i = 0; i < this.fileList.length; i++){
        formData.append("archivos", this.fileList[i], this.fileList[i].name);
      }
      this.response = <ResponseTemplate> await this.SubidaDeArchivos(formData);
      this.isSuccess = true;
      this.ok = true;
      this.hasFiles = false;
      this.MostrarAlerta("Éxito", this.response.mensaje, "success");
    } catch(error){
      console.log(error);
      this.MostrarAlerta("Error", error, "error");
    } finally {
      this.spinner.hide();
    }
  }

  SubidaDeArchivos(formData: FormData){
    return new Promise(resolve => {
      this.archivoService.SubirContratos(formData).subscribe(data => {
        resolve(data)
      })
    });
  }

  QuitarArchivo(index: number){
    var fl: File[] = [];
    for(let i = 0; i < this.fileList.length; i++){
      if(i != index){
        fl.push(this.fileList[i]);
      }
    }
    this.fileList = fl;
  }

  //MOSTRAR ALERTAS
  MostrarAlerta(title, html, icon){
    Swal.fire({
      title: title,
      html: html,
      icon: icon,
      confirmButtonText: 'Entiendo'
    });
  }

}
