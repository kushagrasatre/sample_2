import { Component, OnInit } from '@angular/core';
import {SearchJsonService} from "../search-json.service"
import {Renderer} from '@angular/core';

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
searchData:any;
leads=[];
//followers=[];
  constructor(private service:SearchJsonService,private render:Renderer) {
    this.service.getJson().subscribe(
      (data)=>{
      this.searchData=data;
      this.searchData=this.searchData.plans;
      }
    );
   }

  ngOnInit() {
    this.setPosition();
  }
  dataDisplay( id:number,event:any){
    event.preventDefault();
    this.leads=this.searchData[id].leads;
    console.log(event.currentTarget)
    event.currentTarget.add('active');
    this.render.setElementClass(event.target,"active",false);
  };
  setPosition(){
    console.log('All set...');
  }
}
