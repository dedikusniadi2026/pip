import { Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";

interface StoredUser {
  username: string;
  token: string;
  loginTime: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersSignal = signal<StoredUser | null>(null);
  private sessionDuration = 30 * 60 * 1000; // 30 menit
  private logoutTimerId: number | null = null;

  constructor(private router: Router) {
    const save = localStorage.getItem('user');
    if (save) {
      try {
        const parsed: StoredUser = JSON.parse(save);
        if (this._isExpired(parsed.loginTime)) {
          this._clearSession();
        } else {
          this.usersSignal.set(parsed);
          this.startAutoLogoutTimer(parsed.loginTime);
        }
      } catch {
        this._clearSession();
      }
    }
  }

  get user() {
    return this.usersSignal.asReadonly();
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const credentials = { username, password };

      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!res.ok) return false;

      const data = await res.json();
      const now = Date.now();

      let role = 'Admin';
      if (username === 'johnd') {
        role = 'Driver';
      } else if (username === 'derek') {
        role = 'Customer';
      }

      const user: StoredUser = {
        username,
        token: data.token,
        loginTime: now,
        role
      };

      localStorage.setItem('user', JSON.stringify(user));
      this.usersSignal.set(user);

      this.startAutoLogoutTimer(now);

      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    this._clearSession();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const u = this.usersSignal();
    if (!u) return false;
    if (this._isExpired(u.loginTime)) {
      this._clearSession();
      return false;
    }
    return true;
  }

  isSessionExpired(): boolean {
    const u = this.usersSignal();
    if (!u) return true;
    return this._isExpired(u.loginTime);
  }

  startAutoLogoutTimer(loginTime: number) {
    if (this.logoutTimerId !== null) {
      window.clearTimeout(this.logoutTimerId);
      this.logoutTimerId = null;
    }

    const expiresAt = loginTime + this.sessionDuration;
    const now = Date.now();
    const msLeft = expiresAt - now;

    if (msLeft <= 0) {
      this._clearSession();
      this.router.navigate(['/login']);
      return;
    }

    this.logoutTimerId = window.setTimeout(() => {
      this._clearSession();
      this.router.navigate(['/login']);
    }, msLeft);
  }

  private _isExpired(loginTime: number): boolean {
    return Date.now() - loginTime > this.sessionDuration;
  }

  private _clearSession() {
    localStorage.removeItem('user');
    this.usersSignal.set(null);
    if (this.logoutTimerId !== null) {
      window.clearTimeout(this.logoutTimerId);
      this.logoutTimerId = null;
    }
  }
}
