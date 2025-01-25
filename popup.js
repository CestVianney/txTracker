document.addEventListener("DOMContentLoaded", () => {
    const walletAddress = document.getElementById("wallet-address");
    const transactionsList = document.getElementById("transactions");
    const accountDataButton = document.getElementById("accountData");

    accountDataButton.addEventListener('click', () => {
        getAccountData();
    })

    // Exemple d'appel à une API pour récupérer les transactions
    const getTransactions = async (address) => {
        try {
            const response = await fetch(`https://api.example.com/transactions?address=${address}`);
            const data = await response.json();
            displayTransactions(data.transactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const displayTransactions = (transactions) => {
        transactionsList.innerHTML = transactions.map(tx => `
        <li>
          <strong>${tx.type}</strong> - ${tx.amount} tokens
          <br/>
          <small>Time: ${new Date(tx.timestamp).toLocaleString()}</small>
        </li>
      `).join('');
    };

    const userAddressInput = document.getElementById("userAddress");

    userAddressInput.addEventListener('change', () => {
        const userAddress = userAddressInput.value;
        console.log(userAddress);
        console.log('on entre ici A');

        if (userAddress) {
            console.log('on entre ici B');
            walletAddress.textContent = userAddressInput.value;
            getTransactions(userAddressInput);
        }
    });
});