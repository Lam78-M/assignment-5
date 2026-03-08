const cardContainer = document.getElementById("card-container");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issueCount = document.getElementById("issue-count");
const searchInput = document.getElementById('search-input');
const newIssueBtn = document.getElementById('new-issue-btn');

let allIssues = [];

// Load all issues
async function loadIssues() {
  try {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data || [];
    displayIssues(allIssues);
  } catch(err) {
    console.error("Failed to load issues:", err);
  }
}

loadIssues();

// Display function

function displayIssues(issues) {
  cardContainer.innerHTML = "";
  issueCount.innerText = `${issues.length} Issues`;

  issues.forEach(issue => {
    const card = document.createElement("div");
    const borderColor = issue.status === "open" ? "border-t-green-500" : "border-t-purple-500";

    card.className = `space-y-5 px-2 py-4 shadow-md rounded-lg border-t-4 ${borderColor}`;
    card.innerHTML = `
      <div>
        <div class="space-y-5 px-2 py-4">
          <div class="flex justify-between">
            <img src="./assets/${issue.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
            <button class="text-red-500 bg-red-200 rounded-full px-6">${issue.priority}</button>
          </div>
          <p class="text-[20px] font-bold line-clamp-2">${issue.title}</p>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
          <div class="flex gap-2 flex-wrap">
            <button class="bg-red-200 text-red-500 px-4 rounded-full">${issue.type}</button>
            <button class="bg-orange-100 text-orange-500 px-7 rounded-full">HELP WANTED</button>
          </div>
          <hr class="opacity-20">
          <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
          <p class="text-[#64748B]">${issue.date}</p>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

// Filter Buttons
function setActiveButton(activeBtn){
  [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
  activeBtn.classList.add("btn-primary");
}

allBtn.addEventListener("click", () => {
  displayIssues(allIssues);
  setActiveButton(allBtn);
});

openBtn.addEventListener("click", () => {
  const openIssues = allIssues.filter(issue => issue.status === "open");
  displayIssues(openIssues);
  setActiveButton(openBtn);
});

closedBtn.addEventListener("click", () => {
  const closedIssues = allIssues.filter(issue => issue.status === "closed");
  displayIssues(closedIssues);
  setActiveButton(closedBtn);
});

// Search input
let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  const query = searchInput.value.trim();

  searchTimeout = setTimeout(() => {
    if(query === "") {
      displayIssues(allIssues);
      return;
    }
    searchIssues(query);
  }, 300); // debounce
});

async function searchIssues(query) {
  try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    if(!res.ok) return;
    const data = await res.json();
    displayIssues(data.data || []);
  } catch(err){
    console.error("Search failed:", err);
  }
}

// NEW ISSUES button
newIssueBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();

  if(query !== "") {
    // If user typed something, show search result
    searchIssues(query);
  } else {
    // Otherwise show all issues
    displayIssues(allIssues);
  }
});