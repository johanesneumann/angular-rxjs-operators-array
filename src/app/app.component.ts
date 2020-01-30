import { Component } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import {  map, withLatestFrom, switchMap, concatMap, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  stringItems: string[] = ['lalalala', 'lalala2']
  items: Item[];

  constructor(){
    of(this.stringItems).pipe(
      mergeMap((itens: string[]) => 
        from(itens).pipe(switchMap(i => 
          of(i).pipe(
            withLatestFrom(this.translate(i)),
            map(([item, label]) => new Item(label))
            )
          )
        )
      ),
      toArray()
    ).subscribe(itens => this.items = itens
    )
  }

  translate(label: string): Observable<string>{
    return of(label + ' translate');
  }
}



export class Item {
  name: string;

  constructor(name: string){
    this.name = name;
  }
}
