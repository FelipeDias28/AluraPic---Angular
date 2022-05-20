import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from './../../shared/components/card/card.module';
import { PhotoModule } from './../photo/photo.module';
import { FilterByDescription } from './filter-by-description.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotosComponent } from './photos/photos.component';
import { DarkenOnHoverModule } from './search/directives/darken-on-hover/darken-on-hover.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    PhotoListComponent,
    PhotosComponent,
    LoadButtonComponent,
    FilterByDescription,
    SearchComponent
  ],
  imports: [
    PhotoModule,
    CommonModule,
    CardModule,
    DarkenOnHoverModule
  ]
})

export class PhotoListModule {}
