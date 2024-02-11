import { Routes } from '@angular/router';
import { BankCreateComponent } from '../pages/bank-create/bank-create.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/bank-list/bank-list.component').then(
        (mod) => mod.BankListComponent
      ),
  },
  {
    path: 'create-product',
    component: BankCreateComponent,
  },
];
