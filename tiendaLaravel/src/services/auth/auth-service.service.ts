import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/interfaces/usuario.interface';
import { environmentsApi } from '../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  private url: string = environmentsApi.baseUrl

  verificarUsuario(email: string, password: string) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/email/${email}/password/${password}`);
  }

  addUsuario(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.url}/user/add`, usuario);
  }

  editUsuario(usuario: Usuario): Observable<string> {
    return this.http.post<string>(`${this.url}/user/edit`, usuario);
  }

}
