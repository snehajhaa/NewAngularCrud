import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient){ }
    createUser(user: any): any{
       return this.http.post('http://localhost:3000/users', user);
    }
    getAllUser(): any{
      return this.http.get('http://localhost:3000/users');
    }
    updateUser(user: any): any {
      return this.http.put('http://localhost:3000/users/' + user.id, user);
    }
    deleteUser(user: any): any{
      return this.http.delete('http://localhost:3000/users/' + user.id);
    }
}

