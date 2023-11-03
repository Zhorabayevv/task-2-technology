import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OWNER_HAMBURGER_ANIMATIONS } from '@shared/components/hamburger/hamburger.animations';

@Component({
  selector: 'owner-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    OWNER_HAMBURGER_ANIMATIONS.topLine,
    OWNER_HAMBURGER_ANIMATIONS.middleLine,
    OWNER_HAMBURGER_ANIMATIONS.bottomLine,
  ],
})
export class HamburgerComponent {
  @Input() public state: 'cross' | 'initial' = 'initial';
}
