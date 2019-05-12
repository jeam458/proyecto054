import { Component, OnInit } from '@angular/core';
import { ToursService, paqueteSchema} from '../../services/tours.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-detallepaquete',
  templateUrl: './detallepaquete.component.html',
  styleUrls: ['./detallepaquete.component.css']
})
export class DetallepaqueteComponent implements OnInit {
snapshotParam:any;
 imageToShow:any;
 isLoading=false;
 paquete:paqueteSchema;
 grupos: any;
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
    },
    1:{
      items:2
    }
  },
  nav: true
}

  constructor( private tours:ToursService,private readonly route: ActivatedRoute) { }
  
  ngOnInit() {
    this.snapshotParam= this.route.snapshot.paramMap.get("id");
    console.log(this.snapshotParam)
    this.getdetalle(this.snapshotParam);
  }

  getdetalle(id){
    this.tours.getpaquete(id).subscribe(data=>{
      console.log(data)
      this.paquete= data;
    })
  }

}
