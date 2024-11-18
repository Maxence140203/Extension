function updateUI(isInRoom, roomCode = "") {
    const preRoomActions = document.getElementById("preRoomActions");
    const inRoomActions = document.getElementById("inRoomActions");
    const connectionStatus = document.getElementById("connectionStatus");
    const roomCodeDisplay = document.getElementById("roomCodeDisplay");

    if (isInRoom) {
        preRoomActions.classList.add("hidden");
        inRoomActions.classList.remove("hidden");
        connectionStatus.textContent = "Connecté";
        roomCodeDisplay.textContent = roomCode;
    } else {
        preRoomActions.classList.remove("hidden");
        inRoomActions.classList.add("hidden");
        connectionStatus.textContent = "Non connecté";
        roomCodeDisplay.textContent = "";
    }
}

document.getElementById("createRoom").addEventListener("click", function () {
    const roomCode = Math.random().toString(36).substring(2, 10);
    chrome.storage.local.set({ roomCode: roomCode }, function () {
        alert("Salle créée : " + roomCode);
        updateUI(true, roomCode);
    });
});

document.getElementById("joinRoom").addEventListener("click", function () {
    const roomCode = document.getElementById("roomCodeInput").value;
    if (roomCode) {
        chrome.storage.local.set({ roomCode: roomCode }, function () {
            alert("Rejoint la salle : " + roomCode);
            updateUI(true, roomCode);
        });
    } else {
        alert("Veuillez entrer un code de salle.");
    }
});

document.getElementById("copyRoomCode").addEventListener("click", function () {
    chrome.storage.local.get("roomCode", function (result) {
        const roomCode = result.roomCode;
        navigator.clipboard.writeText(roomCode).then(function () {
            alert("Code de la salle copié : " + roomCode);
        });
    });
});

document.getElementById("leaveRoom").addEventListener("click", function () {
    chrome.storage.local.remove("roomCode", function () {
        alert("Vous avez quitté la salle.");
        updateUI(false);
    });
});

// Check if user is already in a room on load
chrome.storage.local.get("roomCode", function (result) {
    if (result.roomCode) {
        updateUI(true, result.roomCode);
    } else {
        updateUI(false);
    }
});
