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


// test token check
const walletAddress = 0x03cc9c887cffd31bdb4c58444ee54873e0e4ddae
const balance = await erc721.balanceOf(walletAddress);


const getTokensId = async (recipient, index) => {
    try {
        const result = nonfungibleManager.tokenOfOwnerByIndex(recipient, index);
        return result;
    } catch (error) {
        console.log(error, "the error for getTokensId");
    }
};

const getPosition = async (id) => {
    try {
        const position = erc721.positions(id);
        return position;
    } catch (error) {
        console.log(error, "error from getPosition");
    }
};

let nfts = [];

let numbers = [];
for (let i = 0; i < Number(balance._hex); i++) {
    numbers.push(i);
}
await Promise.all(
    numbers.map(async (i) => {
        await getTokensId(walletAddress, i).then(async (res) => {
            let tokenId = Number(res?._hex);
            await getPosition(tokenId).then((result) => {
                nfts.push({
                    'tokenId': tokenId
                });
            });
        });
    })
);
console.log(nfts)
return nfts

//END

