import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public nombre_user: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthServiceService,
    private toast: MatSnackBar
  ){}

  ngOnInit() {
    this.nombre_user = '';
    this.email = '';
    this.password = '';
  }

  public registrarUsuario() {
    if (this.nombre_user.length < 5){
      this.toast.open('El nombre de usuario debe tener al menos 5 caracteres', 'Dabuten', {
        duration: 3000
      });
      return;
    }

    if(!this.email.includes('@')){
      this.toast.open('El email no es válido', 'Dabuten', {
        duration: 3000
      });
      return;
    }

    if (this.password.length < 8){
      this.toast.open('La contraseña debe tener al menos 8 caracteres', 'Dabuten', {
        duration: 3000
      });
      return;
    }

    

    
  }



}
