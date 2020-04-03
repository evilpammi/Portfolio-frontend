import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbUserModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbDialogModule
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbDialogModule.forRoot()
  ],
  declarations: [
    UserManagementComponent
  ]
})
export class UserManagementModule { }
