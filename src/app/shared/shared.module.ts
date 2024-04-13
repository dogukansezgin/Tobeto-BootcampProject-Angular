import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp.pipe";
import { FilterAppliedBootcampPipe } from "./pipes/filter-applied-bootcamp.pipe";


@NgModule({
    declarations:[
        NavbarComponent,
        FilterBootcampPipe,
        FilterAppliedBootcampPipe
    ],
    exports:[
        NavbarComponent,
        FilterBootcampPipe,
        FilterAppliedBootcampPipe
    ],
    imports:[
        CommonModule,
        MenubarModule
    ]
})
export class SharedModule{}