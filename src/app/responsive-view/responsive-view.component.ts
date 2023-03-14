import { AfterViewInit, Component } from '@angular/core';
import { BooksService } from '../service/books.service';

@Component({
  selector: 'app-responsive-view',
  templateUrl: './responsive-view.component.html',
  styleUrls: ['./responsive-view.component.scss']
})
export class ResponsiveViewComponent implements AfterViewInit {
  constructor(private booksService: BooksService){}
  values!: any;
  ngAfterViewInit(){
    // Aet author details
    this.booksService.getAuthorsAndBooks().subscribe((val:any) => {
      this.values = val;
    })
  }
}
