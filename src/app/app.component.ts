import {
  Component,
  Renderer2,
  ElementRef
} from '@angular/core';
import {
  NgxMcAnimatorService
} from 'projects/ngx-mc-animator/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'animator';
  toggle = false;

  constructor(public animatorService: NgxMcAnimatorService,
    public elRef: ElementRef,
    public renderer: Renderer2) {}

  animate() {
    console.log('jhere')
    this.animatorService.animator(this.elRef, this.renderer).animate('rollOut',
      ['img']
    ).subscribe(() => {
      setTimeout(() => {
        this.toggle = !this.toggle
      }, 1000)
    });
  }

  bounce() {
    this.animatorService.animator(this.elRef, this.renderer).animate('bounce',
      'animate-seq-', 500, 0, true
    ).subscribe(() => {

    })
  }

  leftRight() {
    this.animatorService.animator(this.elRef, this.renderer).animate(['fadeOutLeft', 'fadeOutRight', 'hinge'],
      ['.col-12 h3', '.col-12 h2', '.col-12 h4'], [500, 1000, 1300], 0, true
    ).subscribe(() => {

    })
  }
}
