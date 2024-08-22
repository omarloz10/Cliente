import { Routes } from "@angular/router";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { LoginComponent } from "./components/login/login.component";
import { MostrarusuarioComponent } from "./components/mostrarusuario/mostrarusuario.component";
import { CrearusuarioComponent } from "./components/crearusuario/crearusuario.component";
import { EditarusuarioComponent } from "./components/editarusuario/editarusuario.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "usuarios",
    component: UsuariosComponent,
  },
  {
    path: "usuarios/crear",
    component: CrearusuarioComponent,
  },

  {
    path: "usuarios/editar/:id",
    component: EditarusuarioComponent,
  },
  {
    path: "usuarios/:id",
    component: MostrarusuarioComponent,
  },
];
