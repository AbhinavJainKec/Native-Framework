import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import {DrawerPage} from '../shared/drawer/drawer.page';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Email from "nativescript-email";
import * as Phone from 'nativescript-phone';

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

  callRestaurant() {
    const phoneNumber = '01-2345-6789';
    Phone.requestCallPermission('You should accept the permission to be able to make a direct phone call.')
      .then(() => Phone.dial(phoneNumber, false))
      .catch(() => Phone.dial(phoneNumber, true));
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