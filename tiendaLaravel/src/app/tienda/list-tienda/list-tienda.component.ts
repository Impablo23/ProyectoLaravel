import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tienda',
  templateUrl: './list-tienda.component.html',
  styleUrls: ['./list-tienda.component.css']
})
export class ListTiendaComponent {

  constructor(
    private router: Router,
  ){}

  ngOnInit(){

  }

  public addPage(){
    this.router.navigate(['./tienda/producto']);
  }
  public editPage(id : number){
    this.router.navigate([`./tienda/producto/edit/${id}`]);
  }
  public deletePage(id : number){
    this.router.navigate([`./tienda/producto/delete/${id}`]);
  }

}
