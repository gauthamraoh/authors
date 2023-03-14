import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Authors } from '../model/authors.model'

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) { }
  // fetch author details
  getAuthorsAndBooks(): Observable<Authors[]> {
    return this.http.get<Authors[]>('https://s3.amazonaws.com/api-fun/books.json')
  }
}


