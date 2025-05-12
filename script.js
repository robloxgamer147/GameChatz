import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBuLyGwCrPY26ohmHY4YwLVwF0dlAfkzak",
  authDomain: "gamechatz-e61e7.firebaseapp.com",
  databaseURL: "https://gamechatz-e61e7-default-rtdb.firebaseio.com",
  projectId: "gamechatz-e61e7",
  storageBucket: "gamechatz-e61e7.appspot.com",
  messagingSenderId: "155399717230",
  appId: "1:155399717230:web:ae414fa8739baf63d0c17f"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesContainer = document.getElementById("messages");
const roomList = document.getElementById("roomList");
const addRoomBtn = document.getElementById("addRoomBtn");
const logoutBtn = document.getElementById("logoutBtn");
const currentRoomName = document.getElementById("currentRoomName");

let currentRoom = null;
let username = localStorage.getItem("username");

// Redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Load rooms
function loadRooms() {
  const roomsRef = ref(db, "rooms/");
  get(roomsRef).then((snapshot) => {
    roomList.innerHTML = "";
    snapshot.forEach((child) => {
      const roomName = child.key;
      const li = document.createElement("li");
      li.textContent = roomName;
      li.onclick = () => selectRoom(roomName);
      roomList.appendChild(li);
    });
  });
}

// Select room
function selectRoom(roomName) {
  currentRoom = roomName;
  currentRoomName.textContent = roomName;
  messagesContainer.innerHTML = "";

  const messagesRef = ref(db, "rooms/" + roomName + "/messages");
  onChildAdded(messagesRef, (data) => {
    const msg = data.val();
    const msgDiv = document.createElement("div");
    msgDiv.textContent = `${msg.user}: ${msg.text}`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
}

// Send message
messageForm.onsubmit = (e) => {
  e.preventDefault();
  if (!currentRoom) return alert("Please select a room.");
  const text = messageInput.value.trim();
  if (!text) return;

  const messagesRef = ref(db, "rooms/" + currentRoom + "/messages");
  push(messagesRef, {
    user: username || "Anonymous",
    text
  });

  messageInput.value = "";
};

// Add room
addRoomBtn.onclick = () => {
  const roomName = prompt("Enter room name:");
  if (!roomName) return;

  const roomRef = ref(db, "rooms/" + roomName);
  set(roomRef, { created: Date.now() }).then(loadRooms);
};

// Logout
logoutBtn.onclick = () => {
  signOut(auth).then(() => {
    localStorage.removeItem("username");
    window.location.href = "login.html";
  });
};

// Init
window.onload = loadRooms;
