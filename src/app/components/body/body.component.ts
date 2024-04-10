import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {
  
}
