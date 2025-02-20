
document.addEventListener("DOMContentLoaded", function () {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");

    let expenses = [];

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (!name || isNaN(amount) || !category || !date) {
            alert("Please fill out all fields.");
            return;
        }

        const newExpense = { name, amount, category, date };

        // Add to the list
        expenses.push(newExpense);
        updateExpenseList();

        // Reset form
        expenseForm.reset();
    });

    function updateExpenseList() {
        // Clear current list
        expenseList.innerHTML = "";

        let total = 0;
        const selectedCategory = filterCategory.value;

        expenses.forEach((expense, index) => {
            if (selectedCategory !== "All" && expense.category !== selectedCategory) return;

            total += expense.amount;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>₹${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;

            // Add hover effect
            row.addEventListener("mouseenter", () => row.style.background = "rgba(255, 255, 255, 0.2)");
            row.addEventListener("mouseleave", () => row.style.background = "transparent");

            expenseList.appendChild(row);
        });

        totalAmount.textContent = total.toFixed(2);

        // Attach event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                expenses.splice(index, 1);
                updateExpenseList();
            });
        });
    }

    // Filter functionality
    filterCategory.addEventListener("change", updateExpenseList);
});
