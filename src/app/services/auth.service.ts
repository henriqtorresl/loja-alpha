import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../interfaces/LoginDto';
import { Observable, take } from 'rxjs';
import { CreateUserDto } from '../interfaces/CreateUserDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = `${environment.api}/api/auth`;

  constructor(
    private httpClient: HttpClient
  ) { }

  login(body: LoginDto): Observable<any> {
    return this.httpClient.post(`${this.api}/login`, body).pipe(take(1));
  }

  register(body: CreateUserDto): Observable<any> {
    return this.httpClient.post(`${this.api}/register`, body).pipe(take(1));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    return token == null ? false : true;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

}
