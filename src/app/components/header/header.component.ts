import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  isLogged = localStorage.getItem("isLogged");

  private readonly router: Router = inject(Router);
  cerrarSesion() {
    localStorage.removeItem("isLogged");
    this.router.navigate(["/"]);
  }
}
