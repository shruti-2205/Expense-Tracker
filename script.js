

document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const monthlyTotal = document.getElementById("monthly-total");
    const yearlyTotal = document.getElementById("yearly-total");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotals();

        expenseForm.reset();
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            expenses = expenses.filter(expense => expense.id !== id);
            displayExpenses(expenses);
            updateTotals();
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
    });

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="delete-btn" data-id="${expense.id}">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
        });
    }

    function updateTotals() {
        let total = 0;
        let monthlyTotalValue = 0;
        let yearlyTotalValue = 0;
        
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        expenses.forEach(expense => {
            total += expense.amount;
            const expenseDate = new Date(expense.date);
            if (expenseDate.getMonth() + 1 === currentMonth) {
                monthlyTotalValue += expense.amount;
            }
            if (expenseDate.getFullYear() === currentYear) {
                yearlyTotalValue += expense.amount;
            }
        });

        totalAmount.textContent = total.toFixed(2);
        monthlyTotal.textContent = monthlyTotalValue.toFixed(2);
        yearlyTotal.textContent = yearlyTotalValue.toFixed(2);
    }
});

