import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {DrawerPage} from '../shared/drawer/drawer.page';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Email from "nativescript-email";

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
  
  sendEmail() {

    Email.available()
      .then((avail: boolean) => {
        if (avail) {
          Email.compose({
            to: ['confusion@food.net'],
            subject: '[ConFusion]: Query',
            body: 'Dear Sir/Madam:'
          });
        }
        else
          console.log('No Email Configured');
      })

  }
  
}