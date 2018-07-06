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
    return this.http.get('http://team-rocket.us-east-2.elasticbeanstalk.com/accounts').pipe(map(response => response.json() as User[]));
  }
}
