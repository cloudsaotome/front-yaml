import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseTemplate } from '../modelos/response';

@Injectable()

export class ArchivoService {
    constructor(private http: HttpClient) { }

    SubirContratos(formData: FormData){
        const path = "http://localhost:8081/superapp/mensajeria/gestion-mensajes/v1/add-path";
        const heads = new HttpHeaders()
        heads.append('Accept', '*/*');
        heads.append('Content-Type', 'multipart/form-data');
        heads.append('Accept-Encoding', 'gzip, deflate, br');
        heads.append('Connection', 'keep-alive');
        return this.http.post<ResponseTemplate>(path, formData, {headers: heads});
    }
}