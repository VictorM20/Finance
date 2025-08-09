import React, { useState, useEffect } from 'react';

// Componente do Dashboard Principal
export const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(8547.32);
  const [monthlyIncome, setMonthlyIncome] = useState(5200.00);
  const [monthlyExpenses, setMonthlyExpenses] = useState(3847.68);
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');

  const categories = [
    { name: 'Alimentação', amount: 890.50, color: '#FF6B6B', percentage: 23 },
    { name: 'Transporte', amount: 450.30, color: '#4ECDC4', percentage: 12 },
    { name: 'Moradia', amount: 1500.00, color: '#45B7D1', percentage: 39 },
    { name: 'Lazer', amount: 320.88, color: '#96CEB4', percentage: 8 },
    { name: 'Saúde', amount: 286.00, color: '#FECA57', percentage: 7 },
    { name: 'Outros', amount: 400.00, color: '#FF9FF3', percentage: 11 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Olá, João!</h1>
              <p className="text-gray-600">Aqui está um resumo das suas finanças</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Saldo atual</p>
              <p className="text-3xl font-bold text-green-600">R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Receitas do Mês</p>
                <p className="text-2xl font-bold text-green-600">R$ {monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-green-500 mt-1">↗ +12% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Despesas do Mês</p>
                <p className="text-2xl font-bold text-red-600">R$ {monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-red-500 mt-1">↗ +5% vs mês anterior</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Economia</p>
                <p className="text-2xl font-bold text-blue-600">R$ {(monthlyIncome - monthlyExpenses).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-blue-500 mt-1">26% do total</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Gastos por Categoria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Gastos por Categoria</h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-gray-700">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">R$ {category.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p className="text-sm text-gray-500">{category.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Metas Financeiras</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Viagem Férias</span>
                  <span className="text-sm text-gray-500">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">R$ 3.500 de R$ 5.000</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Emergência</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">R$ 4.500 de R$ 10.000</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Apartamento</span>
                  <span className="text-sm text-gray-500">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">R$ 15.000 de R$ 100.000</p>
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Transações</h1>
            <button 
              onClick={() => setShowAddTransaction(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              + Nova Transação
            </button>
          </div>
        </div>

        {/* Lista de Transações */}
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="p-6">
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
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
                      <p className="font-semibold text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category} • {transaction.account}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}R$ {Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de Nova Transação */}
        {showAddTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Nova Transação</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Supermercado"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0,00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="expense">Despesa</option>
                    <option value="income">Receita</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="alimentacao">Alimentação</option>
                    <option value="transporte">Transporte</option>
                    <option value="moradia">Moradia</option>
                    <option value="lazer">Lazer</option>
                    <option value="saude">Saúde</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button 
                    type="button"
                    onClick={() => setShowAddTransaction(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Salvar
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
  const goals = [
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Metas Financeiras</h1>
              <p className="text-gray-600">Acompanhe o progresso dos seus objetivos</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
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
              <div key={goal.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${goal.color}20` }}>
                    <svg className="w-6 h-6" style={{ color: goal.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{goal.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{goal.name}</h3>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Progresso</span>
                    <span className="text-xs font-semibold text-gray-700">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300" 
                      style={{ backgroundColor: goal.color, width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Atual:</span>
                    <span className="font-semibold text-gray-800">R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Meta:</span>
                    <span className="font-semibold text-gray-800">R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Faltam:</span>
                    <span className="font-semibold text-red-600">R$ {remaining.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Prazo:</span>
                    <span className="font-semibold text-gray-800">{daysRemaining} dias</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Adicionar Valor
                </button>
              </div>
            );
          })}
        </div>
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
              <p className="text-gray-600">Análise detalhada das suas finanças</p>
            </div>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Receitas</p>
                <p className="text-2xl font-bold text-green-600">R$ 31.800</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Despesas</p>
                <p className="text-2xl font-bold text-red-600">R$ 23.547</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Economia Total</p>
                <p className="text-2xl font-bold text-blue-600">R$ 8.253</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de Economia</p>
                <p className="text-2xl font-bold text-purple-600">26%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Evolução */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Evolução Mensal</h3>
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
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Receitas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Despesas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Menu Lateral
export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'transactions', name: 'Transações', icon: '💳' },
    { id: 'goals', name: 'Metas', icon: '🎯' },
    { id: 'reports', name: 'Relatórios', icon: '📈' }
  ];

  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Mobills</h1>
            <p className="text-xs text-gray-500">Controle Financeiro</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
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