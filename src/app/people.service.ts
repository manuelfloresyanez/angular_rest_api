import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IPeople } from './people/people';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private _url: string = "http://localhost:3000/people";
  constructor(private http: HttpClient) { }

  getThePeople(): Observable<IPeople[]>{
    return this.http.get<IPeople[]>(this._url);
    //return [{"id": 1, "lastName": "name1", "age": 18}]
  }

  createPeople(newPeople){
    this.http.post(this._url, newPeople).toPromise().then((data:any) => {
      console.log(data);
      //this.json = JSON.stringify(Data.json);
    });
  }

  deletePeople(id): Observable<void>{
    return this.http.delete<void>(`${this._url}/${id}`);
  }

  getOnePerson(id): Observable<any>{
    return this.http.get<IPeople>(`${this._url}/${id}`);
   }

   updatePeople(updatedPeople): Observable<void>{
     console.log("I'm in people.service");
     console.log(updatedPeople);
     return this.http.put<void>(`${this._url}/${updatedPeople._id}`, updatedPeople, {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })
     })
   }

}
