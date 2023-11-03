import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'owner-turn-over',
  templateUrl: './turn-over.component.html',
  styleUrls: ['./turn-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TurnOverComponent {}
