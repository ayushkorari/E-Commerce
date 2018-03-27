import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HomePageService } from '../home-page.service';
import { filter } from 'rxjs/operators';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {FormControl,FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  animations: [
    trigger('filters', [
     
      transition('void => *', [ 
        state('in', style({transform: 'translateX(0)'})),
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('modal', [
      
       transition('void => *', [ 
         state('in', style({transform: 'translateY(0)'})),
         style({transform: 'translateY(-100%)'}),
         animate(300)
       ]),
       transition('* => void', [
         animate(300, style({transform: 'translateY(-100%)'}))
       ])
     ])
  ]
})
export class AddressComponent implements OnInit {

  userService:UserService;
  addresses:any[] = [];
  showMenu : boolean = false;
  addressForm = new FormGroup({
    pincode : new FormControl('', [Validators.required,Validators.pattern("[1-9]{1}[0-9]{6}")]),
    locality : new FormControl('', [Validators.required]),
    district : new FormControl('', [Validators.required]),
    state : new FormControl('', [Validators.required]),
    address : new FormControl('', [Validators.required]),
    name : new FormControl('', [Validators.required]),
    mobile : new FormControl('', [Validators.required,Validators.pattern("[1-9]{1}[0-9]{9}")]),
    type : new FormControl('', [Validators.required])
    });

  constructor(userService:UserService) { this.userService = userService }
   
  ngOnInit()
  {
    let firstTimeLoading = true;

    HomePageService.getKey.pipe(filter(data=>data==true&&firstTimeLoading)).subscribe(data=>{
        firstTimeLoading = false;
       
    this.userService.getAddress().subscribe
    (
      data =>this.addresses = data.address
    )
    });

    setTimeout(function()
    {
      if(HomePageService.keyRecieved&&firstTimeLoading)
      {
        HomePageService.getKey.next(true);
      }
    },10)

  }

}
