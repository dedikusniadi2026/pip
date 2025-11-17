import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { AuthService } from '../core/services/auth.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { By } from '@angular/platform-browser';

class MockAuthService {
  logout = jasmine.createSpy('logout');

  user() {
    return { role: 'admin', name: 'Mock User' };
  }
}

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, SidebarComponent, TopbarComponent],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar collapsed state', () => {
    expect(component.isSidebarCollapsed).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarCollapsed).toBeTrue();
  });

  it('should call toggleSidebar() when Sidebar emits toggle event', () => {
    spyOn(component, 'toggleSidebar').and.callThrough();

    const sidebar = fixture.debugElement.query(By.directive(SidebarComponent));
    sidebar.triggerEventHandler('toggle', null);

    expect(component.toggleSidebar).toHaveBeenCalled();
  });

  it('should pass isSidebarCollapsed to SidebarComponent', () => {
    const sidebar = fixture.debugElement.query(By.directive(SidebarComponent));
    const sidebarComponent = sidebar.componentInstance as SidebarComponent;

    component.isSidebarCollapsed = true;
    fixture.detectChanges();

    expect(sidebarComponent.collapsed).toBeTrue();
  });
});
