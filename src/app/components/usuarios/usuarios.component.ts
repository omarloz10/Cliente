import { Component, inject } from "@angular/core";
import { UsuarioService } from "../../services/usuario.service";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-usuarios",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./usuarios.component.html",
  styleUrl: "./usuarios.component.css",
})
export class UsuariosComponent {
  private readonly usuarioService = inject(UsuarioService);
  usuarios: any;
  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (res) => {
        this.usuarios = res.usuarios;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  habilitarDeshabilitarUsuario(id: number) {
    this.usuarioService
      .habilitarDeshabilitarUsuario(id)
      .subscribe((res: any) => {
        alert(res.mensaje);
        this.obtenerUsuarios();
      });
  }

  eliminarUsuario(id: number) {
    const respuesta = confirm("¿Seguro que quiere eliminar este usuario?");
    if (respuesta) {
      this.usuarioService.eliminarUsuario(id).subscribe((res: any) => {
        alert(res.mensaje);
        this.obtenerUsuarios();
      });
    }
  }
}
