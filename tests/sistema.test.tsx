import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SistemaPage from '@/app/sistema/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe('Sistema - Login', () => {
  beforeEach(() => {
    // Clear cookies and localStorage
    document.cookie = 'sistema_session=; path=/; max-age=0';
    localStorage.clear();
  });

  it('shows login form when not authenticated', () => {
    render(<SistemaPage />);
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(screen.getByText(/área interna/i)).toBeInTheDocument();
  });

  it('rejects wrong password', async () => {
    render(<SistemaPage />);
    const input = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(input, { target: { value: 'senhaerrada' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/senha incorreta/i)).toBeInTheDocument();
    });
  });

  it('accepts correct password and shows dashboard', async () => {
    render(<SistemaPage />);
    const input = screen.getByPlaceholderText('Senha');
    const button = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(input, { target: { value: 'sistema2026' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/gestão de projetos/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /\+ novo projeto/i })).toBeInTheDocument();
    });
  });

  it('persists session via cookie', async () => {
    document.cookie = 'sistema_session=1; path=/';
    render(<SistemaPage />);

    await waitFor(() => {
      expect(screen.getByText(/gestão de projetos/i)).toBeInTheDocument();
    });
  });
});

describe('Sistema - Gestão de Projetos', () => {
  beforeEach(() => {
    document.cookie = 'sistema_session=1; path=/';
    localStorage.clear();
  });

  it('shows empty state when no projects', async () => {
    render(<SistemaPage />);
    await waitFor(() => {
      expect(screen.getByText(/nenhum projeto cadastrado/i)).toBeInTheDocument();
    });
  });

  it('can add a new project', async () => {
    render(<SistemaPage />);
    await waitFor(() => screen.getByRole('button', { name: /\+ novo projeto/i }));

    fireEvent.click(screen.getByRole('button', { name: /\+ novo projeto/i }));

    await waitFor(() => screen.getByPlaceholderText('Nome do projeto'));

    fireEvent.change(screen.getByPlaceholderText('Nome do projeto'), { target: { value: 'Projeto Teste' } });
    fireEvent.change(screen.getByPlaceholderText('Cliente'), { target: { value: 'Cliente X' } });
    fireEvent.change(screen.getByPlaceholderText('Valor (R$)'), { target: { value: '5000' } });
    fireEvent.change(screen.getByPlaceholderText('Estimativa (dias)'), { target: { value: '10' } });

    fireEvent.click(screen.getByRole('button', { name: /salvar/i }));

    await waitFor(() => {
      expect(screen.getByText('Projeto Teste')).toBeInTheDocument();
      expect(screen.getByText('Cliente X')).toBeInTheDocument();
      expect(screen.getByText('R$ 5.000')).toBeInTheDocument();
    });
  });

  it('calculates dashboard metrics', async () => {
    // Pre-seed localStorage
    const projects = [
      {
        id: '1',
        name: 'Projeto A',
        client: 'Cliente A',
        value: 10000,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        estimateDays: 5,
        status: 'em_andamento',
        progress: 50,
      },
      {
        id: '2',
        name: 'Projeto B',
        client: 'Cliente B',
        value: 2000,
        deadline: '',
        estimateDays: 3,
        status: 'prospeccao',
        progress: 0,
      },
    ];
    localStorage.setItem('sistema_projects', JSON.stringify(projects));

    render(<SistemaPage />);

    await waitFor(() => {
      expect(screen.getByText('R$ 12.000')).toBeInTheDocument(); // total value
      expect(screen.getByText('1')).toBeInTheDocument(); // em andamento
    });
  });

  it('can logout', async () => {
    render(<SistemaPage />);
    await waitFor(() => screen.getByRole('button', { name: /sair/i }));

    fireEvent.click(screen.getByRole('button', { name: /sair/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    });
  });
});
