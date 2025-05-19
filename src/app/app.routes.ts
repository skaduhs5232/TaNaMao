import { Routes } from '@angular/router';
import { DefaultComponent } from './demo/dashboard/default/default.component';
import { ServicesComponent } from './demo/catalogo-servicos/catalogo-servicos.component';
import { MapaComponent } from './demo/mapa/mapa.component';
import { ComprarServicosComponent } from './demo/comprar-servico/comprar-servico.component';

export const routes: Routes = [
  { path: '', component: DefaultComponent },
  { path: 'catalogo/:category', component: ServicesComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'contrato/:userId', component: ComprarServicosComponent },
  {
    path: 'perfil',
    loadComponent: () => import('./demo/user-profile/user-profile.component').then(c => c.UserProfileComponent),
  },
  //{ path: '**', redirectTo: '' }
];