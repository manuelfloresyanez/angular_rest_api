import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public allPeople = [];
  public person = {
    _id: "",
    name: "",
    lastName: "",
    course: "",
    age: 0,
    rut: ""
  };
  constructor(private _peopleService: PeopleService) { }

  ngOnInit() {
    this._peopleService.getThePeople().subscribe(data => this.allPeople = data);
  }

  createPeople(aName, alastName, aRut, aCourse, anAge){
    let newPeople = {
      name: aName.value,
      lastName: alastName.value,
      rut: aRut.value,
      course: aCourse.value,
      age: anAge.value
    }
    const peoplecreated = this._peopleService.createPeople(newPeople);
    console.log(peoplecreated.then((peoplecreated)=>{
      this.allPeople.push(peoplecreated)
    }));
  }

  deleteAPeople(id){
    this._peopleService.deletePeople(id.value).subscribe(
      (data) => {
      this.allPeople.push(data.person)
      let newRows = [...this.allPeople];
      const foundIndex = newRows.findIndex((a) => {
        return a._id === data.person._id
    })
    console.log("I'm in people.component");
    newRows.splice(foundIndex, 1);
    console.log(foundIndex)
      console.log(`People with Id deleted`),
      (err) => console.log(err)
      }
    );
    
  }


  getPerson(id){
    const myId = id.value;
    console.log("I'm in people.component")
    console.log(myId)
      this._peopleService.getOnePerson(myId).subscribe(data => this.person = data);
  }


  updateOne(anId, aName, alastName, aRut, aCourse, anAge){
    let newPeople = {
      _id: anId.value,
      name: aName.value,
      lastName: alastName.value,
      rut: aRut.value,
      course: aCourse.value,
      age: anAge.value
    }
    console.log("I'm in people.component");
    console.log(newPeople);
      this._peopleService.updatePeople(newPeople).subscribe(
        () => {
        }
      );
  }

}
