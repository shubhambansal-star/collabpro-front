import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiClient } from 'src/app/api-client';
@Injectable({
  providedIn: 'root',
})
export class WebStorage {
  public Loginvalue = new BehaviorSubject<any>(0);
  public Createaccountvalue = new BehaviorSubject<any>(0);
  public Eresult = new BehaviorSubject<any>(0);
  public Forgotpasswordvalue = new BehaviorSubject<any>(0);
  private apiClient: ApiClient;
  constructor(private router: Router, apiClient: ApiClient) {
    this.apiClient = apiClient
  }

  /**
   * Create account Function call from Registerpage
   * @param uservalue from user form value
   */
  public Createaccount(uservalue: any): void {
    let Rawdata = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult: any = Pdata.find(({ email }) => email === uservalue.email);
      if (Eresult) {

        this.Createaccountvalue.next('This email are already exist');
      } else {
        Pdata.push(uservalue);
        const jsonData = JSON.stringify(Pdata);
        localStorage.setItem('Loginusers', jsonData);
        this.Login(uservalue);
      }
  }

  /**
   * Login Functionality call from Login
   * @param uservalue from login page
   */
  public async Login(uservalue: any): Promise<void> {
    let returndata={message:'',status:''}
    let role = "employee"
    try{
      this.Eresult = await this.apiClient.postE("http://localhost:8000/auth/jwt/create",uservalue);
    }catch ( error ) {
      this.Eresult = null
			console.error( error );
		}
    if (this.Eresult) {
        this.Createtoken(this.Eresult);
        this.Loginvalue.next('Login success');
        if(role==="admin")
          this.router.navigate(['/layout/dashboard/admin']);
        else{
          this.router.navigate(['/layout/dashboard/employee']);
        }
        this.Loginvalue.next(0);
      }  else {
      returndata.message='No active account found with the given credentials'
      returndata.status='emailpassword'
      this.Loginvalue.next(returndata);
    }
  }

  /**
   * Create Token function for authendication
   * @param uservalue recived from login function
   */
  public Createtoken(uservalue) {
    var access = uservalue.access;
    var refresh = uservalue.refresh;
    localStorage.setItem('LoginData', access);
    localStorage.setItem('refresh', refresh);
  }

  /**
   * Two Storage are used
   */
  public Deleteuser() {
    localStorage.removeItem('Loginusers');
    localStorage.removeItem('LoginData');
  }

  /**
   * called from Login page init statement
   */
  public Checkuser(): void {
    let users = localStorage.getItem('Loginusers');
    if (users === null) {
      let password = [
        {
          email: 'admin@dreamguys.in',
          password: '123456',
        },
      ];
      const jsonData = JSON.stringify(password);
      localStorage.setItem('Loginusers', jsonData);
    }
  }

  /**
   * Forgot password function
   * @param uservalue email object recived from Forgot password
   */
  public Forgotpassword(uservalue): void {
    let Rawdata = localStorage.getItem('Loginusers');
    let Pdata: any = [];
    Pdata = JSON.parse(Rawdata);
    const Eresult = Pdata.find(({ email }) => email === uservalue.email);
    if (Eresult) {
      this.Forgotpasswordvalue.next(Eresult);
    } else {
      this.Forgotpasswordvalue.next('Email Not Valid');
    }
  }
}
