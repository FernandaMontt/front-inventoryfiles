import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidena',
  templateUrl: './sidena.component.html',
  styleUrls: ['./sidena.component.css']
})
export class SidenaComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name:"Inicio", route:"home", icon: "home"},
    {name:"Definiciones", route:"category", icon: "inventory"},
    {name:"Ejecuciones", route:"comparacion", icon: "upload_file"},
    {name:"Crear Definición", route:"filescreate", icon: "file_open"},
    {name:"Nueva Ejecucion", route:"executioncreate", icon: "note_add"},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  shouldRun = true;
  
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }

}
