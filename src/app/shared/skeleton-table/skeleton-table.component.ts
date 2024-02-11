import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [CommonModule],
  template: `<table class="tg">
    <tr>
      <th *ngFor="let column of columns" class="tg-cly1">
        <div class="line"></div>
      </th>
    </tr>
    <tr *ngFor="let row of rows">
      <td *ngFor="let column of columns" class="tg-cly1">
        <div class="line"></div>
      </td>
    </tr>
  </table>`,
  styleUrl: './skeleton-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTableComponent {
  @Input()
  columns: number[] = Array.from(Array(12).keys());

  @Input()
  rows: number[] = Array.from(Array(5).keys());
}
