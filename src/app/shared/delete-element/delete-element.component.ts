import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../modules/product/domain/product';

@Component({
  selector: 'app-delete-element',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog__content">
      ¿Estás seguro que deseas eliminar el producto {{ product.name }} ?
    </div>
    <div class="dialog__footer">
      <div class="button__action" (click)="abort()">Cancelar</div>
      <div class="button__action button__action--success" (click)="confirm()">
        Confirmar
      </div>
    </div>
  `,
  styleUrl: './delete-element.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteElementComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  get product() {
    return this.data.product;
  }

  abort() {
    this.dialogRef.close(null);
  }

  confirm() {
    this.dialogRef.close('EXECUTE');
  }
}
