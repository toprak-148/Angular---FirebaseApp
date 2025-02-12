import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from 'src/models/AuthResponse';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  api_key:string = "api_key_information";
  user = new BehaviorSubject<User|null>(null);

  createUrl:string="firebase_create_url"
  loginUrl:string =  "firebase_create_url";

  constructor(private http:HttpClient) { }



  register(email:string, password:string):Observable<AuthResponse>
  {
    return this.http.post<AuthResponse>(this.createUrl  + this.api_key,{
      email:email,
      password:password,
      returnSecureToken:true,

    }).pipe(
      tap(response => {
        //observable, subject => rxjs
        const expirationDate = new Date(new Date().getTime() + (Number(response.expiresIn) * 1000));
        const user = new User(response.email,response.localId,response.idToken,expirationDate);

        this.user.next(user);


      }),

      catchError(this.handleError)
    );


  }

  private handleError(err:HttpErrorResponse)
  {
    let message = "hata olustu";

    if(err.error.error){
      switch(err.error.error.message)
      {
        case "EMAIL_EXISTS":
          message = "bu mail adresi zaten  kullaniliyor.";
          break;
        case "TOO_MANY_ATTEMPTS_TRY_LATER":
          message = "cok fazla yanlis giris yapildi.Bir sure sonra tekrar deneyiniz.";
          break;
        case "EMAIL_NOT_FOUND":
          message = "Boyle bir email adresi bulunamamktadir.";
          break;
        case "INVALID_PASSWORD":
          message = "hatali parola";
          break;

      }
    }

    return throwError(() => message);

  }

  login(email:string,password:string)
  {
    return this.http.post<AuthResponse>(this.loginUrl + this.api_key , {
      email:email,
      password:password,
      returnSecureToken:true,
    }).pipe(
      tap(response=>{

        this.handleUser(response.email,response.localId,response.idToken,response.expiresIn);

      })

    );
  }

  private handleUser(email:string,localId:string,idToken:string,expiresIn:string)
  {

    const expirationDate = new Date(new Date().getTime() + (+expiresIn *1000));
    const user = new User(email,localId,idToken,expirationDate);
    console.log(user);
    this.user.next(user);


  }
}

