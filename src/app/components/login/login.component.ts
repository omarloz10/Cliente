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
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  private readonly usuarioService: UsuarioService = inject(UsuarioService);
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly router: Router = inject(Router);

  formulario!: FormGroup;
  mensaje: any;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required, Validators.minLength(10)]],
    });
  }

  iniciarSesion() {
    const dataForm = new FormData();
    dataForm.append("email", this.formulario.get("email")?.value);
    dataForm.append("contrasenia", this.formulario.get("contrasenia")?.value);

    this.usuarioService.login(dataForm).subscribe(
      (res) => {
        alert(res.mensaje);
        localStorage.setItem("isLogged", "true");
        this.router.navigate(["/usuarios"]);
      },
      (error) => {
        alert(error.error.mensaje);
      }
    );
  }
}
