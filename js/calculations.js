import { getSummary } from './data.js';

export function displaySummary() {
    const summary = getSummary();
    const summaryText = `
    Income: $${summary.income}
    Expenses: $${summary.expenses}
    Savings: $${summary.savings}
    `;
    document.getElementById('summary').textContent = summaryText;
}

export async function fetchStockRecommendations(pricePerShare, sharesToBuy) {
    try {
        const response = await fetch('https://financialmodelingprep.com/api/v3/stock/list?apikey=1dXWn85IV0j7Ne6x0tS79xpSgaOw4ncH');
        const data = await response.json();

        const { income, expenses, savings } = getSummary();
        const disposableIncome = income - expenses;
        const availableFunds = disposableIncome + savings;

        console.log("Disposable Income:", disposableIncome);
        console.log("Available Funds:", availableFunds);

        const filteredStocks = data
            .filter(stock => stock.price * sharesToBuy <= availableFunds)
            .slice(0, 10);

        if (filteredStocks.length === 0) {
            const priceRange = 5;
            filteredStocks.push(
                ...data.filter(stock => stock.price >= pricePerShare - priceRange && stock.price <= pricePerShare + priceRange)
                    .filter(stock => stock.price * sharesToBuy <= availableFunds)
                    .slice(0, 10)
            );
        }

        return filteredStocks.map(stock => {
            const totalCost = stock.price * sharesToBuy;

            return {
                name: stock.name,
                symbol: stock.symbol,
                price: stock.price,
                sharesToBuy,
                totalCost
            };
        });
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return [];
    }
}
