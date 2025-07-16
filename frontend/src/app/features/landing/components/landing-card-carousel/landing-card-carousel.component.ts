import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-card-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './landing-card-carousel.component.html',
  styleUrls: ['./landing-card-carousel.component.scss'],
})
export class LandingCardCarouselComponent implements OnInit {
  currentStartIndex = 0;
  cardsPerView = 3;
  touchStartX = 0;
  touchEndX = 0;

  cards = [
    {
      title: 'Practice with AI Interview Prep',
      description:
        'Our team consists of seasoned developers, designers, and experts who excel in various areas of technology.',
    },
    {
      title: 'Get Smart Feedback on your resume',
      description:
        'Our portfolio is a testament to our ability to deliver impactful results.',
    },
    {
      title: 'Track Every Job you Apply to',
      description: 'We believe in working hand-in-hand with our clients.',
    },
    {
      title: 'Stand Out With Tailored Applications',
      description:
        'We personalize your applications to match employer expectations.',
    },
    {
      title: 'Stay Notified About New Openings',
      description:
        'Get alerts for new roles that match your skillset instantly.',
    },
  ];

  ngOnInit(): void {
    this.updateCardsPerView();
  }

  @HostListener('window:resize')
  updateCardsPerView(): void {
    const width = window.innerWidth;
    if (width <= 768) {
      this.cardsPerView = 1;
    } else if (width <= 1024) {
      this.cardsPerView = 2;
    } else {
      this.cardsPerView = 3;
    }
  }

  get visibleCards() {
    return this.cards.slice(
      this.currentStartIndex,
      this.currentStartIndex + this.cardsPerView
    );
  }

  next(): void {
    const nextIndex = this.currentStartIndex + this.cardsPerView;
    if (nextIndex < this.cards.length) {
      this.currentStartIndex = nextIndex;
    }
  }

  previous(): void {
    const prevIndex = this.currentStartIndex - this.cardsPerView;
    if (prevIndex >= 0) {
      this.currentStartIndex = prevIndex;
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture() {
    const threshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > threshold) {
      diff > 0 ? this.next() : this.previous();
    }
  }

  getCardIndex(i: number): number {
    return this.currentStartIndex + i;
  }
}
