document.getElementById('connect-btn').addEventListener('click', connectMetaMask);

async function connectMetaMask() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Successfully connected to MetaMask
            console.log('Connected to MetaMask:', accounts[0]);
        } catch (error) {
            // User denied account access
            console.error('User denied account access:', error);
        }
    } else {
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
}
