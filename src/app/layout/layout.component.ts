import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { AuthService } from "../core/services/auth.service";

@Component({
    selector: 'app-layout',
    standalone: true,
    imports:[RouterOutlet,SidebarComponent,TopbarComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})

export class LayoutComponent {

    constructor(public auth: AuthService){}
    
isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}