import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';
import { authGuard } from './guards/auth-guard.guard';
import { ProductsComponent } from './pages/products/products.component';

const routes: Routes = [
  { path: '',  pathMatch: "full", redirectTo: "home" },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'home' },   // Qualquer outra rota da aplicação redireciona para home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
