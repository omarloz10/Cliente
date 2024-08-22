import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private urlLogin = "http://127.0.0.1:8000/api/v1/login";
  private urlApi = "http://127.0.0.1:8000/api/v1/usuarios";

  obtenerUsuarios(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  crearUsuario(data: any): Observable<any> {
    return this.http.post(this.urlApi, data);
  }

  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${id}`);
  }

  habilitarDeshabilitarUsuario(id: number): Observable<any> {
    return this.http.patch(`${this.urlApi}/${id}`, {});
  }

  editarUsuario(id: number, data: any) {
    return this.http.post(`${this.urlApi}/${id}`, data);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.urlLogin}`, data);
  }
}
