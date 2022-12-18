import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpdashboardComponent } from './empdashboard/empdashboard.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: EmpdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
