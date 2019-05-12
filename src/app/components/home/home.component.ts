import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit} from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { NguCarouselConfig } from '@ngu/carousel';

import { ToursService , Home, paqueteSchema} from '../../services/tours.service';
import { switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageToShow: any;
  imageToShow1: any;
  isImageLoading: boolean;
  isLoading = false;
  paquetes:Array<paqueteSchema>;
  datoshome: Observable<any>;
  resultados:Array<paqueteSchema>;
  buscadorForm:FormGroup;
  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplaySpeed:700,
    autoplayTimeout:800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  constructor(public authService:AuthService, private tours:ToursService, private fb:FormBuilder, private satinizer:DomSanitizer, private readonly router:Router) { 
  }

  ngOnInit() {
    this.buscadorForm =this.fb.group({
      buscadorInput:null
    })
    this.listarComponentesHome();
    this.listasPaquetes();
    this.buscadorForm.get('buscadorInput')
    .valueChanges
    .pipe(
      debounceTime(300),
      tap(() => this.isLoading = true),
      switchMap(value => this.tours.getBuscador(value)
      .pipe(
        finalize(() => this.isLoading = false),
        ))
    )
    .subscribe(datos => {
      this.resultados = datos;
      for(var index=0; index<this.resultados.length;index++){
        this.getimagen1(this.resultados[index].imagen)
      }
    });
  }

  displayFn(datos) {
    if (datos) { return datos; }
  }

  /*datoslimpioshome(){
    this.datoshome.Correo = '';
    this.datoshome.Descripcion ='';
    this.datoshome.Facebook ='';
    this.datoshome.Google ='';
    this.datoshome.Instagram ='';
    this.datoshome.Nombre ='';
    this.datoshome.Twitter ='';
    this.datoshome.galeria =[];
  }*/

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
   }
  getimagen(id){
    this.isImageLoading=true;
    this.tours.getDescargarImagen(id).subscribe(data=>{
      //this.createImageFromBlob(data);
      console.log(data)
      var unsafeImageUrl = URL.createObjectURL(data);
      this.imageToShow = this.satinizer.bypassSecurityTrustUrl(unsafeImageUrl);
      for(var index=0; index< this.paquetes.length; index++){
        if(id===this.paquetes[index].imagen){
          this.paquetes[index].img=this.imageToShow;
          break;
        }
      }
      this.isImageLoading=false;
    },error => {
      this.isImageLoading=true;
      console.log(error);
    })
  }

  getimagen1(id){
    this.isImageLoading=true;
    this.tours.getDescargarImagen(id).subscribe(data=>{
      //this.createImageFromBlob(data);
      console.log(data)
      var unsafeImageUrl = URL.createObjectURL(data);
      this.imageToShow1 = this.satinizer.bypassSecurityTrustUrl(unsafeImageUrl);
      for(var index=0; index< this.resultados.length; index++){
        if(id===this.resultados[index].imagen){
          this.resultados[index].img=this.imageToShow1;
          break;
        }
      }
      this.isImageLoading=false;
    },error => {
      this.isImageLoading=true;
      console.log(error);
    })
  }

  gotodetalle(id):void{
    this.router.navigate(["detallepaquete",id]);
  }

  listarComponentesHome(){
    this.tours.getHomes().subscribe(data=>{
      console.log(data[0]);
      this.datoshome = data;
    })
  }
  listasPaquetes(){
    this.tours.getpaquetes().subscribe(data=>{
      this.paquetes=data;  
      console.log(this.paquetes)
      for(var index=0; index<this.paquetes.length;index++){
        this.getimagen(this.paquetes[index].imagen)
      }
    })
  }
  buscadorPaquetes(cadena){
    this.tours.getBuscador(cadena).subscribe(data=>{
      console.log(data);
    })
  }

}
