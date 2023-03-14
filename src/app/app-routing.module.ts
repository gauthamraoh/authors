import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorBooksComponent } from './author-books/author-books.component';
import { ResponsiveViewComponent } from './responsive-view/responsive-view.component';

const routes: Routes = [{
  path: 'responsive-view',
  component: ResponsiveViewComponent
},
{
  path: '',
  component: AuthorBooksComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
