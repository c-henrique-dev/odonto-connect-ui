import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  openDialog(component: ComponentType<any>, object?: object, width?: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = width;

    if (object) {
      dialogConfig.data = object;
    }

    this.dialog.open(component, dialogConfig);
  }
}
