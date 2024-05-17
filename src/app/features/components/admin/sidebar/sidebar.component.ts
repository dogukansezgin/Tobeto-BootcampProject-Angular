import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
declare var feather:any;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation:ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
  ngOnInit(): void {
    feather.replace();
  }
}
