import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { NguCarouselConfig } from '@ngu/carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  constructor(private authService:AuthService) { }

  ngOnInit() {
    
  }

 

 


}
