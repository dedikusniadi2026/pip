import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { User, Bell, Settings } from 'lucide';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: LucideIconProvider,
      useValue: {
        icons: { user: User, bell: Bell, settings: Settings },
      },
    },
  ],
  template: `<lucide-icon [name]="iconName" [attr.width]="size" [attr.height]="size" [class]="classes"></lucide-icon>`
})
export class IconComponent {
  @Input() icon = 'user';
  @Input() size = 20;
  @Input() classes = '';
  get iconName() { return (this.icon || '').toString().toLowerCase(); } // normalize
}
