import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {DrawerPage} from '../shared/drawer/drawer.page';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends DrawerPage implements OnInit {
    
  constructor(
      private changeDetectorRef: ChangeDetectorRef
      ) {
        super(changeDetectorRef);
      }

  ngOnInit() {
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
  
}