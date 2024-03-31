import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";


@NgModule({
    declarations:[
        NavbarComponent
    ],
    exports:[
        NavbarComponent
    ],
    imports:[
        CommonModule,
        MenubarModule
    ]
})
export class SharedModule{}