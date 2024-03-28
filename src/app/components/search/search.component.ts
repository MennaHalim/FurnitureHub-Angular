import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

    onSearch(event: Event) {
      event.preventDefault();
    
      // Type assertion: cast event.target to HTMLFormElement
      const form = event.target as HTMLFormElement;
    
      // Access form element properties safely
      const queryInput = form.elements.namedItem('query') as HTMLInputElement; // Explicitly specify type as HTMLInputElement
      const query = queryInput.value;
    
      // ... rest of your logic
    }
  }