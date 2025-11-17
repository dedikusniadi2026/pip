import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
class MockAuthService {
  login = jasmine.createSpy('login');
  user = jasmine.createSpy('user');
}
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: MockAuthService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router) as any;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if username or password is empty', fakeAsync(() => {
    component.username = '';
    component.password = '';
    component.onSubmit();
    tick();

    expect(component.error).toBeTrue();
    expect(component.errorMessage).toBe('Please enter your username and password.');
  }));

  it('should navigate to /driver when role is Driver', fakeAsync(() => {
    component.username = 'driver';
    component.password = '123';

    authService.login.and.resolveTo(true);
    authService.user.and.returnValue({ role: 'Driver' });

    component.onSubmit();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/driver']);
  }));

  it('should navigate to /admin/dashboard when role is Admin', fakeAsync(() => {
    component.username = 'admin';
    component.password = '123';

    authService.login.and.resolveTo(true);
    authService.user.and.returnValue({ role: 'Admin' });

    component.onSubmit();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  }));

  it('should navigate to /admin when role is Customer', fakeAsync(() => {
    component.username = 'customer';
    component.password = '123';

    authService.login.and.resolveTo(true);
    authService.user.and.returnValue({ role: 'Customer' });

    component.onSubmit();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  }));

  it('should show error when login returns false', fakeAsync(() => {
    component.username = 'wrong';
    component.password = 'wrong';

    authService.login.and.resolveTo(false);

    component.onSubmit();
    tick();

    expect(component.error).toBeTrue();
    expect(component.errorMessage).toBe('Invalid username or password.');
  }));

  it('should show error when login throws exception', fakeAsync(() => {
    component.username = 'test';
    component.password = 'error';

    authService.login.and.rejectWith(new Error('Network error'));

    component.onSubmit();
    tick();

    expect(component.error).toBeTrue();
    expect(component.errorMessage).toBe('Login failed. Please try again later.');
  }));

});
