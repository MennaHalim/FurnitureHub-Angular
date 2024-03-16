import { Component } from '@angular/core';

@Component({
  selector: 'app-displayallproducts',
  standalone: true,
  imports: [],
  templateUrl: './displayallproducts.component.html',
  styleUrl: './displayallproducts.component.css'
})
export class DisplayallproductsComponent {

  //for checked 
  isChecked: number | null = null;

  markChecked(index: number): void {
    this.isChecked = index;
}
  //End for checked 

}
