import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule } from 'primeng/popover';



@Component({
  selector: 'app-employer-navbar',
  standalone: true,
  imports: [RouterModule, PopoverModule],
  templateUrl: './employer-navbar.component.html',
  styleUrl: './employer-navbar.component.scss',
})
export class EmployerNavbarComponent {

  // @ViewChild('profile') profilePopover! : ElementRef;
 
  // closePopover() {
  //   const popover = this.profilePopover?.nativeElement;  
  //     if (popover && popover.hide) {
  //       popover.hide();
  //     }
  
  // }

  // showPopover: boolean = false;

  // togglePopOver() {
  //   this.showPopover = !this.showPopover
  // }


  // handleOptionClick() {
  //   // Perform your logic
  //   this.closePopover();
  // }



}
