import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import {DrawerPage} from '../shared/drawer/drawer.page';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-menu',
  moduleId: module.id,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends DrawerPage implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishService: DishService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject('baseURL') private baseURL) {
      super(changeDetectorRef);
     }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}