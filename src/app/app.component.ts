import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as app from "tns-core-modules/application"
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import { login, LoginResult } from "tns-core-modules/ui/dialogs";
import { getString, setString } from "tns-core-modules/application-settings";
import { PlatformService } from "../services/platform.service"; 

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, OnDestroy {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router, 
        private routerExtensions: RouterExtensions,
        private platformService: PlatformService
        ) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.platformService.printPlatformInfo(); 
        this.platformService.startMonitoringNetwork()
            .subscribe((message: string) => {
        console.log(message);
        });
    }

    ngOnDestroy() { 
    
        this.platformService.stopMonitoringNetwork(); 
        
    } 

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    displayLoginDialog() {
        let options = {
            title: "Login",
            message: 'Type Your Login Credentials',
            userName: getString("userName", ""),
            password: getString("password",""),
            okButtonText: "Login",
            cancelButtonText: "Cancel"
        }

        login(options)
            .then((loginResult: LoginResult) => {
                setString("userName", loginResult.userName);
                setString("password", loginResult.password);
            },
            () => { console.log('Login cancelled'); 
        });
    }
}
