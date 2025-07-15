import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-application-form',
  imports: [MatStepperModule, MatIconModule, MatButtonModule],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss',
})
export class ApplicationFormComponent {
  coverLetterFile?: File;
  resumeFile?: File;

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, type: 'cover' | 'resume') {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      if (type === 'cover') this.coverLetterFile = file;
      if (type === 'resume') this.resumeFile = file;
      console.log(`${type} dropped:`, file);
    }
  }

  onFileSelected(event: Event, type: 'cover' | 'resume') {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      if (type === 'cover') this.coverLetterFile = file;
      if (type === 'resume') this.resumeFile = file;
      console.log(`${type} selected:`, file);
    }
  }
}
