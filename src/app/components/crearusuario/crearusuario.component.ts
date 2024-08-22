import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { UsuarioService } from "../../services/usuario.service";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-crearusuario",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./crearusuario.component.html",
  styleUrl: "./crearusuario.component.css",
})
export class CrearusuarioComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly usuarioService: UsuarioService = inject(UsuarioService);
  private readonly router: Router = inject(Router);
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre_completo: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.email, Validators.required]],
      contrasenia: ["", [Validators.required, Validators.minLength(10)]],
      contrasenia2: ["", Validators.required],
    });
  }

  crearUsuario() {
    if (
      this.formulario.get("contrasenia")?.value ==
      this.formulario.get("contrasenia2")?.value
    ) {
      const formData = new FormData();
      formData.append(
        "nombre_completo",
        this.formulario.get("nombre_completo")?.value
      );

      formData.append("email", this.formulario.get("email")?.value);

      formData.append("contrasenia", this.formulario.get("contrasenia")?.value);

      this.usuarioService.crearUsuario(formData).subscribe(
        (res: any) => {
          alert(`${res.mensaje}`);
          this.router.navigate(["/usuarios"]);
        },
        (error) => {
          console.log(error);
        }
      );
      return;
    }

    alert("Las contraseñas no coinciden");
  }
}
