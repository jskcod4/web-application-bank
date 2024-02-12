import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { format, toDate } from 'date-fns';
import { Subscription, firstValueFrom } from 'rxjs';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import {
  productDateReleaseValidator,
  productDescriptionValidator,
  productIdAsyncValidator,
  productIdValidator,
  productImageUrlValidator,
  productNameValidator,
} from '../../app/shared/product.validators';

import { AppStore } from '../../app/store/reducer';
import { ADD_PRODUCT, EDIT_PRODUCT } from '../../app/store/actions';

import { generateDateRevision } from '../../modules/product/domain/product-date-revision';
import { Product } from '../../modules/product/domain/product';
import { ApiProductRepository } from '../../modules/product/infrastructure/product-service.repository';

@Component({
  selector: 'app-bank-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './bank-create.component.html',
  styleUrl: './bank-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankCreateComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    id: new FormControl(
      '',
      [Validators.required, productIdValidator()],
      [productIdAsyncValidator(this.apiProductRepository)]
    ),
    name: new FormControl('', [Validators.required, productNameValidator()]),
    description: new FormControl('', [
      Validators.required,
      productDescriptionValidator(),
    ]),
    imageUrl: new FormControl('', [
      Validators.required,
      productImageUrlValidator(),
    ]),
    dateRelease: new FormControl('', [
      Validators.required,
      productDateReleaseValidator(),
    ]),
    dateRevision: new FormControl('', [Validators.required]),
  });

  private sub$ = new Subscription();

  private productToEdit!: Product;

  constructor(
    private store: Store<AppStore>,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private apiProductRepository: ApiProductRepository
  ) {}

  ngOnInit(): void {
    this.form.get('dateRevision')?.disable();
    this.seeParams();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  submit() {
    const { id, name, description, dateRelease, dateRevision, imageUrl } =
      this.form.getRawValue();

    const product: Product = {
      id: id!,
      name: name!,
      description: description!,
      imageUrl: imageUrl!,
      dateRelease: dateRelease ? new Date(dateRelease) : new Date(),
      dateRevision: dateRevision ? new Date(dateRevision) : new Date(),
    };

    const action = this.productToEdit
      ? EDIT_PRODUCT({ id: this.productToEdit.id, product })
      : ADD_PRODUCT({ product });

    const message = this.productToEdit
      ? 'Se ha editado el producto correctamente!'
      : 'Se ha agregado un nuevo producto correctamente!';

    this.store.dispatch(action);
    this._snackBar.open(message, '', { duration: 2000 });
    this.router.navigateByUrl('/');
  }

  reset() {
    this.form.reset({}, { emitEvent: false });
  }

  changeDateRelease() {
    const dateRelease = this.form.get('dateRelease')?.value;
    const isValidDateRelease = !this.form.get('dateRelease')?.invalid;

    if (typeof dateRelease === 'string') {
      const dateRevisionNew = generateDateRevision(toDate(dateRelease));
      const dateRevisionNewToString = format(
        dateRevisionNew.toISOString(),
        'yyyy-MM-dd'
      );

      this.form.get('dateRevision')?.setValue(dateRevisionNewToString);
    }

    if (!isValidDateRelease) {
      this.form.get('dateRevision')?.setValue('');
    }
  }

  private async seeParams() {
    const map = await firstValueFrom(this.activeRoute.queryParamMap);
    const id = map.get('id');

    if (Boolean(id)) {
      this.sub$.add(
        this.store
          .select((state) => state[0].products)
          .subscribe((res) => {
            const product = res.find((product) => product.id === id);

            if (product) {
              this.productToEdit = product;
              this.pathProductToForm(product);
              this.form.get('id')?.disable();
            } else {
              this.router.navigateByUrl('');
            }
          })
      );
    }
  }

  private pathProductToForm(product: Product) {
    this.form.patchValue(
      {
        ...product,
        dateRelease: format(product.dateRelease, 'yyyy-MM-dd'),
        dateRevision: format(product.dateRevision, 'yyyy-MM-dd'),
      },
      { emitEvent: true }
    );

    this.form.get('dateRelease')?.updateValueAndValidity();
    this.changeDetection.detectChanges();
  }
}
