import {
  Injectable,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgxMcAnimatorService {

  constructor() {}

  animator(elRef: ElementRef, renderer: Renderer2) {
    return new Animator(elRef, renderer)
  }
}

export class Animator {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  getClass(node: HTMLDivElement, selector: string): string {
    let classes = Array.from(node.classList)
    let ng_reflect_klass = node.getAttribute('ng-reflect-klass')
    if (ng_reflect_klass) {
      classes = classes.concat(Array.from(ng_reflect_klass.split(' ')))
    }
    return classes.find((className: string) => className.startsWith(selector)) as string
  }

  animate(effects: string | string[] = 'fadeOutUp',
    selectors: string | string[] = 'animate-seq',
    delays: number | number[] = 1000,
    initial_delay: number = 0,
    reset: boolean = false // reset animation classes once complete?
  ): Observable < void > {
    let nodes = []

    if (typeof(selectors) == 'string') {
      nodes = Array.from(this.elRef.nativeElement.querySelectorAll("[class*='" + selectors + "']"))
      nodes = nodes.concat(
        Array.from(this.elRef.nativeElement.querySelectorAll("[ng-reflect-klass*='" + selectors + "']"))
      )
      let context = this;
      nodes.sort(function(node1: HTMLDivElement, node2: HTMLDivElement) {
        let class1 = context.getClass(node1, selectors)
        let class2 = context.getClass(node2, selectors)
        return class1.localeCompare(class2, undefined, {
          numeric: true
        })
      })

      if (typeof (effects) == 'string') {
        effects = Array(selectors.length).fill(effects);
      }

    } else {

      if (typeof(effects) == 'string') {
          effects = Array(selectors.length).fill(effects)
      }

      console.log(effects);


      nodes = []
      let _effects = []
      let iter = 0;
      selectors.forEach(selector => {
        let _nodes = Array.from(
          this.elRef.nativeElement.querySelectorAll(selector))
        _nodes = _nodes.concat(Array.from(
          this.elRef.nativeElement.querySelectorAll(
            "[ng-reflect-klass='" + selector + "']")))

        nodes = nodes.concat(_nodes)
        console.log(nodes);
        _effects = _effects.concat(Array(_nodes.length).fill(effects[iter]))
        iter++;
      })
      effects = _effects
    }

    if (typeof(delays) == 'number') {
      delays = Array(nodes.length).fill(delays)
      delays[0] = initial_delay
    }

    return new Observable((observer) => {
      let iter = 0;
      let net_delay = 0;
      let finished = 0;

      nodes.forEach((node) => {
        net_delay = net_delay + delays[iter];
        let delay = net_delay
        let effect = effects[iter];
        console.log(node, effect);
        setTimeout(() => {
          this.renderer.addClass(node, 'animated');
          this.renderer.addClass(node, effect);
          finished++;
          if (finished == nodes.length) {
            setTimeout(() => {
              let node_no = 0;
              if (reset) {
                nodes.forEach((node) => {

                  this.renderer.removeClass(node, effects[node_no]);
                  node_no++;
                  this.renderer.removeClass(node, 'animated');
                })
              }
              observer.next();
              observer.complete();
            }, 2000)
          }
        }, delay)
        iter++;
      })
    })
  }
}
