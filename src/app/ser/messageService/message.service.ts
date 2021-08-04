import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  snackBarDuration: number = 3000;

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Open snackbar in this component.
   *
   * @param message     Message to show.
   * @param action      Message for action.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: this.snackBarDuration});
  }
}
