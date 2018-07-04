import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../user';
import { map } from 'rxjs/operators';
import { Observable, observable } from 'rxjs';
import { resolve } from 'url';

@Injectable()
export class ExploreService {
  constructor(private http: Http) { }

  getUsers() : Observable<User[]> {
    return this.http.get('https://teamrocket.us-east-2.elasticbeanstalk.com/accounts').pipe(map(response => response.json() as User[]));
    // let prom = new Promise((resolve, reject) => {
    //   this.http.get('https://teamrocket.us-east-2.elasticbeanstalk.com/accounts')
    //     .toPromise()
    //     .then(
    //       res => {
    //         console.log(res.json);
    //         resolve();
    //       },
    //       error => { // Error
    //         console.log(error);
    //         reject(error);
    //       }
    //     )
    // })
    // return prom;
    // let xhr = (new XMLHttpRequest);
    // xhr.onreadystatechange = function () {
    //     if (this.status == 200 && this.readyState == 4) {
    //         //func(this);
    //         console.log(this);
    //     }
    // }

    // xhr.open("GET", 'https://teamrocket.us-east-2.elasticbeanstalk.com/accounts');
    // xhr.send();
  }
}
