import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api: string = `${environment.api}/api/auth`;

  constructor(
    private httpClient: HttpClient
  ) { }

}
