import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-landing-what-we-do',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-what-we-do.component.html',
  styleUrls: ['./landing-what-we-do.component.scss'],
})
export class LandingWhatWeDoComponent {
  cards: FeatureCard[] = [
    {
      icon: 'assets/icons/sun.png',
      title: 'Discover Your Dream Job',
      description:
        'Browse thousands of listings with advanced filters (role, location, salary, skills).',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Easy Application',
      description:
        'Submit applications with resume uploads and track status in real time.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Skill-Based Profiles',
      description: 'Showcase your expertise to attract the right employers.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Post & Manage Jobs',
      description:
        'Create, edit, or delete job listings with a user-friendly dashboard.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Find Top Talent',
      description:
        'Filter applications, update statuses, and notify candidates effortlessly.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Brand Your Listings',
      description: 'Upload company logos and attachments to stand out.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Secure & Role-Specific',
      description:
        'JWT authentication and strict access control for each user type.',
    },
    {
      icon: 'assets/icons/sun.png',
      title: 'Powerful Search',
      description:
        'Paginated, sorted, and dynamic job listings for a smooth experience.',
    },
  ];
}
