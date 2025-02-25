import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import {DrawerPage} from '../shared/drawer/drawer.page';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent extends DrawerPage implements OnInit {

    leaders: Leader[];
    errMess: string;

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private leaderService: LeaderService,
      @Inject('baseURL') private baseURL) {
        super(changeDetectorRef);
      }

  ngOnInit() {
    this.leaderService.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
  
}