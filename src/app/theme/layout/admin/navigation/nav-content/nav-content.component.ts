import { Component, OnInit, output, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

// theme version
import { environment } from 'src/environments/environment';

// project import
import { NavigationItem } from '../navigation-interface';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavigationService } from '../navigation';

// NgScrollbarModule
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [CommonModule, RouterModule, NavCollapseComponent, NavGroupComponent, NavItemComponent, SharedModule],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent implements OnInit {
  private location = inject(Location);
  private navigationService = inject(NavigationService);

  // public props
  NavCollapsedMob = output();
  SubmenuCollapse = output();

  // version
  title = 'Demo application for version numbering';
  currentApplicationVersion = environment.appVersion;
  
  windowWidth: number;
  
  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
  }

  // Acessar items diretamente do serviço
  get navigations(): NavigationItem[] {
    return this.navigationService.navigationItems();
  }

  // Life cycle events
  ngOnInit() {
    if (this.windowWidth < 1025) {
      setTimeout(() => {
        (document.querySelector('.coded-navbar') as HTMLDivElement)?.classList.add('menupos-static');
      }, 500);
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    // eslint-disable-next-line
    // @ts-ignore
    if (this.location['_baseHref']) {
      // eslint-disable-next-line
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
  }

  // Adicione esta função ao componente
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackByUniqueId(index: number, item: any): string {
    // Use uma combinação do índice com o ID ou uma propriedade única do item
    return index + '-' + (item.id || item.url || item.title || index);
  }
}
