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
    this.doMagicThings(of(this.stringItems), s => s, (string, label) => new Item(label)).subscribe(itens => this.items = itens
    )
  }

  doMagicThings<T, E>(input: Observable<T[]>, mapLabel: (item: T) => string, 
    mapItemWithTranslation: (item: T, translation: string) => E): Observable<E[]> {
      return input.pipe(
        mergeMap((itens: T[]) => 
          from(itens).pipe(switchMap(i => 
            of(i).pipe(
              withLatestFrom(this.translate(mapLabel(i))),
              map(([item, label]) => mapItemWithTranslation(item, label))
              )
            )
          )
        ),
        toArray()
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
