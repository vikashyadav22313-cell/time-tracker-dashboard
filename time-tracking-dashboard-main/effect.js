const report = document.querySelector(".report");
const buttons = document.querySelectorAll("button");
const work = ["Day", "Week", "Month"];
const color = [
  "hsl(15, 100%, 70%)",
  " hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  " hsl(145, 58%, 55%)",
  " hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];

function updateReport(key, index) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const result = data;
      report.innerHTML = "";
      result.forEach((item, i) => {
        console.log(item);
        const { title, timeframes } = item;
        const current = timeframes[key].current;
        const previous = timeframes[key].previous;
        report.innerHTML += ` <div class="card" style="background-color:${
          color[i]
        }">
    <img src="./images/icon-${title
      .toLowerCase()
      .replace(/\s+/g, "-")}.svg" class="icons" alt=${title}/>
    <div class="card-detail">
      <div class="data-flow">
        <p>${title}</p>
        <img src="./images/icon-ellipsis.svg" class="dot" alt="more">
      </div>
      <h2>${current}hrs</h2>
      <span>Last ${work[index]}-${previous}hrs</span>
  </div>
  </div>`;
      });
    });
}

window.addEventListener("DOMContentLoaded", () => {
  updateReport("weekly", 1);
  buttons[1].classList.add("active");
});

buttons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    buttons.forEach((button) => button.classList.remove("active"));
    e.target.classList.add("active");
    let key = e.target.innerHTML.toLowerCase();
    updateReport(key, index);
  });
});
