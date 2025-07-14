import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFormComponent } from '../../../../../shared/components/auth-form/auth-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthFormComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  selectedRole: 'seeker' | 'employer' = 'seeker';

  switchRole(role: 'seeker' | 'employer') {
    this.selectedRole = role;
  }

  onFormSubmit(formData: any) {
    console.log('✅ Form Submitted:', formData);
    console.log('👤 User Role:', this.selectedRole);

    // Future: call authService.register(formData, this.selectedRole)
  }
}
