import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { Servico, Filtro } from 'src/app/core/interfaces/padroes';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-freelancer-catalog',
  templateUrl: './catalogo-servicos.component.html',
  styleUrls: ['./catalogo-servicos.component.scss'],
  standalone: true,  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatExpansionModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSliderModule
  ],
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ServicesComponent implements OnInit, AfterViewInit {
  selectedCategory = '';
  searchQuery = '';
  minPrice?: number;
  maxPrice?: number;
  selectedFilters: Record<string, string[]> = {};
  showAllFilters = false;
  isFilterCollapsed = false;
  loadedServices = false;

  filters: Filtro[] = [
    {
      nome: 'Nível',
      opcoes: ['Iniciante', 'Intermediário', 'Expert']
    },
    {
      nome: 'Tempo de Entrega',
      opcoes: ['Até 24h', '1-3 dias', '3-7 dias', '7+ dias']
    },
    {
      nome: 'Avaliação',
      opcoes: ['4.5+', '4.0+', '3.5+']
    }
  ];

  services: Servico[] = [
    {
      id: 1,
      titulo: 'Pintura Residencial Profissional',
      categoria: 'Pintor',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 127,
      nomeColaborador: 'João Silva',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      tempoEntrega: 3,
      descricao: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      nivel: 'Expert'
    },
    {
      id: 1,
      titulo: 'Pintura Residencial Profissional',
      categoria: 'Pintor',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 127,
      nomeColaborador: 'João Silva',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      tempoEntrega: 3,
      descricao: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      nivel: 'Expert'
    },{
      id: 1,
      titulo: 'Pintura Residencial Profissional',
      categoria: 'Pintor',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 127,
      nomeColaborador: 'João Silva',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      tempoEntrega: 3,
      descricao: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      nivel: 'Expert'
    },{
      id: 1,
      titulo: 'Pintura Residencial Profissional',
      categoria: 'Pintor',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 127,
      nomeColaborador: 'João Silva',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/10.jpg',
      tags: ['Pintura', 'Acabamento', 'Residencial'],
      tempoEntrega: 3,
      descricao: 'Serviço de pintura residencial com acabamento premium e materiais de qualidade.',
      nivel: 'Expert'
    },
    {
      id: 2,
      titulo: 'Manutenção de Jardins',
      categoria: 'Jardinagem',
      preco: 150,
      avaliacao: 4.7,
      totalAvaliacoes: 89,
      nomeColaborador: 'Maria Oliveira',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/71.jpg',
      tags: ['Jardim', 'Paisagismo', 'Manutenção'],
      tempoEntrega: 1,
      descricao: 'Cuidados completos com seu jardim, incluindo poda, plantio e manutenção.',
      nivel: 'Expert'
    },
    {
      id: 3,
      titulo: 'Desenvolvimento Web Full Stack',
      categoria: 'Programador',
      preco: 300,
      avaliacao: 4.9,
      totalAvaliacoes: 156,
      nomeColaborador: 'Pedro Santos',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/41.jpg',
      tags: ['React', 'Node.js', 'Full Stack'],
      tempoEntrega: 5,
      descricao: 'Desenvolvimento de aplicações web completas com as tecnologias mais modernas.',
      nivel: 'Expert'
    },
    {
      id: 4,
      titulo: 'Shows e Eventos',
      categoria: 'Musico',
      preco: 500,
      avaliacao: 4.8,
      totalAvaliacoes: 92,
      nomeColaborador: 'Ana Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/31.jpg',
      tags: ['Música ao Vivo', 'Eventos', 'Casamentos'],
      tempoEntrega: 1,
      descricao: 'Apresentações musicais para eventos, festas e casamentos.',
      nivel: 'Expert'
    },
    {
      id: 5,
      titulo: 'Fotografia de Eventos',
      categoria: 'Fotografo',
      preco: 400,
      avaliacao: 4.6,
      totalAvaliacoes: 113,
      nomeColaborador: 'Lucas Mendes',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/21.jpg',
      tags: ['Eventos', 'Fotografia', 'Edição'],
      tempoEntrega: 2,
      descricao: 'Cobertura fotográfica profissional para eventos e ocasiões especiais.',
      nivel: 'Expert'
    },
    {
      id: 6,
      titulo: 'Reformas e Construções',
      categoria: 'Construcao',
      preco: 1000,
      avaliacao: 4.7,
      totalAvaliacoes: 78,
      nomeColaborador: 'Antonio Pereira',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/51.jpg',
      tags: ['Reforma', 'Construção', 'Acabamento'],
      tempoEntrega: 7,
      descricao: 'Serviços completos de reforma e construção residencial.',
      nivel: 'Expert'
    },
    {
      id: 7,
      titulo: 'Segurança Patrimonial',
      categoria: 'Vigilancia',
      preco: 180,
      avaliacao: 4.5,
      totalAvaliacoes: 64,
      nomeColaborador: 'Carlos Souza',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/81.jpg',
      tags: ['Segurança', 'Vigilância', 'Patrimonial'],
      tempoEntrega: 1,
      descricao: 'Serviços de vigilância e segurança para residências e empresas.',
      nivel: 'Intermediário'
    },
    {
      id: 8,
      titulo: 'Instalações Elétricas',
      categoria: 'Eletricista',
      preco: 250,
      avaliacao: 4.8,
      totalAvaliacoes: 142,
      nomeColaborador: 'Roberto Alves',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/91.jpg',
      tags: ['Elétrica', 'Instalação', 'Manutenção'],
      tempoEntrega: 2,
      descricao: 'Serviços elétricos residenciais e comerciais com garantia.',
      nivel: 'Expert'
    },
    {
      id: 9,
      titulo: 'Serviços Hidráulicos',
      categoria: 'Encanador',
      preco: 200,
      avaliacao: 4.6,
      totalAvaliacoes: 95,
      nomeColaborador: 'José Lima',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/11.jpg',
      tags: ['Hidráulica', 'Encanamento', 'Manutenção'],
      tempoEntrega: 1,
      descricao: 'Reparos e instalações hidráulicas com atendimento rápido.',
      nivel: 'Expert'
    },
    {
      id: 10,
      titulo: 'Móveis sob Medida',
      categoria: 'Carpinteiro',
      preco: 800,
      avaliacao: 4.9,
      totalAvaliacoes: 87,
      nomeColaborador: 'Paulo Rodrigues',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/14.jpg',
      tags: ['Móveis', 'Marcenaria', 'Personalizado'],
      tempoEntrega: 5,
      descricao: 'Fabricação de móveis personalizados com acabamento premium.',
      nivel: 'Expert'
    },
    {
      id: 11,
      titulo: 'Portaria 24h',
      categoria: 'Portaria',
      preco: 150,
      avaliacao: 4.5,
      totalAvaliacoes: 73,
      nomeColaborador: 'Fernando Santos',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/18.jpg',
      tags: ['Portaria', 'Segurança', '24h'],
      tempoEntrega: 1,
      descricao: 'Serviços de portaria profissional para condomínios e empresas.',
      nivel: 'Intermediário'
    },
    {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    }, {
      id: 12,
      titulo: 'Limpeza Residencial',
      categoria: 'Limpeza',
      preco: 120,
      avaliacao: 4.7,
      totalAvaliacoes: 168,
      nomeColaborador: 'Marina Costa',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/19.jpg',
      tags: ['Limpeza', 'Higienização', 'Residencial'],
      tempoEntrega: 1,
      descricao: 'Serviços de limpeza completa para residências e escritórios.',
      nivel: 'Intermediário'
    },
    {
      id: 13,
      titulo: 'Reparo de Carro',
      categoria: 'Mecânico',
      preco: 300,
      avaliacao: 4.7,
      totalAvaliacoes: 98,
      nomeColaborador: 'Carlos Mecânico',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/10.jpg',
      tags: ['Reparo', 'Carro', 'Mecânico'],
      tempoEntrega: 2,
      descricao: 'Serviço completo de reparo e manutenção de carros.',
      nivel: 'Expert'
    },
    {
      id: 14,
      titulo: 'Cozinheiro Profissional',
      categoria: 'Chef',
      preco: 500,
      avaliacao: 4.9,
      totalAvaliacoes: 120,
      nomeColaborador: 'Ana Chef',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/20.jpg',
      tags: ['Cozinha', 'Gourmet', 'Chef'],
      tempoEntrega: 1,
      descricao: 'Serviço de chef profissional para eventos e refeições gourmet.',
      nivel: 'Expert'
    },
    {
      id: 15,
      titulo: 'Maquiagem para Eventos',
      categoria: 'Maquiador',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 110,
      nomeColaborador: 'Maria Maquiadora',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/30.jpg',
      tags: ['Maquiagem', 'Eventos', 'Beleza'],
      tempoEntrega: 1,
      descricao: 'Serviço de maquiagem profissional para eventos e ocasiões especiais.',
      nivel: 'Expert'
    },
    {
      id: 16,
      titulo: 'Corte de Cabelo',
      categoria: 'Cabeleireiro',
      preco: 150,
      avaliacao: 4.7,
      totalAvaliacoes: 95,
      nomeColaborador: 'João Cabeleireiro',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/40.jpg',
      tags: ['Cabelo', 'Corte', 'Beleza'],
      tempoEntrega: 1,
      descricao: 'Serviço de corte de cabelo profissional.',
      nivel: 'Expert'
    },
    {
      id: 17,
      titulo: 'Serviço de Motorista',
      categoria: 'Motorista',
      preco: 100,
      avaliacao: 4.6,
      totalAvaliacoes: 85,
      nomeColaborador: 'Pedro Motorista',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/50.jpg',
      tags: ['Motorista', 'Transporte', 'Viagem'],
      tempoEntrega: 1,
      descricao: 'Serviço de motorista particular para viagens e transporte.',
      nivel: 'Intermediário'
    },
    {
      id: 18,
      titulo: 'Aulas de Libras',
      categoria: 'Libras',
      preco: 200,
      avaliacao: 4.8,
      totalAvaliacoes: 100,
      nomeColaborador: 'Lucas Professor',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/60.jpg',
      tags: ['Libras', 'Aulas', 'Educação'],
      tempoEntrega: 1,
      descricao: 'Aulas de Libras para iniciantes e avançados.',
      nivel: 'Expert'
    },
    {
      id: 19,
      titulo: 'Consultoria Contábil',
      categoria: 'Contador',
      preco: 400,
      avaliacao: 4.9,
      totalAvaliacoes: 130,
      nomeColaborador: 'Fernanda Contadora',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/70.jpg',
      tags: ['Contabilidade', 'Consultoria', 'Financeiro'],
      tempoEntrega: 2,
      descricao: 'Serviço de consultoria contábil para empresas e indivíduos.',
      nivel: 'Expert'
    },
    {
      id: 20,
      titulo: 'Confecção de Roupas Sob Medida',
      categoria: 'Alfaiate',
      preco: 500,
      avaliacao: 4.8,
      totalAvaliacoes: 115,
      nomeColaborador: 'Ricardo Alfaiate',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/80.jpg',
      tags: ['Roupas', 'Sob Medida', 'Alfaiate'],
      tempoEntrega: 5,
      descricao: 'Serviço de confecção de roupas sob medida.',
      nivel: 'Expert'
    },
    {
      id: 21,
      titulo: 'Tradução de Documentos',
      categoria: 'Tradutor',
      preco: 300,
      avaliacao: 4.7,
      totalAvaliacoes: 105,
      nomeColaborador: 'Sofia Tradutora',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/90.jpg',
      tags: ['Tradução', 'Documentos', 'Idiomas'],
      tempoEntrega: 3,
      descricao: 'Serviço de tradução de documentos em diversos idiomas.',
      nivel: 'Expert'
    },
    {
      id: 22,
      titulo: 'Decoração de Interiores',
      categoria: 'Decorador',
      preco: 700,
      avaliacao: 4.9,
      totalAvaliacoes: 140,
      nomeColaborador: 'Mariana Decoradora',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/76.jpg',
      tags: ['Decoração', 'Interiores', 'Design'],
      tempoEntrega: 7,
      descricao: 'Serviço de decoração de interiores para residências e escritórios.',
      nivel: 'Expert'
    },
    {
      id: 23,
      titulo: 'Aulas Particulares',
      categoria: 'Professor',
      preco: 250,
      avaliacao: 4.8,
      totalAvaliacoes: 120,
      nomeColaborador: 'Carlos Professor',
      fotoColaborador: 'https://randomuser.me/api/portraits/men/10.jpg',
      tags: ['Aulas', 'Educação', 'Particulares'],
      tempoEntrega: 1,
      descricao: 'Aulas particulares para diversas disciplinas.',
      nivel: 'Expert'
    },
    {
      id: 24,
      titulo: 'Consulta Veterinária',
      categoria: 'Veterinario',
      preco: 300,
      avaliacao: 4.9,
      totalAvaliacoes: 130,
      nomeColaborador: 'Ana Veterinária',
      fotoColaborador: 'https://randomuser.me/api/portraits/women/20.jpg',
      tags: ['Veterinária', 'Animais', 'Consulta'],
      tempoEntrega: 1,
      descricao: 'Consulta veterinária para animais de estimação.',
      nivel: 'Expert'
    }
  ];

  filteredServices: Servico[] = [];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      if (category) {
        this.selectedCategory = this.formatCategoryName(category);
        this.filteredServices = this.services.filter(
          service => service.categoria === this.selectedCategory
        );
        
        // Simular um pequeno atraso para mostrar a animação de carregamento
        setTimeout(() => {
          this.loadedServices = true;
        }, 300);
      }
    });
  }

  ngAfterViewInit(): void {
    // Ajusta o layout masonry após a renderização dos items
    setTimeout(() => {
      this.adjustMasonryLayout();
    }, 500);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.adjustMasonryLayout();
  }

  private formatCategoryName(category: string): string {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  }
  
  // Método para controlar a exibição dos filtros expandidos
  toggleShowAllFilters(): void {
    this.showAllFilters = !this.showAllFilters;
  }
    // Método para ajustar o layout tipo masonry (tijolos)
  private adjustMasonryLayout(): void {
    // Isso seria implementado com JavaScript para ajustar a altura dos cards
    // em um layout tipo masonry real
    const items = document.querySelectorAll('.masonry-grid-item');
    if (items.length === 0) return;
    
    // Implementação básica para um efeito visual
    const getRandomOffset = () => {
      return Math.floor(Math.random() * 3) * 10; // Valores aleatórios: 0, 10, ou 20px
    };
    
    items.forEach((item, index) => {
      if (window.innerWidth >= 768) { // Apenas em telas maiores
        const offset = index % 2 === 0 ? getRandomOffset() : 0;
        (item as HTMLElement).style.marginTop = `${offset}px`;
      } else {
        (item as HTMLElement).style.marginTop = '0';
      }
    });
  }
  
  // Método para limpar todos os filtros
  resetFilters(): void {
    this.searchQuery = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.selectedFilters = {};
    this.applyFilters();
  }
  applyFilters(): void {
    // Reset a visualização dos serviços filtrados
    this.loadedServices = false;
    
    this.filteredServices = this.services.filter(service => {
      // Filtro por categoria
      if (this.selectedCategory && service.categoria !== this.selectedCategory) {
        return false;
      }

      // Filtro por busca
      if (this.searchQuery) {
        const searchLower = this.searchQuery.toLowerCase();
        const matchesSearch =
          service.titulo.toLowerCase().includes(searchLower) ||
          service.descricao.toLowerCase().includes(searchLower) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          service.nomeColaborador.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      // Filtro por preço
      if (this.minPrice && service.preco < this.minPrice) return false;
      if (this.maxPrice && service.preco > this.maxPrice) return false;

      // Filtros selecionados
      for (const [filterName, selectedOptions] of Object.entries(this.selectedFilters)) {
        if (selectedOptions.length === 0) continue;

        switch (filterName) {
          case 'Nível':
            if (!selectedOptions.includes(service.nivel)) return false;
            break;
          case 'Tempo de Entrega': {
            const deliveryMatch = selectedOptions.some(option => {
              if (option === 'Até 24h') return service.tempoEntrega <= 1;
              if (option === '1-3 dias') return service.tempoEntrega > 1 && service.tempoEntrega <= 3;
              if (option === '3-7 dias') return service.tempoEntrega > 3 && service.tempoEntrega <= 7;
              return service.tempoEntrega > 7;
            });
            if (!deliveryMatch) return false;
            break;
          }
          case 'Avaliação': {
            const ratingMatch = selectedOptions.some(option => {
              const minRating = parseFloat(option.replace('+', ''));
              return service.avaliacao >= minRating;
            });
            if (!ratingMatch) return false;
            break;
          }
        }
      }

      return true;
    });
    
    // Simula um pequeno atraso para exibir a animação de carregamento
    setTimeout(() => {
      this.loadedServices = true;
      
      // Ajusta o layout após carregar os itens filtrados
      setTimeout(() => {
        this.adjustMasonryLayout();
      }, 200);
    }, 300);
  }
  toggleFilter(filterName: string, option: string): void {
    if (!this.selectedFilters[filterName]) {
      this.selectedFilters[filterName] = [];
    }

    const index = this.selectedFilters[filterName].indexOf(option);
    if (index === -1) {
      this.selectedFilters[filterName].push(option);
    } else {
      this.selectedFilters[filterName].splice(index, 1);
    }

    // Aplica os filtros automaticamente após cada toggle
    this.applyFilters();
  }

  openServiceDetails(service: Servico): void {
    this.dialog.open(ServiceDetailsComponent, {
      data: service
    });
  }

  // Método para verificar se um filtro está selecionado
  isFilterSelected(filterName: string, option: string): boolean {
    if (!this.selectedFilters[filterName]) return false;
    return this.selectedFilters[filterName].includes(option);
  }

  // Getters para evitar funções inline no template
  get nivelOptions(): string[] {
    const filter = this.filters.find(f => f.nome === 'Nível');
    return filter ? filter.opcoes : [];
  }

  get tempoEntregaOptions(): string[] {
    const filter = this.filters.find(f => f.nome === 'Tempo de Entrega');
    return filter ? filter.opcoes : [];
  }

  get avaliacaoOptions(): string[] {
    const filter = this.filters.find(f => f.nome === 'Avaliação');
    return filter ? filter.opcoes : [];
  }
}
