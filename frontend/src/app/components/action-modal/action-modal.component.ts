import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from '@angular/core';

type ModalType = 'danger' | 'info' | 'warning' | 'default';

@Component({
  selector: 'app-action-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.scss'],
})
export class ActionModalComponent implements AfterViewInit, OnDestroy {
  @Input() open = false;
  @Input() title = '';
  @Input() message = '';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() type: ModalType = 'default';
  @Input() showClose = true;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() closeModalOnEmployerSide = new EventEmitter<boolean>()

  private previouslyFocused: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.open) {
      this.trapFocus();
    }
  }

  ngOnDestroy() {
    this.restoreFocus();
  }

  ngOnChanges() {
    if (this.open) {
      setTimeout(() => this.trapFocus());
    } else {
      this.restoreFocus();
    }
  }

  trapFocus() {
    this.previouslyFocused = document.activeElement as HTMLElement;
    const modal = this.el.nativeElement.querySelector('.modal');
    if (modal) {
      const focusable = modal.querySelectorAll(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) {
        (focusable[0] as HTMLElement).focus();
      }
    }
  }

  restoreFocus() {
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.open) return;
    if (event.key === 'Escape') {
      this.cancel();
    }
    if (event.key === 'Tab') {
      this.maintainFocus(event);
    }
  }

  maintainFocus(event: KeyboardEvent) {
    const modal = this.el.nativeElement.querySelector('.modal');
    const focusable = modal.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;

    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    if (event.shiftKey && document.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  }

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
    this.closeModalOnEmployerSide.emit( false )
  }
}
