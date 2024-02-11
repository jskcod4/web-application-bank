import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  debounce,
  distinctUntilChanged,
  fromEvent,
  timer,
} from 'rxjs';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Product } from '../../modules/product/domain/product';
import { AppStore } from '../../app/store/reducer';
import { DELETE_PRODUCT, LOADING_PRODUCTS } from '../../app/store/actions';
import { SkeletonTableComponent } from '../../app/shared/skeleton-table/skeleton-table.component';
import { DeleteElementComponent } from '../../app/shared/delete-element/delete-element.component';

@Component({
  selector: 'app-bank-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    SkeletonTableComponent,
    DeleteElementComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './bank-list.component.html',
  styleUrl: './bank-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankListComponent implements OnInit, AfterViewInit {
  @ViewChild('inputSearch')
  input!: ElementRef<HTMLInputElement>;

  products$: Observable<Product[]> = this.store.select(
    (state) => state[0].products
  );

  isLoading$ = this.store.select((state) => state[0].loadingProducts);

  private sub$ = new Subscription();
  private options = {
    keyword: '',
    limit: 5,
  };

  constructor(
    private router: Router,
    private store: Store<AppStore>,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.store.dispatch(
      LOADING_PRODUCTS({
        options: this.options,
      })
    );
  }

  ngAfterViewInit(): void {
    this.watchInputSearch();
  }

  private watchInputSearch() {
    this.sub$.add(
      fromEvent(this.input.nativeElement, 'input')
        .pipe(
          distinctUntilChanged(),
          debounce(() => timer(1000))
        )
        .subscribe((event) => {
          const keyword = (event?.target as any)?.value;

          this.options = {
            ...this.options,
            keyword,
          };

          this.store.dispatch(
            LOADING_PRODUCTS({
              options: this.options,
            })
          );
        })
    );
  }

  select(event: Event) {
    const limit = (event.target as any).value;

    this.options = {
      ...this.options,
      limit,
    };

    this.store.dispatch(
      LOADING_PRODUCTS({
        options: this.options,
      })
    );
  }

  goToAdd() {
    this.router.navigateByUrl('create-product');
  }

  edit(product: Product) {
    this.router.navigateByUrl(`create-product?id=${product.id}`);
  }

  delete(product: Product) {
    const dialogRef = this.dialog.open<DeleteElementComponent>(
      DeleteElementComponent,
      {
        data: {
          product,
        },
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'EXECUTE') {
        this.store.dispatch(DELETE_PRODUCT({ productId: product.id }));
      }
    });
  }
}
