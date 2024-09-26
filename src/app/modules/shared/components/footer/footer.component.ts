import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {
    this.initializeFooter(); // Asegúrate de que este método esté implementado.
  }

  initializeFooter(): void {
    // Lógica para inicializar el footer
    console.log('Footer inicializado');
  }
}
