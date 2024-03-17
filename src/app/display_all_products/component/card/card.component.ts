import { Component, Input } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';


import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';




@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardContent, MatPaginatorModule,MatCardModule],
  // schemas: [MatPaginator],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() data: any;
  zoomImage = false;
}
