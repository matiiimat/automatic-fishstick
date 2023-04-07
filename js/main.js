var account = null;
var formattedAddress = null; // Declare formattedAddress as a global variable


const connect = async () => {
    if (window.ethereum) {
        await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum);

        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        formattedAddress = `${account?.slice(0, 6)}...${account?.slice(-4)}`;
        document.getElementById('wallet-address').textContent = formattedAddress;
        document.getElementById('chat').onclick = accessLibrary
    }
}

const accessLibrary = async () => {
    var signature = await web3.eth.personal.sign("Please sign in to access your library", account)
    fetch('/auth?signature=' + signature)
        .then(function (response) {
        }).then(function () {
            // Activate the div with the ID 'Games'
            const gamesDiv = document.getElementById('Games');
            gamesDiv.style.display = 'block';
        })

};

function showError(message) {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}


document.getElementById('connectWallet').onclick = connect