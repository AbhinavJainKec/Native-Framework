import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";
import { Promotion } from "../shared/promotion";
import { PromotionService } from "../services/promotion.service";
import { Leader } from "../shared/leader";
import { LeaderService } from "../services/leader.service";
import {DrawerPage} from '../shared/drawer/drawer.page';
import { Page } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import * as enums from "tns-core-modules/ui/enums";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'app-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends DrawerPage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;
  showLeftCard: boolean = true;
  showMiddleCard: boolean = false;
  showRightCard: boolean = false;
  leftCard: View;
  middleCard: View;
  rightCard: View;

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private dishservice: DishService,
      private promotionservice: PromotionService,
      private leaderservice: LeaderService,
      private page: Page,
      @Inject('baseURL') private baseURL) {
        super(changeDetectorRef);
     }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
  }

  onSwipe(args: SwipeGestureEventData) {

    if (args.direction === SwipeDirection.left) {
      this.animateLeft();
    }
    else if (args.direction === SwipeDirection.right) {
      this.animateRight();
    }
  }

  animateLeft() { 

    if (this.dish && this.promotion && this.leader) {
      this.leftCard = this.page.getViewById<View>('leftCard');
      this.middleCard  = this.page.getViewById<View>('middleCard');
      this.rightCard  = this.page.getViewById<View>('rightCard');

      if( this.showLeftCard ) {
        this.rightCard.animate({
          translate: { x: 2000, y: 0 }
        })
        .then(() => {
          this.leftCard.animate({
            translate: { x: -2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showLeftCard = false;
            this.showMiddleCard = true;
            this.middleCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500,
              curve: enums.AnimationCurve.easeInOut
            });
          });
        });
      }
      else if( this.showMiddleCard ) {
        this.leftCard.animate({
          translate: { x: 2000, y: 0 },
          duration: 500
        })
        .then(() => {
          this.middleCard.animate({
            translate: { x: -2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showMiddleCard = false;
            this.showRightCard = true;
            this.rightCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500,
              curve: enums.AnimationCurve.easeInOut
            });
          });
        });
      }
      else if( this.showRightCard ) {
        this.middleCard.animate({
          translate: { x: 2000, y: 0 },
          duration: 500
        })
        .then(() => {
          this.rightCard.animate({
            translate: { x: -2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showRightCard = false;
            this.showLeftCard = true;
            this.leftCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500
            });
          });
        });
      }
    }
  }

  animateRight() {

    if (this.dish && this.promotion && this.leader) {
      this.leftCard = this.page.getViewById<View>('leftCard');
      this.middleCard  = this.page.getViewById<View>('middleCard');
      this.rightCard  = this.page.getViewById<View>('rightCard');

      if( this.showLeftCard ) {
        this.middleCard.animate({
          translate: { x: -2000, y: 0 },
          duration: 500
        })
        .then(() => {
          this.leftCard.animate({
            translate: { x: 2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showLeftCard = false;
            this.showRightCard = true;
            this.rightCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500,
              curve: enums.AnimationCurve.easeInOut
            });
          });
        });
      }
      else if( this.showMiddleCard ) {
        this.rightCard.animate({
          translate: { x: -2000, y: 0 },
          duration: 500
        })
        .then(() => {
          this.middleCard.animate({
            translate: { x: 2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showMiddleCard = false;
            this.showLeftCard = true;
            this.leftCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500,
              curve: enums.AnimationCurve.easeInOut
            });
          });
        });
      }
      else if( this.showRightCard ) {
        this.leftCard.animate({
          translate: { x: -2000, y: 0 },
          duration: 500
        })
        .then(() => {
          this.rightCard.animate({
            translate: { x: 2000, y: 0 },
            duration: 500,
            curve: enums.AnimationCurve.easeInOut
          })
          .then(() => {
            this.showRightCard = false;
            this.showMiddleCard = true;
            this.middleCard.animate({
              translate: { x: 0, y: 0 },
              duration: 500
            });
          });
        });
      }
    }
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}