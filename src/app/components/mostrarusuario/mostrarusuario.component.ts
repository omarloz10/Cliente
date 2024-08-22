import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-mostrarusuario",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./mostrarusuario.component.html",
  styleUrl: "./mostrarusuario.component.css",
})
export class MostrarusuarioComponent {
  private readonly router: Router = inject(Router);
  private readonly activeRouter: ActivatedRoute = inject(ActivatedRoute);
  private readonly usuarioService: UsuarioService = inject(UsuarioService);

  usuario: any;
  private id!: any;
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.obtenerUsuarioPorId(this.id);
    });
  }

  obtenerUsuarioPorId(id: number) {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      (res) => {
        this.usuario = res.usuario;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  volver() {
    this.router.navigate(["/usuarios"]);
  }
}
