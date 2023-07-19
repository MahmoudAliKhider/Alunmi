import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from 'primeng/skeleton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { ScrollTopModule } from 'primeng/scrolltop';

const PrimeNgComponents = [
  ButtonModule,
  AutoCompleteModule,
  PasswordModule,
  InputTextModule,
  RadioButtonModule,
  CalendarModule,
  SpeedDialModule,
  MenubarModule,
  PanelModule,
  InputTextareaModule,
  DividerModule,
  CardModule,
  TabViewModule,
  ImageModule,
  FileUploadModule,
  ProgressSpinnerModule,
  DialogModule,
  PaginatorModule,
  ToastModule,
  AvatarModule,
  ScrollPanelModule,
  SkeletonModule,
  SplitButtonModule,
  MenuModule,
  ScrollTopModule,
];

@NgModule({
  imports: [PrimeNgComponents],
  exports: [PrimeNgComponents],
})
export class PrimeNgModule {}
