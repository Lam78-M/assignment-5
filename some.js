// json section ---------------------------

const cardContainer = document.getElementById("card-container");

const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

let allIssues = [];

// API load
async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);
}

loadIssues();


// display function
function displayIssues(issues){

cardContainer.innerHTML = "";

issues.forEach(issue => {

const card = document.createElement("div");

card.className = "space-y-5 px-2 py-4 border";

card.innerHTML = `
  <div class="space-y-5 px-2 py-4">
      <div class="flex justify-between">
        <img src="./assets/${issue.status === "open" ? "Open-Status.png" : "Closed-Status.png"}" alt="">
        <button class="text-red-500 bg-red-200 rounded-full px-6">${issue.priority}</button>
      </div>
      <p class="text-[20px] font-bold line-clamp-2">${issue.title}</p>
      <p class="text-[#64748B] line-clamp-2">${issue.description}</p>
      <div class="flex gap-2">
        <button class="bg-red-200 text-red-500 px-4 rounded-full">${issue.type}</button>
        <button class="bg-orange-100 text-orange-500 px-7 rounded-full">HELP WANTED</button>
      </div>
      <hr class="opacity-11">
      <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
      <p class="text-[#64748B]">${issue.date}</p>
    </div>
`;

cardContainer.appendChild(card);

});

}


// All button
allBtn.addEventListener("click", function(){

displayIssues(allIssues);

});


// Open button
openBtn.addEventListener("click", function(){

const openIssues = allIssues.filter(issue => issue.status === "open");

displayIssues(openIssues);

});


// Closed button
closedBtn.addEventListener("click", function(){

const closedIssues = allIssues.filter(issue => issue.status === "closed");

displayIssues(closedIssues);

});