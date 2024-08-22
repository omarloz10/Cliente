import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: "app-editarusuario",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./editarusuario.component.html",
  styleUrl: "./editarusuario.component.css",
})
export class EditarusuarioComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly usuarioService: UsuarioService = inject(UsuarioService);
  private readonly router: Router = inject(Router);
  private readonly activatedRouer: ActivatedRoute = inject(ActivatedRoute);
  formulario!: FormGroup;
  usuario: any;
  id: any;

  ngOnInit(): void {
    this.activatedRouer.paramMap.subscribe((param) => {
      this.id = param.get("id");
      this.obtenerUsuarioPorId(this.id);
    });
  }

  obtenerUsuarioPorId(id: number) {
    this.usuarioService.obtenerUsuarioPorId(id).subscribe(
      (res) => {
        this.usuario = res.usuario;
        this.formulario = this.fb.group({
          nombre_completo: [
            this.usuario.nombre_completo,
            [Validators.required, Validators.minLength(6)],
          ],
          email: [this.usuario.email, [Validators.email, Validators.required]],
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarUsuario() {
    const formData = new FormData();
    formData.append(
      "nombre_completo",
      this.formulario.get("nombre_completo")?.value
    );
    formData.append("email", this.formulario.get("email")?.value);

    this.usuarioService.editarUsuario(this.id, formData).subscribe(
      (res: any) => {
        alert(res.mensaje);
        this.router.navigate(["/usuarios"]);
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
