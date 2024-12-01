let web3;
let contract;

const contractAddress = "0xddaAd340b0f1Ef65169Ae5E41A8b10776a75482d"; // Remplace par l'adresse de ton contrat
const contractABI = [
    [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "candidatesCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_candidateId",
                    "type": "uint256"
                }
            ],
            "name": "getCandidate",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hasVoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        alert("Installe Metamask !");
    }
}

async function addCandidate() {
    const name = document.getElementById("candidateName").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addCandidate(name).send({ from: accounts[0] });
    alert("Candidat ajouté avec succès !");
}

async function vote() {
    const id = document.getElementById("candidateId").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.vote(id).send({ from: accounts[0] });
    alert("Vote enregistré !");
}

async function displayCandidates() {
    const count = await contract.methods.candidatesCount().call();
    let candidatesDiv = document.getElementById("candidates");
    candidatesDiv.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const candidate = await contract.methods.getCandidate(i).call();
        candidatesDiv.innerHTML += `<p>ID: ${i} | Nom: ${candidate[0]} | Votes: ${candidate[1]}</p>`;
    }
}

window.onload = init;
