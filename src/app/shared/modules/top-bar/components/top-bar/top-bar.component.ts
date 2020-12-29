import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { CurrentUserInterface } from '../../../../types/current-user.interface'
import { select, Store } from '@ngrx/store'
import { isAnonymousSelector, isCurrentUserSelector, isLoggedInSelector } from '../../../../../auth/store/selectors'

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>
  isAnonymous$: Observable<boolean>
  currentUser$: Observable<CurrentUserInterface | null>

  constructor(private _store: Store) {
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this._store.pipe(select(isLoggedInSelector))
    this.isAnonymous$ = this._store.pipe(select(isAnonymousSelector))
    this.currentUser$ = this._store.pipe(select(isCurrentUserSelector))
  }

}
