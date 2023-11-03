import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnInit,
    ViewEncapsulation,
    PLATFORM_ID,
} from '@angular/core';
import { BaseComponent } from '@core/classes/base-component';
import Swiper from 'swiper';
import { isPlatformBrowser } from '@angular/common';
import { Autoplay } from 'swiper/modules';

import { IMenuItems } from '@app/shared/interfaces/menuItems.interface.js';
import { DATA } from './data';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import EffectCarousel from './effect-carousel.esm.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import EffectCarouselLarge from './effect-carousel-large.esm.js';

@Component({
    selector: 'owner-applicability-section',
    templateUrl: './applicability-section.component.html',
    styleUrls: ['./applicability-section.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ApplicabilitySectionComponent extends BaseComponent implements OnInit {
    public ownerTitle = 'применимость';

    public groups: IMenuItems[] = DATA;

    public slider: any;
    public sliderDelay: any;
    public sliderInterval: any;

    public activeGroupIndex = 0;
    public activePageIndex = 0;
    public currentConfig: any;
    public carouselItems: any = [];
    public constructor(public cdr: ChangeDetectorRef, @Inject(PLATFORM_ID) private _platformId: string) {
        super();
        this._detectScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    public onResize(): void {
        this._detectScreenSize();
    }

    private _detectScreenSize(): void {
        if (isPlatformBrowser(this._platformId)) {
            const windowWidth = window.innerWidth;
            if (windowWidth > 1280) {
                this.currentConfig = EffectCarouselLarge;
            } else {
                this.currentConfig = EffectCarousel;
            }
        }
    }
    public ngOnInit(): void {
        if (typeof document === 'undefined') return;
        this._initSwiper();
    }

    private _initSwiper(): void {
        for (let i = 0; i < this.groups.length; i++) {
            const groupIndex = i;
            for (let j = 0; j < this.groups[groupIndex].items.length; j++) {
                this.carouselItems.push({ ...this.groups[groupIndex].items[j], ...{ groupIndex } });
            }
        }
        this.slider = new Swiper('.swiper', {
            loop: true,
            modules: [this.currentConfig, Autoplay],
            effect: 'carousel',
            slidesPerView: 'auto',
            shortSwipes: true,
            centeredSlides: true,
            grabCursor: false,
            speed: 500,
            resizeObserver: true,
            slideToClickedSlide: true,
        });

        this.slider.on('slideChange', (e: any): void => {
            this.activePageIndex = e.realIndex;
            if (this.carouselItems[this.activePageIndex]?.groupIndex !== this.activeGroupIndex) {
                this.activeGroupIndex = this.carouselItems[this.activePageIndex]?.groupIndex;
                this._toggleAnimation();
            }
            this.cdr.detectChanges();
        });

        this._setSliderInterval(3000);
    }

    private _setSliderInterval(delay: number): void {
        if (this.sliderDelay !== delay) {
            if (this.sliderInterval) {
                clearInterval(this.sliderInterval);
            }

            this.sliderInterval = setInterval(() => {
                const nextIndex = this.activePageIndex + 1;
                if (nextIndex < this.carouselItems.length) {
                    this.slider.slideTo(nextIndex);
                } else {
                    this.slider.slideTo(0);
                }
            }, delay);

            this.sliderDelay = delay;
        }
    }

    // Function to change the animation state
    private _toggleAnimation(): void {
        const element = document.querySelector('.carousel-section');
        const keyframes = [{ opacity: 0 }, { opacity: 1 }];
        if (element) {
            element.animate(keyframes, 1000);
        }
    }

    public mouseEnter(): void {
        this._setSliderInterval(10000);
    }

    public mouseLeave(): void {
        this._setSliderInterval(5000);
    }

    public changeActiveSlider(index: number): void {
        if (index === this.activeGroupIndex) {
            return;
        }
        this.activeGroupIndex = index;

        const itemIndex = this.carouselItems.findIndex((x: any) => x.groupIndex === this.activeGroupIndex);
        this.paginate(itemIndex);
        this._toggleAnimation();
    }

    public paginate(index: any): void {
        this.slider.slideTo(index);
        this.cdr.detectChanges();
        this.sliderDelay = 0;
        this._setSliderInterval(3000);
    }

    public paginateByNavigation(index: number): void {
        this.slider.slideTo(this.activeGroupIndex * 5 + index);
        this.cdr.detectChanges();
        this.sliderDelay = 0;
        this._setSliderInterval(3000);
    }

    public get activeNavigationIndex(): number {
        return this.activePageIndex % 5;
    }
}
