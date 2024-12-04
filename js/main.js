import { addIncome, addExpense, addSavings, getSummary } from './data.js';
import { displaySummary, fetchStockRecommendations } from './calculations.js';

document.getElementById('addEntry').addEventListener('click', () => {
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (type === 'income') {
        addIncome(amount);
        alert(`Income of $${amount} added successfully.`);
    } else if (type === 'expense') {
        addExpense(amount);
        alert(`Expense of $${amount} added successfully.`);
    } else if (type === 'savings') {
        addSavings(amount);
        alert(`Savings of $${amount} added successfully.`);
    }
});

document.getElementById('displaySummary').addEventListener('click', displaySummary);

document.getElementById('getStocks').addEventListener('click', async () => {
    const pricePerShare = parseFloat(document.getElementById('pricePerShare').value);
    const sharesToBuy = parseInt(document.getElementById('sharesToBuy').value);

    if (isNaN(pricePerShare) || pricePerShare <= 0 || isNaN(sharesToBuy) || sharesToBuy <= 0) {
        alert('Please enter valid values for price per share and number of shares.');
        return;
    }

    const stocks = await fetchStockRecommendations(pricePerShare, sharesToBuy);
    const stockList = document.getElementById('stocks');
    stockList.innerHTML = '';

    if (stocks.length > 0) {
        stocks.forEach(stock => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${stock.name} (${stock.symbol}) - Price: $${stock.price} 
            <br>Shares you can buy: ${stock.sharesToBuy} 
            <br>Total cost: $${stock.totalCost.toFixed(2)}`;
            stockList.appendChild(listItem);
        });
    } else {
        stockList.textContent = 'No stocks match your criteria.';
    }
});
