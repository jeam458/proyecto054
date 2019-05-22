import { Component, OnInit } from '@angular/core';
import { ToursService, paqueteSchema} from '../../services/tours.service';
import { ActivatedRoute, Router } from "@angular/router";
import { GruposService, datosConsulta} from '../../services/grupos.service';
import { FormBuilder, FormGroup,Validator,Validators} from '@angular/forms';

@Component({
  selector: 'app-detallepaquete',
  templateUrl: './detallepaquete.component.html',
  styleUrls: ['./detallepaquete.component.css']
})
export class DetallepaqueteComponent implements OnInit {
  form1:FormGroup;
snapshotParam:any;
 imageToShow:any;
 isLoading=false;
 paquete:paqueteSchema;
 grupos: any;
 datosconsulta:datosConsulta;
 consultaForm(){
   this.form1 = this.formBuilder.group({
     nropasajeros:['', Validators.compose([
      Validators.required,
      Validators.min(1)
    ])],
     startDate:['', Validators.compose([
       Validators.required
     ])]
   })
 }
 customOptions: any = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  margin:10,
  autoplay:true,
  autoplayTimeout:2500,
  autoplayHoverPause:true,
  navText: ['', ''],
  responsive: {
    0:{
      items:1,
      loop:true
  },
  1000:{
      items:2,
      loop:false,
      nav:true
  }
  },
  nav: true
}
customOptions1: any = {
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  margin:10,
  navSpeed: 700,
  autoplaySpeed:700,
  autoplayTimeout:800,
  navText: ['<', '>'],
  responsive: {
  0:{
      items:1,
      loop:true,
      nav:true
  },
  600:{
      items:2,
      loop:true
  },
  1000:{
      items:4,
      loop:false,
      nav:true
  }
  },
  nav: true
}
customOptions2: any = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  margin:10,
  autoplay:true,
  autoplayTimeout:2500,
  autoplayHoverPause:true,
  autoHeight: false,
  autoHeightClass: 'owl-height',
  responsive: {
    0: {
      items: 2,
      nav:true
    }
  },
  nav: true
}

  constructor(private formBuilder:FormBuilder,private tours:ToursService,private gruposService:GruposService,private readonly route: ActivatedRoute) {
    this.consultaForm();
   }
  
  ngOnInit() {
    this.snapshotParam= this.route.snapshot.paramMap.get("id");
    console.log(this.snapshotParam)
    this.getdetalle(this.snapshotParam);
  }
  loadconsultaform(){
    let datosconsulta:datosConsulta;
    return datosconsulta={
      Paquete:'',
      startDate:new Date(),
      endDate:new Date(),
      pasajeros:0
    }
  }
  convertirStringFecha(cadena){
    var fecha = cadena.toString();
    var fecha1 = new Date(fecha);
    return fecha1;
  }
  submitconsulta(){
    this.realizarConsulta();
  }

  realizarConsulta(){
    this.datosconsulta= this.loadconsultaform();
    this.datosconsulta.pasajeros=this.form1.get('pasajeros').value;
    this.datosconsulta.endDate= this.form1.get('startDate').value;
    var init = new Date(Date.now());
    var fin= new Date(this.datosconsulta.endDate);
    var mes = fin.getMonth()+1;
    fin.setMonth(mes);
    fin.setHours(18);
    fin.setMinutes(59);
    this.datosconsulta.startDate=init;
    var fechas ={startDate:this.datosconsulta.startDate, endDate: this.datosconsulta.endDate,Paquete: this.paquete._id}
    this.gruposService.getgruposfechas(fechas).subscribe(data=>{
      this.grupos=data;
      console.log(this.grupos);
    })
  }

  getdetalle(id){
    this.tours.getpaquete(id).subscribe(data=>{
      console.log(data)
      this.paquete= data;
      this.ListarPorFechasInit(this.paquete._id);
    })
  }

  ListarPorFechasInit(paquete){
    
    var init = new Date(Date.now());
    init.setHours(0);
    init.setMinutes(0);
    var fin1= new Date(Date.now());
    var mes = fin1.getMonth()+1;
    fin1.setMonth(mes);
    fin1.setHours(18);
    fin1.setMinutes(59);
    console.log(init, 'hasta: ',fin1);
    console.log(paquete);
    var fechas={startDate:init.toJSON(), endDate: fin1.toJSON(),Paquete: paquete};
    this.gruposService.getgruposfechas(fechas).subscribe(data=>{
      this.grupos=data;
      console.log(this.grupos);
    })
  }

}
