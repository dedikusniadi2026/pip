import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event when toggleSidebar() is called', () => {
    spyOn(component.toggle, 'emit');
    component.toggleSidebar();
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('should return true if role is allowed', () => {
    component.role = 'admin';
    expect(component.canShow(['admin', 'superadmin'])).toBeTrue();
  });

  it('should return false if role is not allowed', () => {
    component.role = 'driver';
    expect(component.canShow(['admin', 'superadmin'])).toBeFalse();
  });

  it('should return false if role is null', () => {
    component.role = null;
    expect(component.canShow(['admin'])).toBeFalse();
  });

  it('should accept collapsed input', () => {
    component.collapsed = true;
    fixture.detectChanges();
    expect(component.collapsed).toBeTrue();
  });

  it('should have hover default to false', () => {
    expect(component.hover).toBeFalse();
  });
});
