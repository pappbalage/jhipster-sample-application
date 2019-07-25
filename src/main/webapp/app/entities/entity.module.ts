import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'store',
        loadChildren: './store/store.module#JhipsterSampleApplicationStoreModule'
      },
      {
        path: 'book',
        loadChildren: './book/book.module#JhipsterSampleApplicationBookModule'
      },
      {
        path: 'author',
        loadChildren: './author/author.module#JhipsterSampleApplicationAuthorModule'
      },
      {
        path: 'country',
        loadChildren: './country/country.module#JhipsterSampleApplicationCountryModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationEntityModule {}
