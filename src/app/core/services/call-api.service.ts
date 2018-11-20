import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/Map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout'

@Injectable()
export class CallApiService {
  headers2 = new HttpHeaders({ 'Content-Type': 'application/json' })


  // private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


  constructor(public http: HttpClient, public loginSer: LoginService) {
    this.headers2 = this.headers2.append("Authorization", "Basic " + btoa("username:password"));
    // this.headers2 = this.headers2.append("Content-Type", "application/json");
  }
  // urlArray = [
  //   "cities",
  //   "categories",
  //   "users",
  //   "users/login"
  // ];
  readonly baseUrl = "http://185.84.236.39:3000/api/"
  // readonly baseUrl = "http://185.84.236.39:3000/api/"
  // readonly baseUrl = "http://localhost:3000/api/"
  private errorCode = 0;

  // get(url) {
  //   let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginSer.getToken() }) };
  //   return this.http.get(this.baseUrl + url, _options).map((Response: Response) => {
  //     return Response;
  //   })
  // }

  public setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }

  public getErrorCode() {
    return this.errorCode
  }

  get(url) {
    let auth;
    if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    } else {
      auth = ""
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.get(this.baseUrl + url, _options).map((Response: Response) => {
      return Response;
    }).catch((response: Response) => {
      this.errorCode = response['error'].statusCode;
      // console.log(response);
      if (this.errorCode == 401 && response['error'].code == "AUTHORIZATION_REQUIRED")
        this.loginSer.logout()
      return "E";
    });
  }

  public handleError(error: Response | any) {
    console.log('err: ', error)
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    let data = { errMsg: "errMsg", error: "error" };
    console.log("data");
    console.log(data);
    let data2 = JSON.stringify(data);
    console.log("data2");
    console.log(data2);
    return JSON.stringify(data);
  }

  post(url, data) {
    let auth;
    if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    } else {
      auth = ""
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.post(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }


  resetPassWord(url, data, token) {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": token }) };

    return this.http.post(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }


  activeAccount(url, token) {
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": token }) };

    return this.http.put(this.baseUrl + url, {}, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }


  put(url, data) {

    let auth;
    if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    } else {
      auth = ""
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.put(this.baseUrl + url, data, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }

  delete(url) {
    let auth;
    if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    } else {
      auth = ""
    }
    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.delete(this.baseUrl + url, _options).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }

  uploadImage(url, data, length) {
    let fd = new FormData();
    for (var index = 0; index < length; index++) {
      fd.append("file", data[index], data[index].name)
    }
    let auth;
    if (this.loginSer.getToken() != null) {
      auth = this.loginSer.getToken();
    } else {
      auth = ""
    }
    let _options = { headers: new HttpHeaders({ "Authorization": auth }) };

    return this.http.post(this.baseUrl + url, fd, _options).timeout(90000).map((Response: Response) => {
      return Response;
    }).catch((Response: Response) => {
      this.errorCode = Response.status;
      return "E";
    });
  }

}
