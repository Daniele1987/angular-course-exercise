import { Injectable } from "@angular/core";
import { Leader } from "../shared/leader";
import { LEADERS } from "../shared/leaders";
import { of, Observable } from 'rxjs';  // I had to use this import statement due to my rxjs version
import { delay } from "rxjs/operators";

@Injectable()
export class LeaderService {
  constructor() {}

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }

  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.id === id)[0]).pipe(delay(2000));
  }

  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  }
}