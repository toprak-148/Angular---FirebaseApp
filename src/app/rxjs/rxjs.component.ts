import { Component, OnInit } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { BehaviorSubject, filter, from, map, Observable, of, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}



const observable:Observable<Number> = new Observable<Number>((subscriber) =>{
  subscriber.next(1);
  subscriber.next(2);

  // setTimeout(()=>{
  //   subscriber.next(3);

  // },1000);

  // subscriber.complete();

  subscriber.next(Math.random());

});


const observer = {
  next:(value:any) => console.log(value),
  error: (err:any) => console.log(err),
  complete:()=>console.log("finito"),

};

// observable.subscribe((data) => {
//   console.log(data);
// })

// observable.subscribe(observer);

observable.subscribe((data)=>console.log('observable 1: ' + data));
observable.subscribe((data) => console.log('observable 2:'+ data));


const subject = new Subject<number>();

subject.subscribe(data=>{
  console.log(data);
});
subject.subscribe(data=>{console.log(data)});

subject.next(1);
subject.next(2);
subject.next(Math.random());


// operators:

/* bir datayı filterelemek vb gibi islemleri rxjs sayesinde yapilabilir.

 from(['toyota','audi','mercedez'])

from :


*/

from(['toyota','audi','mercedez']).subscribe(data=>console.log(data));
of('bmw','renault').subscribe(data=>console.log(data));



from([1,4,9,16,25,36,49,64,81,100])
.pipe(
  map((n) => Math.sqrt(n)),
)
.subscribe(data=>{console.log(data)})



from([
  {name:'iphone 13' , price:20000},
  {name:'iphone 14' , price:25000},
  {name:'iphone 15' , price:30000},
  {name:'iphone 16' , price:35000}
])
.pipe(
  filter(p => p.price >= 23000 && p.price< 33000),
  map(p => p.name),

)
.subscribe({
  next:(data) => console.log(data),
  error:(err) => console.log(err)
})



// behaviourSubject

const observable2 = new Observable<string>((subcriber)=>{
  subcriber.next("1");
  subcriber.next("2");
});
observable2.subscribe(data=>console.log(data));
observable2.subscribe(data=>console.log(data));


const subject2 = new Subject();
subject2.subscribe(data=>console.log(data));
subject2.subscribe(data=>console.log(data));
subject2.subscribe(data=>console.log(data));

subject2.next(Math.random());

const behaviourSubject = new BehaviorSubject(-1);
behaviourSubject.next(-2);
behaviourSubject.subscribe(data=>console.log(data));
behaviourSubject.subscribe(data=>console.log(data));

behaviourSubject.next(1);
behaviourSubject.next(0);

