import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;
  errorMessage = '';
  loading = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit() {
    if (!this.username || !this.password) {
      this.error = true;
      this.errorMessage = 'Please enter your username and password.';
      return;
    }

    this.loading = true;
    this.error = false;

    try {
      const success = await this.auth.login(this.username, this.password);

      if (success) {
        const user = this.auth.user();
        const role = user?.role || 'User';

        if (role === 'Driver') {
          this.router.navigate(['/driver']);
        } else if (role === 'Admin') {
    this.router.navigate(['/admin/dashboard']);
        } else if (role === 'Customer') {
          this.router.navigate(['/admin']);
        }
      } else {
        this.error = true;
        this.errorMessage = 'Invalid username or password.';
      }
    } catch (err) {
      console.error(err);
      this.error = true;
      this.errorMessage = 'Login failed. Please try again later.';
    } finally {
      this.loading = false;
    }
  }
}
