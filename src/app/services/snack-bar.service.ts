import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  open(mensagem: string, action: string = 'Fechar') {
    this._snackBar.open(mensagem, action, {
      duration: 3000,
    });
  }
}