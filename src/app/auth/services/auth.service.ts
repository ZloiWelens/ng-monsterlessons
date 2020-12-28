import { Injectable } from '@angular/core'
import { RegisterRequestInterface } from '../types/register-request.interface'
import { Observable } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/current-user.interface'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { AuthResponseInterface } from '../types/auth-response.interface'
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {

  constructor(private _http: HttpClient) {
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}users`
    return this._http
      .post<AuthResponseInterface>(url, data).pipe(
        map((response: AuthResponseInterface) => response.user)
      )
  }
}
