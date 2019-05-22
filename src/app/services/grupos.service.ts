import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  Cconexion="https://turismoproy.herokuapp.com/";
  
  constructor(private http:Http, private httpClient: HttpClient) { }

  getgruposfechas(fechas){
    console.log(fechas);
    return this.http.get(this.Cconexion+'gruposFechaPaquete/'+ fechas.startDate + '/' + fechas.endDate + '/' + fechas.Paquete,fechas).map(res=>res.json())
   }
  
}

export interface datosConsulta{
  startDate: Date,
  endDate: Date,
  Paquete: String,
  pasajeros:Number
}

