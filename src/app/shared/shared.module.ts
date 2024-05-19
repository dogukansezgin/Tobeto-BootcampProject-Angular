import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { FilterBootcampPipe } from "./pipes/filter-bootcamp.pipe";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { DeadLinePipe } from "./pipes/dead-line.pipe";
import { FooterComponent } from "./components/footer/footer.component";


@NgModule({
    declarations:[
        NavbarComponent,
        FooterComponent,
        FilterBootcampPipe,
        DeadLinePipe
    ],
    exports:[
        NavbarComponent,
        FooterComponent,
        FilterBootcampPipe,
        DeadLinePipe
    ],
    imports:[
        CommonModule,
        MenubarModule,
        ButtonModule,
        FormsModule
    ]
})
export class SharedModule{}