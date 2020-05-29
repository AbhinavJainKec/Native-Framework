import { ViewChild, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";

export class DrawerPage implements AfterViewInit {

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;

    private drawer: SideDrawerType;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectorRef.detectChanges();
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
    }
}