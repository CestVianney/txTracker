import { TxList } from './dto/txlist.js';

document.addEventListener("DOMContentLoaded", () => {
    const userAddressInput = document.getElementById("userAddress");
    const transactionsList = document.getElementById("transactions");
    let walletAddress = document.getElementById("wallet-address");
    let transactionsQueue = []; // Garder une trace des 5 derniers blocs
    let monitoringInterval;
    const rootUrl = "https://api.sonicscan.org/api?apikey=";

    userAddressInput.addEventListener('change', () => {
        const userAddress = userAddressInput.value;
        if (userAddress) {
            walletAddress.textContent = userAddress;
            clearInterval(monitoringInterval); // Arrêter l'ancien intervalle s'il existe
            transactionsQueue = []; // Réinitialiser les transactions en cours
            monitoringInterval = setInterval(() => monitorTransactions(userAddress), 1000);
        }
    });

    const monitorTransactions = async (address) => {
        try {
            const response = await fetch(`${rootUrl}&module=account&address=${address}&action=txlistinternal&offset=5&startblock=0&endblock=99999999&page=1&sort=desc`);
            const data = await response.json();
            var txList = new TxList(data);
            displayTransactions(txList.result);
        } catch (error) {
            console.error("Erreur lors de la récupération des transactions :", error);
        }
    };

    const displayTransactions = (transactions) => {
        // Ajouter chaque transaction à la liste avec animation
        transactions.forEach(tx => {
            const blockNumber = tx.blockNumber;
            // Crée un nouvel élément pour la transaction
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <div class="face front"></div>
            <div class="face right"></div>
            <div class="face top"></div>
          `;
            listItem.addEventListener('click', () => {
                window.open(`https://sonicscan.org/tx/${tx.hash}`, '_blank');
            });
            
            // Ajouter le nouveau bloc à la liste
            transactionsQueue.push(listItem);
    
            // Limite la longueur de la liste à 5
            if (transactionsQueue.length > 5) {
                const oldTransaction = transactionsQueue.shift();
                transactionsList.removeChild(oldTransaction);
            }
    
            // Ajouter le nouveau bloc à l'élément HTML
            transactionsList.appendChild(listItem);
    
            // Animer l'apparition du bloc
            animateTransactions();
        });
    };
    
    const animateTransactions = () => {
/*         const blockWidth = document.querySelector('#transactions li')?.offsetWidth || 60; // Largeur d'un bloc, avec une valeur de secours
        const visibleBlocks = 5;
        
        // Calculer la translation maximale possible (en fonction de la largeur d'un bloc et de la taille de l'écran)
        const maxTranslateX = Math.max(0, (transactionsQueue.length - visibleBlocks) * blockWidth);
        
        // Appliquer la translation, mais ne pas dépasser la limite
        transactionsList.style.transform = `translateX(-${Math.min(maxTranslateX, (transactionsQueue.length - 1) * blockWidth)}px)`;
     */
    };
});