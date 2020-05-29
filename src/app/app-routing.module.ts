import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MenuComponent } from "../menu/menu.component";
import { HomeComponent } from "../home/home.component";
import { DishdetailComponent } from "../dishdetail/dishdetail.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: 'dishdetail/:id',     component: DishdetailComponent },
    { path: "home", component: HomeComponent },
    { path: "menu", component: MenuComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
