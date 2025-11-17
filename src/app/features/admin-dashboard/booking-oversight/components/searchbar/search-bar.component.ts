import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
selector: 'app-search-bar',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
@Input() model: string | undefined;
}