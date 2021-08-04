import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HashFunctionEnum} from "../../types/hash-function.enum";
import {ConfigService} from "../../ser/configService/config.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  snackBarDuration: number = 3000;
  configForm = new FormGroup({
    hashFunction: new FormControl('', [Validators.required]),
    difficulty: new FormControl('', [Validators.required, Validators.min(0), Validators.max(6)]),
  });

  constructor(private configService: ConfigService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  /**
   * Return all hash functions in array.
   */
  getHasFunctions(): Array<string> {
    return Object.values(HashFunctionEnum);
  }

  getErrorMessageForHashFunction() {
    let message: string = '';
    if (this.configForm.get('hashFunction')?.hasError('required')) {
      message = 'You must enter a value';
    }
    return message;
  }

  getErrorMessageForDifficulty() {
    if (this.configForm.get('difficulty')?.hasError('min')) {
      return 'Min value is 0';
    }
    else if ( this.configForm.get('difficulty')?.hasError('max')) {
      return 'Max value is 6';
    }
    return this.configForm.get('difficulty')?.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit() {
    this.configService.setConfig(this.configForm.value);
    console.info(`Config was saved to Local storage.`);
    // this.configForm.reset();
    this.openSnackBar('Config was saved to Local storage', 'OK')
  }

  loadDefault() {
    this.configService.setDefaultConfig();
    this.configForm.setValue(this.configService.getDefaultConfig());
    console.warn(`Default config was saved to Local storage.`);
    this.openSnackBar('Default config was saved to Local storage', 'OK')
  }

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
