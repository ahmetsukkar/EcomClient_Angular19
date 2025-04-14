import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../shared/Model/Product';
import { finalize } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-error',
  imports: [CommonModule],
  templateUrl: './test-error.component.html',
  styleUrl: './test-error.component.scss'
})
export class TestErrorComponent {

  validationErrors: any;
  baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  get500Error() {
    this.http.get(this.baseURL + 'Bugs/server-error').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }
  
  get404Error() {
    this.http
      .get<IProduct>(this.baseURL + 'Products/get-product-by-id/76e9e777-bf9a-4947-3f7f-08dd6660b4b0')
      .pipe(
        finalize(() => {
          alert("finalize: this runs after success or error");
        })
      )
      .subscribe({
        next: (result) => {
          alert("Success: " + result.name);
          console.log(result);
        },
        error: (error) => {
          alert("Error: " + error.error.message);
          console.error(error);
        },
        complete: () => {
          alert("Request completed, this runs after success only"); // if you want to show a message when the request is completed 
        }
      });
  }

  get400Error() {
    this.http.get(this.baseURL + 'Bugs/bad-request').subscribe({
      next: (next) => console.info(next),
      error: (err) => console.error(err)
    });
  }

  get400ValidationError() {
    this.http.get(this.baseURL + 'Bugs/bad-request/One').subscribe({
      next: (next) => console.info(next),
      error: (err) => this.validationErrors = err.errors
    });
  }

}
