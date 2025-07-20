import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-job-categories',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './landing-job-categories.component.html',
  styleUrls: ['./landing-job-categories.component.scss'],
})
export class LandingJobCategoriesComponent implements OnInit {
  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  currentIndex = 0;
  isDesktop = true;

  cards = [
    {
      image: 'assets/images/uiux.png',
      title: 'The Power of UI/UX: Creating Engaging Digital Experiences',
      description:
        "Explore the importance of user interface (UI) and user experience (UX) design in today's digital landscape.",
      author: 'Emily Carter',
    },
    {
      image: 'assets/images/agile.png',
      title: 'Agile Development: The Key to Flexibility',
      description:
        'Dive into the principles of agile development and how it enhances project management, collaboration.',
      author: 'Alex Turner',
    },
    {
      image: 'assets/images/mobile.png',
      title: 'Mobile App Development Trends to Watch in 2023',
      description:
        'Provide an overview of the latest trends in mobile app development, covering topics like augmented reality.',
      author: 'Sarah Mitchell',
    },
    {
      image: 'assets/images/cybersecurity.jpg',
      title: 'Cybersecurity in 2023: Staying Ahead of Threats',
      description:
        'Understand modern cybersecurity practices and how professionals safeguard digital assets.',
      author: 'Jason Lee',
    },
    {
      image: 'assets/images/devops.jpg',
      title: 'DevOps Culture: Building Better Software Faster',
      description:
        'Explore how DevOps practices empower teams to automate and streamline software delivery.',
      author: 'Linda Gomez',
    },
  ];

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
  }

  scroll(container: HTMLElement, direction: 'left' | 'right') {
    if (this.isDesktop) {
      const scrollAmount = 370; 
      direction === 'left'
        ? (container.scrollLeft -= scrollAmount)
        : (container.scrollLeft += scrollAmount);
    } else {
      // For mobile, scroll by full card width
      const cardWidth = container.querySelector('.card')?.clientWidth || 0;
      direction === 'left'
        ? (container.scrollLeft -= cardWidth)
        : (container.scrollLeft += cardWidth);
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', () => this.checkScreenSize());
  }
}
