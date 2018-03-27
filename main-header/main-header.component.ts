import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomePageService } from '../home-page.service';
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

   
  constructor( private route: ActivatedRoute,private router: Router,home:HomePageService) { }

  categories:any[] = [];
  ngOnInit() {
    this.route.data
    .subscribe((data: { categories: any }) => {
      console.log(data)
      this.categories = data.categories; 
    });

  }

  
}
