const cardContainer = document.getElementById("card-container");
const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");
const issueCount = document.getElementById("issue-count");
const searchInput = document.getElementById('search-input');
const newIssueBtn = document.getElementById('new-issue-btn');
const loaderOverlay = document.getElementById("loader-overlay");


let allIssues = [];

// Load all issues --------------------

function showLoader() {
  loaderOverlay.classList.remove("hidden");
  cardContainer.classList.add("hidden"); // hide cards
}

function hideLoader() {
  loaderOverlay.classList.add("hidden");
  cardContainer.classList.remove("hidden"); // show cards
}

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

// Display function--------------------------------

const loadIssueDetail =async (id) =>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

  const res = await fetch(url);
  const details = await res.json();
  displayIssueDetails(details.data);
};
const displayIssueDetails =(issue)=>{
  console.log(issue);
  const detailIssue = document.getElementById('issue-container');
  detailIssue.innerHTML = '';
  detailIssue.innerHTML =   ` 
  <h3 class="text-[25px] font-bold">${issue.title}</h3>
  <div>
  <div class="flex justify-start gap-4 text-center items-center">
  <button class="px-3 bg-green-500 rounded-full text-white font-normal">Opened</button>
        <div class="w-1 h-1 bg-[#64748B] rounded-full"></div>
        <p class="text-[#64748B]">${issue.author}</p>
        <div class="w-1 h-1 bg-[#64748B] rounded-full"></div>
        <p class="text-[#64748B]">${issue.updatedAt}</p>
  </div>
  <div class="mt-[15px] flex gap-2">
  <button class="flex items-center gap-1  bg-red-200 text-red-500 px-2 rounded-full text-xs"><img  class="w-[14px]" src="assets/Vector (2).png">${(issue.labels?.[0] || "").toUpperCase()}</button>
  <button class="flex items-center gap-1   bg-orange-100 text-orange-500 px-3 py-1 rounded-full text-xs"><img  class="w-[14px]" src="assets/Vector (1).png">${(issue.labels?.[1] || "").toUpperCase()}</button>
  </div>
  </div>
        <p class="line-clamp-2 text-[#64748B] mt-2">
        ${issue.title}
        </p>
  <div class="flex justify-between mt-4 bg-[#f7f7f8] px-2 py-4 rounded-md">
  <div>
        <p class="text-[#64748B]">Assignee :</p>
        <p class="text-[#000205]">${issue.assignee}</p>
  </div>
  <div class=mr-[130px]>
        <p class="text-[#64748B]">Priority :</p>
        <button class="bg-red-500 px-3 rounded-full text-white">${issue.priority}</button>
  </div>
  </div>
  <div class="modal-action mt-4">
  <form method="dialog">
  <button class="btn btn-primary">Close</button>
  </form>
  </div>
  </div>
  `
  document.getElementById('my_modal_1').showModal()

}


function displayIssues(issues) {
    cardContainer.innerHTML = "";
    issueCount.innerText = `${issues.length} Issues`;
    issues.forEach(issue => {
    const card = document.createElement("div");
    const borderColor = issue.status === "open" ? "border-t-green-500" : "border-t-purple-500"; 
    card.className = `space-y-5 px-2 py-4 shadow-md rounded-lg border-t-4 ${borderColor}`;

    card.innerHTML = `
  <div>
  <div onclick="loadIssueDetail(${issue.id})" class="space-y-5 px-2 py-4">
  <div class="flex justify-between">
  <img src="./assets/${issue.status === "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
  <button  class="text-red-500 bg-red-200 rounded-full px-6 ">${issue.priority}</button>
  </div>
          <p class="text-[20px] font-bold line-clamp-2">${issue.title}</p>
          <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
  <div class="flex gap-2 flex-wrap">
  <button  class="flex items-center gap-1  bg-red-200 text-red-500 px-2 rounded-full"><img  class="w-[14px]" src="assets/Vector (2).png">${(issue.labels?.[0] || "").toUpperCase()}</button>
  <button class="flex items-center gap-1    bg-orange-100 text-orange-500 px-3 rounded-full"><img  class="w-[14px]" src="assets/Vector (1).png">${(issue.labels?.[1] || "").toUpperCase()}</button>
  </div>
          <hr class="opacity-20">
          <p class="text-[#64748B]">#${issue.assignee} by ${issue.author}</p>
          <p class="text-[#64748B]">${issue.createdAt}</p>
  </div>
  </div>
    `;
    cardContainer.appendChild(card);
  });

}

// Filter Buttons-------------------------- 

  function setActiveButton(activeBtn){
  [allBtn, openBtn, closedBtn].forEach(btn => btn.classList.remove("btn-primary"));
  activeBtn.classList.add("btn-primary");
}

allBtn.addEventListener("click", () => {
  displayIssues(allIssues);
  setActiveButton(allBtn);
  showLoader();
  setTimeout(() => { displayIssues(allIssues); hideLoader(); }, 300);
});

openBtn.addEventListener("click", () => {
  const openIssues = allIssues.filter(issue => issue.status === "open");
  displayIssues(openIssues);
  setActiveButton(openBtn);
  showLoader();
  setTimeout(() => { displayIssues(allIssues.filter(i => i.status==="open")); hideLoader(); }, 300);
});

closedBtn.addEventListener("click", () => {
  const closedIssues = allIssues.filter(issue => issue.status === "closed");
  displayIssues(closedIssues);
  setActiveButton(closedBtn);
  showLoader();
  setTimeout(() => { displayIssues(allIssues.filter(i => i.status==="closed")); hideLoader(); }, 300);
});

// Search input------------------------

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
   }, 300); 

});

async function searchIssues(query) {
    try {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    if (!res.ok) {
      displayIssues([]); 
      return;
    }
    const data = await res.json();
    displayIssues(data.data || []);
  } catch (err) {
    console.error("Search failed:", err);
    displayIssues([]); 
  }

}

// new button issue -------------------------------

newIssueBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
    if(query !== "") {
    searchIssues(query);
  } else { 
    displayIssues(allIssues);
  }
});