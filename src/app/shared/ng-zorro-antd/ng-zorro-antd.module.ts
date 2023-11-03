import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import { CaretDownOutline } from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

const ICONS: IconDefinition[] = [CaretDownOutline];

@NgModule({
    imports: [NzIconModule.forRoot(ICONS)],
    exports: [NzButtonModule, NzInputModule, NzSelectModule, NzIconModule, NzModalModule, NzFormModule],
})
export class NgZorroAntdModule {}
