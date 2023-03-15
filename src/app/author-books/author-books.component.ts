import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooksService } from '../service/books.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.scss'],
})
export class AuthorBooksComponent implements AfterViewInit {
  title!: string;
  publishDate!: string;
  book!: string;
  data!: any;
  successMessage = false;
  errorMessage = false;
  dataSource!: any;
  temp!: any;
  values!: any;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['book', 'title', 'PublishDate', 'Buy'];
  constructor(
    public dialog: MatDialog,
    private booksService: BooksService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    // Load authors data
    this.booksService.getAuthorsAndBooks().subscribe((val: any) => {
      this.values = val;
      this.temp = val.data.books;
      this.dataSource = new MatTableDataSource(this.temp);
      this.dataSource.sort = this.sort;
    });
  }

  // Sort alphabetically and chronologically
  ngAfterViewInit() {
    if (this.dataSource) this.dataSource.sort = this.sort;
  }

  // Open add book form modal
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        imageUrl: 'https://m.media-amazon.com/images/I/91VFZJOzyEL.jpg',
        title: this.title,
        PublishDate: this.publishDate,
        purchaseLink:
          'https://www.amazon.com/Enormous-Crocodile-Roald-Dahl/dp/0140365567/',
      },
    });

    // Close modal validate and update data to the table
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!result?.PublishDate || !result.title) {
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 3000);
        } else {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 3000);
          this.data = result;
          this.temp.push(this.data);
          this.dataSource = new MatTableDataSource(this.temp);
          this.dataSource.sort = this.sort;
        }
      } else {
        return;
      }
    });
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
