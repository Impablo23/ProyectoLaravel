import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/interfaces/usuario.interface';
import { AuthServiceService } from 'src/services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public nombre_user: string = '';
  public email: string = '';
  public password: string = '';

  constructor(
    private authService: AuthServiceService,
    private toast: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.nombre_user = '';
    this.email = '';
    this.password = '';
  }

  public async registrarUsuario() {
    if (this.nombre_user.length < 5) {
      this.toast.open(
        'El nombre de usuario debe tener al menos 5 caracteres',
        'Dabuten',
        {
          duration: 3000,
        }
      );
      return;
    }

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

        if (!userSeleccionado) {
          const nuevoUser: Usuario = {
            id: 0,
            rol_id: 2,
            nombre_user: this.nombre_user,
            email: this.email,
            password: this.password,
            token: '',
          };

          this.authService.addUsuario(nuevoUser).subscribe(
            respuesta => {
              this.toast.open('Usuario Registrado Correctamente', 'Dabuten', {
                duration: 3000,
              });
              this.router.navigate(['/auth']);
            }
          );
        }else{
          this.toast.open('Solicitud de Registro Denegado', 'Dabuten', {
            duration: 3000,
          });
        }
      }
    );
  }
}
