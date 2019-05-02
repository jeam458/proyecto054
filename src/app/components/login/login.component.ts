import { Component, OnInit, ElementRef } from '@angular/core';
import {FormGroup,FormBuilder,Validators,FormControl} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private toggleButton: any;
  private nativeElement: Node;
  messageCls;
  message;
  processing = false;
  previourUrl;
  form:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router,private authGuard:AuthGuard,private element:ElementRef) {
    this.nativeElement = element.nativeElement;
    this.createForm() 
  }
  createForm(){
    this.form = this.formBuilder.group({
      username:['',Validators.required],
      password: ['',Validators.required]
    });
  }
  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  } 
  enableForm(){ 
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }
  onLoginSubmit(){
    this.processing = true;
    this.disableForm();
    //console.log(this.form.get('username').value);
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }
    this.authService.login(user).subscribe(data=>{
      if(!data.success){
        this.messageCls = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      }else{
        this.messageCls = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token,data.user);
        setTimeout(()=>{
          if(this.previourUrl){
            this.router.navigate([this.previourUrl]);
          }else{
            this.router.navigate(['/dashboard']);
          }
        },1000);
      }
    });
  }
  ngOnInit() {
    var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
    if(this.authGuard.redirectUrl){
      this.messageCls = 'alert alert-danger';
      this.message = 'you must be logged in to view the page';
      this.previourUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
      }
  }

}
