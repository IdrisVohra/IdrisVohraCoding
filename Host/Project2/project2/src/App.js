// BudgetApp.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'food'
  });
  const [budget, setBudget] = useState(1000);

  const categories = {
    expense: ['food', 'shopping', 'entertainment', 'transport', 'bills'],
    income: ['salary', 'freelance', 'investment', 'gift']
  };

  const colors = {
    expense: {
      food: '#ef4444',
      shopping: '#f59e0b',
      entertainment: '#8b5cf6',
      transport: '#06b6d4',
      bills: '#64748b'
    },
    income: {
      salary: '#10b981',
      freelance: '#84cc16',
      investment: '#6366f1',
      gift: '#ec4899'
    }
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (newTransaction.description.trim() && newTransaction.amount) {
      const transaction = {
        id: Date.now(),
        description: newTransaction.description,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        category: newTransaction.category,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setTransactions([transaction, ...transactions]);
      setNewTransaction({ description: '', amount: '', type: 'expense', category: 'food' });
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const budgetProgress = Math.min((totalExpenses / budget) * 100, 100);

  const getCategoryTotals = () => {
    const totals = {};
    Object.values(categories).flat().forEach(cat => {
      totals[cat] = transactions
        .filter(t => t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0);
    });
    return totals;
  };

  return (
    <div className="budget-app">
      <div className="budget-container">
        <header className="budget-header">
          <h1>💰 Budget Tracker</h1>
          <p>Track your finances in real-time</p>
        </header>

        {/* Financial Overview */}
        <div className="overview-cards">
          <div className="overview-card balance">
            <h3>Current Balance</h3>
            <div className="amount" style={{ color: balance >= 0 ? '#10b981' : '#ef4444' }}>
              ${balance.toFixed(2)}
            </div>
          </div>
          
          <div className="overview-card income">
            <h3>Total Income</h3>
            <div className="amount">+${totalIncome.toFixed(2)}</div>
          </div>
          
          <div className="overview-card expenses">
            <h3>Total Expenses</h3>
            <div className="amount">-${totalExpenses.toFixed(2)}</div>
          </div>
          
          <div className="overview-card budget-card">
            <h3>Monthly Budget</h3>
            <div className="budget-controls">
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                className="budget-input"
              />
              <span>${budget.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Budget Progress */}
        <div className="budget-progress">
          <div className="progress-header">
            <span>Budget Usage</span>
            <span>{totalExpenses.toFixed(2)} / {budget.toFixed(2)}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${budgetProgress}%`,
                backgroundColor: budgetProgress > 80 ? '#ef4444' : budgetProgress > 60 ? '#f59e0b' : '#10b981'
              }}
            ></div>
          </div>
        </div>

        {/* Add Transaction Form */}
        <form onSubmit={addTransaction} className="transaction-form">
          <input
            type="text"
            placeholder="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
            className="form-input"
          />
          
          <input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
            className="form-input"
            step="0.01"
          />

          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({
              ...newTransaction, 
              type: e.target.value,
              category: categories[e.target.value][0]
            })}
            className="form-select"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <select
            value={newTransaction.category}
            onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
            className="form-select"
          >
            {categories[newTransaction.type].map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <button type="submit" className="add-transaction-btn">
            Add {newTransaction.type === 'income' ? 'Income' : 'Expense'}
          </button>
        </form>

        {/* Category Breakdown */}
        <div className="category-breakdown">
          <h3>Spending by Category</h3>
          <div className="category-bars">
            {categories.expense.map(category => {
              const total = getCategoryTotals()[category];
              const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
              
              return (
                <div key={category} className="category-bar">
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-amount">${total.toFixed(2)}</span>
                  </div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors.expense[category]
                      }}
                    ></div>
                  </div>
                  <span className="category-percentage">{percentage.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transactions List */}
        <div className="transactions-section">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {transactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-main">
                  <div 
                    className="transaction-color"
                    style={{ backgroundColor: colors[transaction.type][transaction.category] }}
                  ></div>
                  <div className="transaction-details">
                    <h4>{transaction.description}</h4>
                    <div className="transaction-meta">
                      <span className={`category-tag ${transaction.category}`}>
                        {transaction.category}
                      </span>
                      <span className="transaction-date">{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div className="transaction-amount">
                  <span style={{ color: transaction.type === 'income' ? '#10b981' : '#ef4444' }}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => deleteTransaction(transaction.id)}
                    className="delete-transaction-btn"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            
            {transactions.length === 0 && (
              <div className="empty-transactions">
                <p>No transactions yet. Add your first transaction!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;