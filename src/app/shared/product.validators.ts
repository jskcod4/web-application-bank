import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { catchError, from, map, of, switchMap, tap, timer } from 'rxjs';

import { ProductRepository } from '../../modules/product/domain/product.repository';
import { isProductImageUrlValid } from '../../modules/product/domain/product-image-url';
import { isProductDateReleaseValid } from '../../modules/product/domain/product-date-release';
import { isProductNameValid } from '../../modules/product/domain/product-name';
import { isProductDescriptionValid } from '../../modules/product/domain/product-description';
import { isProductIdValid } from '../../modules/product/domain/product-id';
import {
  generateDateRevision,
  isProductDateRevisionValid,
} from '../../modules/product/domain/product-date-revision';

export function productIdAsyncValidator(
  productRepository: ProductRepository
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (control.value?.trim() === '') {
      return of(null);
    }

    return from(productRepository.isValidId(control.value)).pipe(
      catchError(() => of({ asyncValid: false })),
      map((res) => (res ? null : { asyncInvalid: false }))
    );
  };
}

export function productIdValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    return !isProductIdValid(control.value) ? { isValid: false } : null;
  };
}

export function productNameValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    return !isProductNameValid(control.value) ? { isValid: false } : null;
  };
}

export function productDescriptionValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    return !isProductDescriptionValid(control.value)
      ? { isValid: false }
      : null;
  };
}

export function productImageUrlValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }
    return !isProductImageUrlValid(control.value) ? { isValid: false } : null;
  };
}

export function productDateReleaseValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }

    return !isProductDateReleaseValid(new Date(control.value))
      ? { isValid: false }
      : null;
  };
}

export function productDateRevisionValidator(form: FormControl): ValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return null;
    }

    const releaseControl = form.get('dateRelease');

    if (!releaseControl?.valid) {
      return null;
    }

    const dateRelease = new Date(releaseControl.value);
    const dateRevision = new Date(control.value);

    return !isProductDateRevisionValid(dateRevision, dateRelease)
      ? { isValid: false }
      : null;
  };
}
