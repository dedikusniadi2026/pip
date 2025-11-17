import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() role: string | null = null;

  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.toggle.emit();
  }
  hover = false;

  canShow(allowedRoles: string[]): boolean {
    if (!this.role) return false;
    return allowedRoles.includes(this.role);
  }
}
