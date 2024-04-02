import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp.pipe";


@NgModule({
    declarations:[
        NavbarComponent,
        FilterBootcampPipe
    ],
    exports:[
        NavbarComponent,
        FilterBootcampPipe
    ],
    imports:[
        CommonModule,
        MenubarModule
    ]
})
export class SharedModule{}