import { Component, OnInit, Input } from '@angular/core'
import { BackendErrorsInterface } from '../../../../types/backend-errors.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface
  errorMessages: string[]

  constructor() {
  }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps)
      .map((name: string) => {
        const msg = this.backendErrorsProps[name].join(', ')
        return `${name} ${msg}`
      })
  }

}
