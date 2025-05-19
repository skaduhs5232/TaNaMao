import { Component, Inject, HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Servico } from 'src/app/core/interfaces/padroes';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatDividerModule, 
    MatBadgeModule,
    MatTabsModule,
    MatChipsModule,
    MatExpansionModule,
    MatTooltipModule
  ],
})
export class ServiceDetailsComponent {
  @HostBinding('class.sidebar-open') sidebarOpen = false;
  @HostBinding('class.sidebar-closed') sidebarClosed = true;

  // Propriedades para as novas funcionalidades
  isFavorite = false;
  servicosSimilares: Servico[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Servico,
    private router: Router,
    private dialogRef: MatDialogRef<ServiceDetailsComponent>
  ) {
    this.sidebarOpen = this.isSidebarOpen();
    this.sidebarClosed = !this.sidebarOpen;
    this.carregarServicosSimilares();
  }

  private isSidebarOpen(): boolean {
    return false;
  }

  navigateToComprarServico(): void {
    this.dialogRef.close();
    this.router.navigate(['/contrato', this.data.id], {
      state: { serviceData: this.data }
    });
  }

  // Métodos para as novas funcionalidades
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    // Aqui você adicionaria a lógica para salvar o favorito no serviço
  }

  shareService(): void {
    // Implementação do compartilhamento via API Web Share
    if (navigator.share) {
      navigator.share({
        title: this.data.titulo,
        text: `Confira este serviço: ${this.data.titulo} por ${this.data.nomeColaborador}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Erro ao compartilhar', error));
    } else {
      // Fallback para navegadores que não suportam a API Web Share
      // Poderia mostrar um diálogo com opções de compartilhamento
      console.log('Web Share não suportado neste navegador');
    }
  }

  contactProvider(): void {
    // Implementação do contato com o prestador de serviço
    // Poderia abrir um chat ou modal de mensagens
    console.log('Contatar prestador de serviço');
    this.dialogRef.close('contact');
  }

  navigateToService(id: string | number): void {
    // Navegar para outro serviço similar
    this.dialogRef.close();
    this.router.navigate(['/catalogo-servicos/servico', id]);
  }

  private carregarServicosSimilares(): void {
    // Simulação de carregamento de serviços similares - em produção seria feito via API
    // Esta é uma simulação temporária - deve ser substituída por dados reais
    this.servicosSimilares = [
      {
        id: '1',
        titulo: 'Serviço Similar 1',
        categoria: this.data.categoria,
        preco: this.data.preco * 0.9,
        avaliacao: 4.2,
        totalAvaliacoes: 18,
        nomeColaborador: 'Outro Prestador',
        fotoColaborador: 'assets/images/user/avatar-1.jpg',
        tags: this.data.tags,
        tempoEntrega: this.data.tempoEntrega + 1,
        descricao: 'Descrição de um serviço similar',
        nivel: 'Intermediário'
      },
      {
        id: '2',
        titulo: 'Serviço Similar 2',
        categoria: this.data.categoria,
        preco: this.data.preco * 1.1,
        avaliacao: 4.7,
        totalAvaliacoes: 24,
        nomeColaborador: 'Mais um Prestador',
        fotoColaborador: 'assets/images/user/avatar-2.jpg',
        tags: this.data.tags,
        tempoEntrega: this.data.tempoEntrega - 1,
        descricao: 'Outro serviço com características similares',
        nivel: 'Expert'
      },
      {
        id: '2',
        titulo: 'Serviço Similar 2',
        categoria: this.data.categoria,
        preco: this.data.preco * (-1),
        avaliacao: 4.7,
        totalAvaliacoes: 24,
        nomeColaborador: 'Mais um Prestador',
        fotoColaborador: 'assets/images/user/avatar-2.jpg',
        tags: this.data.tags,
        tempoEntrega: this.data.tempoEntrega - 1,
        descricao: 'Outro serviço com características similares',
        nivel: 'Expert'
      }
    ];
  }
}
