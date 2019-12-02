import { Component, OnInit } from '@angular/core';
import { SearchJsonService } from "../search-json.service"
import { Renderer } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.scss']
})
export class DataSearchComponent implements OnInit {
  searchData: any;
  leads = [];
  

  public model: go.GraphLinksModel = new go.GraphLinksModel([], []);

  //followers=[];
  constructor(private service: SearchJsonService, private render: Renderer) {
    this.service.getJson().subscribe(
      (data) => {
        const keysArr = [];
        const fromTo = [];
        this.searchData = data["plans"].map(x => {
          keysArr.push({'key': x.name});
          if(x.leads.length > 0) {
            x.leads.map(y => {
              fromTo.push({'from': y.name, 'to': x.name});
            })
          }
        });
        this.model = new go.GraphLinksModel(keysArr, fromTo);
      }
    );
  }
  nodeClicked(event){
    console.log('&*&**&&',event.currentTarget);
  }

  ngOnInit() {
    this.setPosition();
  }
  dataDisplay(id: number, event: any) {
    event.preventDefault();
    this.leads = this.searchData[id].leads;
    console.log(event.currentTarget)
    event.currentTarget.add('active');
    this.render.setElementClass(event.target, "active", false);
  };
  setPosition() {
    console.log('All set...');
  }
}
