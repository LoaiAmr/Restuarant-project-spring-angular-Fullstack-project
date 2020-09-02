import { Directive, HostListener, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }
  
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') mouseover(eventData: Event){
    this.isOpen = !this.isOpen;
  }

}
