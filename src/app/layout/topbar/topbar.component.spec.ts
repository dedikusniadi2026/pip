import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';
import { AuthService } from '../../core/services/auth.service';

class MockAuthService {
  logout = jasmine.createSpy('logout');
}

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;
  let authService: MockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
      providers: [
        { provide: MockAuthService, useClass: MockAuthService },
        { provide: AuthService, useExisting: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as unknown as MockAuthService;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.logout when logout() is executed', () => {
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
