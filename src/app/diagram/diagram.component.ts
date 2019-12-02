import { Component, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import * as go from 'gojs';
import { EventEmitter } from 'events';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnChanges {

  public diagram: go.Diagram = null;

  @Input()
  public model: go.Model;
  //@Output() public nodeClicked = new EventEmitter();

  constructor() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if(this.diagram){
      this.diagram.model = changes.model.currentValue;
    }
  }

  public ngAfterViewInit() {
    this.diagram = $(go.Diagram, 'myDiagramDiv',
      {
        layout:
          $(go.TreeLayout,
            {
              isOngoing: true,
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentBus,
              alternateNodeSpacing: 20
            }),
        'undoManager.isEnabled': false
      }
    );

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'Circle',
          {
            name: 'SHAPE', fill: 'blue', stroke: null,
            // set the port properties:
            portId: '', fromLinkable: false, toLinkable: false, cursor: 'pointer'
          }
        ),
        $(go.Panel, 'Vertical',
          // define the panel where the text will appear
          $(go.Panel, 'Table',
            {
              maxSize: new go.Size(90, 900),
              margin: new go.Margin(10),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, { font: '9pt  Segoe UI,sans-serif', stroke: 'white' },  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: '12pt Segoe UI,sans-serif',
                editable: false, isMultiline: false,
                minSize: new go.Size(5, 8)
              },
              new go.Binding('text', 'key').makeTwoWay(),
              ),
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node

    this.diagram.model = this.model;
  }

}
