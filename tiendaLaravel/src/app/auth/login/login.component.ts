import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/interfaces/usuario.interface';
import { AuthServiceService } from 'src/services/auth/auth-service.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthServiceService,
    private toast: MatSnackBar,
    private router: Router
  ) {}

  public login() {
    if (!this.email.includes('@')) {
      this.toast.open('El email no es válido', 'Dabuten', {
        duration: 3000,
      });
      return;
    }

    if (this.password.length < 8) {
      this.toast.open(
        'La contraseña debe tener al menos 8 caracteres',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      return;
    }

    this.authService
      .verificarUsuario(this.email, this.password)
      .subscribe((usuarios) => {
        let userSeleccionado = usuarios;

        if (Object.keys(userSeleccionado).length !== 0) {
          const editUser: Usuario = {
            id: userSeleccionado.id,
            rol_id: userSeleccionado.rol_id,
            nombre_user: userSeleccionado.nombre_user,
            email: userSeleccionado.email,
            password: userSeleccionado.password,
            token: uuidv4(),
          };

          this.authService.editUsuario(editUser).subscribe(
            respuesta => {
              this.toast.open('Inicio de Sesión Exitoso', 'Dabuten', {
                duration: 3000,
              });

              sessionStorage.setItem('id', userSeleccionado.id.toString());
              sessionStorage.setItem('rol_id', userSeleccionado.rol_id.toString());
              sessionStorage.setItem('nombre_user', userSeleccionado.nombre_user);
              sessionStorage.setItem('token', userSeleccionado.token);

              this.router.navigate(['/tienda']);
            }
          );
        }else{
          this.toast.open('Inicio de Sesión Denegado', 'Dabuten', {
            duration: 3000,
          });
        }
      });
  }
}
