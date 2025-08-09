import React, { useState, useEffect, createContext, useContext } from 'react';

// Context para o Dark Mode
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// Componente de Login
export const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular autenticação
    setTimeout(() => {
      if (email && password) {
        onLogin({
          id: 1,
          name: 'João Silva',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=face&fit=crop&w=100&h=100'
        });
      } else {
        alert('Por favor, preencha email e senha');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo ao Mobills</h1>
          <p className="text-gray-600">Entre na sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Entrando...
              </div>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem conta?{' '}
            <button 
              onClick={onSwitchToRegister}
              className="text-blue-600 font-medium hover:text-blue-500"
            >
              Cadastre-se gratuitamente
            </button>
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Ao entrar, você concorda com nossos{' '}
            <a href="#" className="text-blue-600">Termos de Uso</a> e{' '}
            <a href="#" className="text-blue-600">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente de Cadastro
export const Register = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpar erro do campo quando começar a digitar
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simular registro
    setTimeout(() => {
      onRegister({
        id: 1,
        name: formData.name,
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=face&fit=crop&w=100&h=100',
        plan: 'Free'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Crie sua conta</h1>
          <p className="text-gray-600">Comece a controlar suas finanças hoje</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Seu nome completo"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="seu@email.com"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Mínimo 6 caracteres"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar senha</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite a senha novamente"
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" required />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Concordo com os{' '}
              <a href="#" className="text-green-600 hover:text-green-500">Termos de Uso</a> e{' '}
              <a href="#" className="text-green-600 hover:text-green-500">Política de Privacidade</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Criando conta...
              </div>
            ) : (
              'Criar conta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Já tem uma conta?{' '}
            <button 
              onClick={onSwitchToLogin}
              className="text-green-600 font-medium hover:text-green-500"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente do Dashboard Principal
export const Dashboard = () => {
  // Estados para transações e cartões
  const [transactions, setTransactions] = useState([
    { id: 1, description: 'Salário', amount: 5200.00, type: 'income', category: 'Salário', date: '2024-01-01' },
    { id: 2, description: 'Supermercado Extra', amount: -185.50, type: 'expense', category: 'Alimentação', date: '2024-01-03' },
    { id: 3, description: 'Combustível', amount: -120.00, type: 'expense', category: 'Transporte', date: '2024-01-05' },
    { id: 4, description: 'Aluguel', amount: -1500.00, type: 'expense', category: 'Moradia', date: '2024-01-05' },
    { id: 5, description: 'Freelance', amount: 800.00, type: 'income', category: 'Renda Extra', date: '2024-01-07' }
  ]);

  const [creditCards, setCreditCards] = useState([
    { id: 1, name: 'Nubank Roxinho', limit: 5000, used: 2150.50, dueDate: '2024-02-15', invoice: 2150.50 },
    { id: 2, name: 'Inter Gold', limit: 8000, used: 3200.75, dueDate: '2024-02-20', invoice: 3200.75 },
    { id: 3, name: 'C6 Carbon', limit: 12000, used: 1850.30, dueDate: '2024-02-25', invoice: 1850.30 }
  ]);

  // Calcular valores baseados nas transações reais
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));
  
  const totalBalance = monthlyIncome - monthlyExpenses + 2000; // Base inicial
  
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [marketData, setMarketData] = useState({
    usd: { value: 5.25, change: 0.8, updated: '12:34' },
    eur: { value: 5.89, change: -0.3, updated: '12:34' },
    btc: { value: 248500, change: 2.4, updated: '12:34' },
    selic: { value: 10.75, change: 0.0, updated: 'Jan/24' },
    ipca: { value: 4.23, change: 0.1, updated: 'Dez/23' }
  });

  // Simular atualização de cotações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => ({
        ...prev,
        usd: {
          ...prev.usd,
          value: prev.usd.value + (Math.random() - 0.5) * 0.1,
          change: prev.usd.change + (Math.random() - 0.5) * 0.2,
          updated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        },
        eur: {
          ...prev.eur,
          value: prev.eur.value + (Math.random() - 0.5) * 0.1,
          change: prev.eur.change + (Math.random() - 0.5) * 0.2,
          updated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        },
        btc: {
          ...prev.btc,
          value: prev.btc.value + (Math.random() - 0.5) * 5000,
          change: prev.btc.change + (Math.random() - 0.5) * 1,
          updated: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }
      }));
    }, 10000); // Atualizar a cada 10 segundos

    return () => clearInterval(interval);
  }, []);

  const categories = [
    { name: 'Alimentação', amount: 890.50, color: '#FF6B6B', percentage: 23 },
    { name: 'Transporte', amount: 450.30, color: '#4ECDC4', percentage: 12 },
    { name: 'Moradia', amount: 1500.00, color: '#45B7D1', percentage: 39 },
    { name: 'Lazer', amount: 320.88, color: '#96CEB4', percentage: 8 },
    { name: 'Saúde', amount: 286.00, color: '#FECA57', percentage: 7 },
    { name: 'Outros', amount: 400.00, color: '#FF9FF3', percentage: 11 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Olá, João!</h1>
              <p className="text-gray-600 dark:text-gray-300">Aqui está um resumo das suas finanças</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Saldo atual</p>
              <p className="text-3xl font-bold text-green-600">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Mercado Financeiro</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Tempo Real</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">USD/BRL</p>
              <p className="text-lg font-bold dark:text-white">R$ {marketData.usd.value.toFixed(2)}</p>
              <div className="flex items-center justify-center space-x-1">
                <p className={`text-xs ${marketData.usd.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.usd.change >= 0 ? '↗' : '↘'} {Math.abs(marketData.usd.change).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{marketData.usd.updated}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">EUR/BRL</p>
              <p className="text-lg font-bold dark:text-white">R$ {marketData.eur.value.toFixed(2)}</p>
              <div className="flex items-center justify-center space-x-1">
                <p className={`text-xs ${marketData.eur.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.eur.change >= 0 ? '↗' : '↘'} {Math.abs(marketData.eur.change).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{marketData.eur.updated}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bitcoin</p>
              <p className="text-lg font-bold dark:text-white">R$ {Math.round(marketData.btc.value).toLocaleString('pt-BR')}</p>
              <div className="flex items-center justify-center space-x-1">
                <p className={`text-xs ${marketData.btc.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.btc.change >= 0 ? '↗' : '↘'} {Math.abs(marketData.btc.change).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{marketData.btc.updated}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">SELIC</p>
              <p className="text-lg font-bold dark:text-white">{marketData.selic.value}%</p>
              <div className="flex items-center justify-center space-x-1">
                <p className={`text-xs ${marketData.selic.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.selic.change >= 0 ? '↗' : '↘'} {Math.abs(marketData.selic.change).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{marketData.selic.updated}</p>
            </div>
            <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">IPCA</p>
              <p className="text-lg font-bold dark:text-white">{marketData.ipca.value}%</p>
              <div className="flex items-center justify-center space-x-1">
                <p className={`text-xs ${marketData.ipca.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.ipca.change >= 0 ? '↗' : '↘'} {Math.abs(marketData.ipca.change).toFixed(1)}%
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{marketData.ipca.updated}</p>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Receitas do Mês</p>
                <p className="text-2xl font-bold text-green-600">R$ {monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-green-500 mt-1">↗ +12% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Despesas do Mês</p>
                <p className="text-2xl font-bold text-red-600">R$ {monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-red-500 mt-1">↗ +5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Economia</p>
                <p className="text-2xl font-bold text-blue-600">R$ {(monthlyIncome - monthlyExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-blue-500 mt-1">26% do total</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Gastos por Categoria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Gastos por Categoria</h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-white">R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Metas Financeiras</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Viagem Férias</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">70%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">R$ 3.500 de R$ 5.000</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Emergência</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">45%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">R$ 4.500 de R$ 10.000</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Apartamento</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">15%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">R$ 15.000 de R$ 100.000</p>
              </div>
            </div>
          </div>

          {/* Nova seção: Cartões de Crédito */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Cartões de Crédito</h3>
            <div className="space-y-4">
              {creditCards.map((card, index) => {
                const daysUntilDue = Math.ceil((new Date(card.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                const usagePercentage = (card.used / card.limit) * 100;
                
                return (
                  <div key={card.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{card.name}</h4>
                      <span className={`text-sm font-medium ${daysUntilDue <= 5 ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'}`}>
                        Vence em {daysUntilDue} dias
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Limite: R$ {card.limit.toLocaleString('pt-BR')}</span>
                        <span className="text-gray-600 dark:text-gray-400">{usagePercentage.toFixed(1)}% usado</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${usagePercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fatura: </span>
                        <span className="font-semibold text-red-600">R$ {card.invoice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Vencimento: </span>
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {new Date(card.dueDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resumo das Últimas Transações */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Últimas Transações</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {transactions.length} transações este mês
            </span>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900 text-green-600' : 'bg-red-100 dark:bg-red-900 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '↗' : '↘'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{transaction.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category} • {new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
                <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Cartões de Crédito
export const CreditCards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Nubank Roxinho',
      number: '**** **** **** 1234',
      limit: 5000,
      used: 2150.50,
      available: 2849.50,
      dueDate: '2024-02-15',
      brand: 'Mastercard',
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: 2,
      name: 'Inter Gold',
      number: '**** **** **** 5678',
      limit: 8000,
      used: 3200.75,
      available: 4799.25,
      dueDate: '2024-02-20',
      brand: 'Visa',
      color: 'from-orange-500 to-orange-700'
    },
    {
      id: 3,
      name: 'C6 Carbon',
      number: '**** **** **** 9012',
      limit: 12000,
      used: 1850.30,
      available: 10149.70,
      dueDate: '2024-02-25',
      brand: 'Mastercard',
      color: 'from-gray-800 to-black'
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    limit: '',
    dueDate: ''
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.name || !newCard.number || !newCard.limit || !newCard.dueDate) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const card = {
      id: cards.length + 1,
      name: newCard.name,
      number: newCard.number,
      limit: parseFloat(newCard.limit),
      used: 0,
      available: parseFloat(newCard.limit),
      dueDate: newCard.dueDate,
      brand: 'Mastercard',
      color: 'from-blue-600 to-blue-800'
    };

    setCards([...cards, card]);
    setShowAddCard(false);
    setNewCard({ name: '', number: '', limit: '', dueDate: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const totalUsed = cards.reduce((sum, card) => sum + card.used, 0);
  const totalAvailable = totalLimit - totalUsed;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Cartões de Crédito</h1>
              <p className="text-gray-600 dark:text-gray-300">Gerencie seus cartões e faturas</p>
            </div>
            <button 
              onClick={() => setShowAddCard(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              + Novo Cartão
            </button>
          </div>
        </div>

        {/* Resumo dos Cartões */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Limite Total</p>
                <p className="text-2xl font-bold text-blue-600">R$ {totalLimit.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Usado</p>
                <p className="text-2xl font-bold text-red-600">R$ {totalUsed.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 0h10a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V9z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Disponível</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalAvailable.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Cartões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const usagePercentage = (card.used / card.limit) * 100;
            const daysUntilDue = Math.ceil((new Date(card.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={card.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Card Visual */}
                <div className={`bg-gradient-to-br ${card.color} p-6 text-white relative`}>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-sm opacity-80">Cartão</p>
                      <p className="font-bold text-lg">{card.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80">{card.brand}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-xl font-mono tracking-wider">{card.number}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs opacity-80">Limite</p>
                      <p className="font-semibold">R$ {card.limit.toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80">Vencimento</p>
                      <p className="font-semibold">{new Date(card.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</p>
                    </div>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Fatura Atual</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">{usagePercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${usagePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Usado:</span>
                      <span className="font-semibold text-red-600">R$ {card.used.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Disponível:</span>
                      <span className="font-semibold text-green-600">R$ {card.available.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Vence em:</span>
                      <span className={`font-semibold ${daysUntilDue <= 5 ? 'text-red-600' : 'text-gray-800 dark:text-white'}`}>
                        {daysUntilDue} dias
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-50 dark:bg-blue-900 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                      Ver Fatura
                    </button>
                    <button className="flex-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      Bloquear
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal de Novo Cartão */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Adicionar Cartão</h2>
              
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Nome do Cartão</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newCard.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Nubank Roxinho"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Número do Cartão</label>
                  <input 
                    type="text" 
                    name="number"
                    value={newCard.number}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="**** **** **** 0000"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Limite</label>
                  <input 
                    type="number" 
                    name="limit"
                    value={newCard.limit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="5000"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Vencimento da Fatura</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    value={newCard.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Investimentos
export const Investments = () => {
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      name: 'Tesouro SELIC 2029',
      type: 'Renda Fixa',
      amount: 15000,
      currentValue: 15850,
      yieldValue: 5.67,
      allocation: 35,
      color: '#4ECDC4'
    },
    {
      id: 2,
      name: 'ITSA4',
      type: 'Ações',
      amount: 8000,
      currentValue: 9200,
      yieldValue: 15.0,
      allocation: 22,
      color: '#45B7D1'
    },
    {
      id: 3,
      name: 'MXRF11',
      type: 'FII',
      amount: 6000,
      currentValue: 6480,
      yieldValue: 8.0,
      allocation: 15,
      color: '#96CEB4'
    },
    {
      id: 4,
      name: 'Bitcoin',
      type: 'Crypto',
      amount: 5000,
      currentValue: 7500,
      yieldValue: 50.0,
      allocation: 18,
      color: '#FF6B6B'
    },
    {
      id: 5,
      name: 'Poupança',
      type: 'Renda Fixa',
      amount: 4000,
      currentValue: 4120,
      yieldValue: 3.0,
      allocation: 10,
      color: '#FECA57'
    }
  ]);

  const [showAddInvestment, setShowAddInvestment] = useState(false);
  const [newInvestment, setNewInvestment] = useState({
    name: '',
    type: 'Renda Fixa',
    amount: '',
    currentValue: ''
  });

  const totalInvested = portfolio.reduce((sum, item) => sum + item.amount, 0);
  const totalCurrent = portfolio.reduce((sum, item) => sum + item.currentValue, 0);
  const totalYield = ((totalCurrent - totalInvested) / totalInvested) * 100;

  const handleAddInvestment = (e) => {
    e.preventDefault();
    if (!newInvestment.name || !newInvestment.amount || !newInvestment.currentValue) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const amount = parseFloat(newInvestment.amount);
    const currentValue = parseFloat(newInvestment.currentValue);
    const yieldValue = ((currentValue - amount) / amount) * 100;

    const investment = {
      id: portfolio.length + 1,
      name: newInvestment.name,
      type: newInvestment.type,
      amount: amount,
      currentValue: currentValue,
      yieldValue: yieldValue,
      allocation: Math.round((currentValue / (totalCurrent + currentValue)) * 100),
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };

    setPortfolio([...portfolio, investment]);
    setShowAddInvestment(false);
    setNewInvestment({ name: '', type: 'Renda Fixa', amount: '', currentValue: '' });
  };

  const handleInvestmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvestment(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Investimentos</h1>
              <p className="text-gray-600 dark:text-gray-300">Acompanhe sua carteira de investimentos</p>
            </div>
            <button 
              onClick={() => setShowAddInvestment(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              + Novo Investimento
            </button>
          </div>
        </div>

        {/* Resumo da Carteira */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Investido</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">R$ {totalInvested.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Valor Atual</p>
                <p className="text-2xl font-bold text-green-600">R$ {totalCurrent.toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Lucro/Prejuízo</p>
                <p className="text-2xl font-bold text-green-600">R$ {(totalCurrent - totalInvested).toLocaleString('pt-BR')}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Rentabilidade</p>
                <p className="text-2xl font-bold text-green-600">{totalYield.toFixed(2)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Distribuição da Carteira */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Distribuição da Carteira</h3>
            <div className="space-y-4">
              {portfolio.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: investment.color }}></div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{investment.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{investment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800 dark:text-white">{investment.allocation}%</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">R$ {investment.currentValue.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Performance Individual</h3>
            <div className="space-y-4">
              {portfolio.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{investment.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{investment.type}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${investment.yieldValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investment.yieldValue >= 0 ? '+' : ''}{investment.yieldValue.toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">R$ {investment.currentValue.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de Novo Investimento */}
        {showAddInvestment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Adicionar Investimento</h2>
              
              <form onSubmit={handleAddInvestment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Nome do Investimento</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newInvestment.name}
                    onChange={handleInvestmentInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Tesouro SELIC 2029"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Tipo</label>
                  <select 
                    name="type"
                    value={newInvestment.type}
                    onChange={handleInvestmentInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Renda Fixa">Renda Fixa</option>
                    <option value="Ações">Ações</option>
                    <option value="FII">FII</option>
                    <option value="Crypto">Crypto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Valor Investido</label>
                  <input 
                    type="number" 
                    name="amount"
                    value={newInvestment.amount}
                    onChange={handleInvestmentInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="15000"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Valor Atual</label>
                  <input 
                    type="number" 
                    name="currentValue"
                    value={newInvestment.currentValue}
                    onChange={handleInvestmentInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="15850"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddInvestment(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Perfil
export const Profile = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: '(11) 99999-9999',
    birthDate: '1990-05-15',
    cpf: '123.456.789-00',
    address: 'São Paulo, SP'
  });

  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSave = () => {
    setIsEditing(false);
    // Aqui salvaria os dados
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {user.plan}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  Ativo
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações Pessoais */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Informações Pessoais</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Nome Completo</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Telefone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Data de Nascimento</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={userData.birthDate}
                    onChange={(e) => setUserData({...userData, birthDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{new Date(userData.birthDate).toLocaleDateString('pt-BR')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">CPF</label>
                <p className="text-gray-800 dark:text-white">{userData.cpf}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Endereço</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({...userData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{userData.address}</p>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Salvar Alterações
                </button>
              )}
            </div>
          </div>

          {/* Configurações e Estatísticas */}
          <div className="space-y-6">
            {/* Plano */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Plano Atual</h3>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                <h4 className="font-bold text-lg">Mobills Premium</h4>
                <p className="text-sm opacity-90 mt-1">Acesso completo a todas as funcionalidades</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm">Próxima cobrança: 15/02/2024</span>
                  <span className="font-bold">R$ 9,90/mês</span>
                </div>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Suas Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Membro desde</span>
                  <span className="font-semibold dark:text-white">Janeiro 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Transações registradas</span>
                  <span className="font-semibold dark:text-white">1.247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Economia total</span>
                  <span className="font-semibold text-green-600">R$ 24.850</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Metas alcançadas</span>
                  <span className="font-semibold dark:text-white">12/18</span>
                </div>
              </div>
            </div>

            {/* Configurações */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Configurações</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Notificações push</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Emails promocionais</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Sincronização automática</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Modo escuro</span>
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Transações
export const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salário',
      amount: 5200.00,
      type: 'income',
      category: 'Salário',
      date: '2024-01-01',
      account: 'Conta Corrente'
    },
    {
      id: 2,
      description: 'Supermercado Extra',
      amount: -185.50,
      type: 'expense',
      category: 'Alimentação',
      date: '2024-01-03',
      account: 'Cartão Crédito'
    },
    {
      id: 3,
      description: 'Combustível',
      amount: -120.00,
      type: 'expense',
      category: 'Transporte',
      date: '2024-01-05',
      account: 'Conta Corrente'
    },
    {
      id: 4,
      description: 'Aluguel',
      amount: -1500.00,
      type: 'expense',
      category: 'Moradia',
      date: '2024-01-05',
      account: 'Conta Corrente'
    },
    {
      id: 5,
      description: 'Freelance',
      amount: 800.00,
      type: 'income',
      category: 'Renda Extra',
      date: '2024-01-07',
      account: 'Conta Corrente'
    },
    {
      id: 6,
      description: 'Cinema',
      amount: -45.00,
      type: 'expense',
      category: 'Lazer',
      date: '2024-01-08',
      account: 'Cartão Débito'
    }
  ]);

  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'alimentacao',
    account: 'Conta Corrente',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddTransaction = (e) => {
    e.preventDefault(); // Prevenir reload da página
    
    if (!newTransaction.description || !newTransaction.amount) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const transaction = {
      id: transactions.length + 1,
      description: newTransaction.description,
      amount: newTransaction.type === 'income' ? 
        parseFloat(newTransaction.amount) : 
        -parseFloat(newTransaction.amount),
      type: newTransaction.type,
      category: getCategoryName(newTransaction.category),
      date: newTransaction.date,
      account: newTransaction.account
    };

    setTransactions([transaction, ...transactions]);
    setShowAddTransaction(false);
    
    // Resetar formulário
    setNewTransaction({
      description: '',
      amount: '',
      type: 'expense',
      category: 'alimentacao',
      account: 'Conta Corrente',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const getCategoryName = (category) => {
    const categories = {
      'alimentacao': 'Alimentação',
      'transporte': 'Transporte',
      'moradia': 'Moradia',
      'lazer': 'Lazer',
      'saude': 'Saúde',
      'educacao': 'Educação',
      'salario': 'Salário',
      'freelance': 'Freelance',
      'outros': 'Outros'
    };
    return categories[category] || 'Outros';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Transações</h1>
              <p className="text-gray-600 dark:text-gray-300">Total de {transactions.length} transações</p>
            </div>
            <button 
              onClick={() => setShowAddTransaction(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              + Nova Transação
            </button>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="p-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                    }`}>
                      {transaction.type === 'income' ? (
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{transaction.description}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.category} • {transaction.account}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de Nova Transação */}
        {showAddTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Nova Transação</h2>
              
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Descrição *</label>
                  <input 
                    type="text"
                    name="description"
                    value={newTransaction.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Supermercado, Salário, etc."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Valor *</label>
                  <input 
                    type="number"
                    name="amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Tipo</label>
                  <select 
                    name="type"
                    value={newTransaction.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="expense">💸 Despesa</option>
                    <option value="income">💰 Receita</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Categoria</label>
                  <select 
                    name="category"
                    value={newTransaction.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {newTransaction.type === 'expense' ? (
                      <>
                        <option value="alimentacao">🍔 Alimentação</option>
                        <option value="transporte">🚗 Transporte</option>
                        <option value="moradia">🏠 Moradia</option>
                        <option value="lazer">🎮 Lazer</option>
                        <option value="saude">💊 Saúde</option>
                        <option value="educacao">📚 Educação</option>
                        <option value="outros">📦 Outros</option>
                      </>
                    ) : (
                      <>
                        <option value="salario">💼 Salário</option>
                        <option value="freelance">💻 Freelance</option>
                        <option value="outros">💰 Outros</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Conta</label>
                  <select 
                    name="account"
                    value={newTransaction.account}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Conta Corrente">🏦 Conta Corrente</option>
                    <option value="Poupança">💰 Poupança</option>
                    <option value="Cartão Crédito">💳 Cartão Crédito</option>
                    <option value="Cartão Débito">💎 Cartão Débito</option>
                    <option value="Dinheiro">💵 Dinheiro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Data</label>
                  <input 
                    type="date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddTransaction(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    💾 Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Metas
export const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Viagem para Europa',
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: '2024-12-31',
      category: 'Viagem',
      color: '#4ECDC4'
    },
    {
      id: 2,
      name: 'Reserva de Emergência',
      targetAmount: 30000,
      currentAmount: 18000,
      deadline: '2024-06-30',
      category: 'Emergência',
      color: '#45B7D1'
    },
    {
      id: 3,
      name: 'Carro Novo',
      targetAmount: 80000,
      currentAmount: 25000,
      deadline: '2025-03-31',
      category: 'Veículo',
      color: '#96CEB4'
    }
  ]);

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: 'Viagem'
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const goal = {
      id: goals.length + 1,
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: parseFloat(newGoal.currentAmount) || 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    };

    setGoals([...goals, goal]);
    setShowAddGoal(false);
    setNewGoal({ name: '', targetAmount: '', currentAmount: '', deadline: '', category: 'Viagem' });
  };

  const handleGoalInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Metas Financeiras</h1>
              <p className="text-gray-600 dark:text-gray-300">Acompanhe o progresso dos seus objetivos</p>
            </div>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              + Nova Meta
            </button>
          </div>
        </div>

        {/* Lista de Metas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            const remaining = goal.targetAmount - goal.currentAmount;
            const daysRemaining = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
            
            return (
              <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${goal.color}20` }}>
                    <svg className="w-6 h-6" style={{ color: goal.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">{goal.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{goal.name}</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Progresso</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300" 
                      style={{ backgroundColor: goal.color, width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Atual:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Meta:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Faltam:</span>
                    <span className="font-semibold text-red-600">R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Prazo:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{daysRemaining} dias</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Adicionar Valor
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal de Nova Meta */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Adicionar Meta</h2>
              
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Nome da Meta</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newGoal.name}
                    onChange={handleGoalInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Ex: Viagem para Europa"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Categoria</label>
                  <select 
                    name="category"
                    value={newGoal.category}
                    onChange={handleGoalInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="Viagem">Viagem</option>
                    <option value="Emergência">Emergência</option>
                    <option value="Veículo">Veículo</option>
                    <option value="Casa">Casa</option>
                    <option value="Educação">Educação</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Valor Alvo</label>
                  <input 
                    type="number" 
                    name="targetAmount"
                    value={newGoal.targetAmount}
                    onChange={handleGoalInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="15000"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Valor Atual (opcional)</label>
                  <input 
                    type="number" 
                    name="currentAmount"
                    value={newGoal.currentAmount}
                    onChange={handleGoalInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Prazo</label>
                  <input 
                    type="date" 
                    name="deadline"
                    value={newGoal.deadline}
                    onChange={handleGoalInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Relatórios
export const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  
  const monthlyData = [
    { month: 'Jan', income: 5200, expenses: 3800 },
    { month: 'Fev', income: 5200, expenses: 4100 },
    { month: 'Mar', income: 5400, expenses: 3900 },
    { month: 'Abr', income: 5200, expenses: 4200 },
    { month: 'Mai', income: 5600, expenses: 3700 },
    { month: 'Jun', income: 5200, expenses: 3847 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Relatórios</h1>
              <p className="text-gray-600 dark:text-gray-300">Análise detalhada das suas finanças</p>
            </div>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="thisMonth">Este mês</option>
              <option value="lastMonth">Mês passado</option>
              <option value="last3Months">Últimos 3 meses</option>
              <option value="thisYear">Este ano</option>
            </select>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Receitas</p>
                <p className="text-2xl font-bold text-green-600">R$ 31.800</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Despesas</p>
                <p className="text-2xl font-bold text-red-600">R$ 23.547</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Economia Total</p>
                <p className="text-2xl font-bold text-blue-600">R$ 8.253</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Economia</p>
                <p className="text-2xl font-bold text-purple-600">26%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Evolução Mensal</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center space-y-1">
                  <div 
                    className="w-full bg-green-500 rounded-t" 
                    style={{ height: `${(data.income / 6000) * 200}px` }}
                  ></div>
                  <div 
                    className="w-full bg-red-500 rounded-b" 
                    style={{ height: `${(data.expenses / 6000) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Despesas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Menu Lateral
export const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'transactions', name: 'Transações', icon: '💳' },
    { id: 'creditcards', name: 'Cartões', icon: '💎' },
    { id: 'investments', name: 'Investimentos', icon: '📈' },
    { id: 'goals', name: 'Metas', icon: '🎯' },
    { id: 'reports', name: 'Relatórios', icon: '📋' },
    { id: 'profile', name: 'Perfil', icon: '👤' }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-full shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Mobills</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Controle Financeiro</p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-6">
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=face&fit=crop&w=40&h=40'}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.plan || 'Free'}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-bold mb-1">Mobills Premium</h3>
          <p className="text-xs opacity-90 mb-3">Desbloqueie recursos avançados</p>
          <button className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};