// project 1
let students = JSON.parse(localStorage.getItem("students")) || [];
function renderstudents() {
  ul.innerHTML = "";
  students.forEach((e, i) => {
    let li = document.createElement("li");
    let butDelete = document.createElement("button");
    butDelete.id = "delete";
    butDelete.innerText = "delete";
    let span = document.createElement("span");
    span.textContent = e;
    li.appendChild(span);
    li.appendChild(butDelete);
    ul.appendChild(li);
    butDelete.addEventListener("click", function (e) {
      students.splice(i, 1);
      localStorage.setItem("students", JSON.stringify(students));
      renderstudents();
    });
    let butEdit = document.createElement("button");
    butEdit.id = "edit";
    butEdit.innerText = "edit";
    li.appendChild(butEdit);
    butEdit.addEventListener("click", (e) => {
      let promptValue = prompt("edit the name");
      if (promptValue) {
        promptValue = promptValue.trim();
        span.innerText = promptValue;
        students[i] = promptValue;
        localStorage.setItem("students", JSON.stringify(students));
      }
    });
  });
}
let ul = document.querySelector("#ul");
renderstudents();

let sp = document.querySelector("#sp");
sp.textContent = `students : (${students.length})`;
function updatecount() {
  sp.textContent = `students : (${students.length})`;
}
ul.addEventListener("click", (e) => {
  if (e.target.matches("span")) {
    input.value = e.target.textContent;
    input.focus();
  }
});
ul.addEventListener("dblclick", (e) => {
  if (e.target.closest("li")) {
    let valinp = input.value.trim();
    for (let i = 0; i < students.length; i++) {
      if (valinp === students[i]) {
        students.splice(i, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderstudents();
      }
    }
    input.value = "";
    input.focus();
  }
  updatecount();
});

let input = document.querySelector("#input");
let butAdd = document.querySelector("#but-Add");
let butSort = document.querySelector("#sort");
//

butAdd.addEventListener("click", () => {
  let valinp = input.value.trim();
  if (!valinp) {
    alert("Enter name");
    input.value = "";
    input.focus();
  } else if (valinp) {
    if (
      students.some((e) => {
        return e.toLowerCase() === valinp.toLowerCase();
      })
    ) {
      alert("student already exists");
      input.value = "";
      input.focus();
      console.log("render");
      renderstudents();
    } else {
      students.push(valinp);
      localStorage.setItem("students", JSON.stringify(students));
      input.value = "";
      input.focus();
      renderstudents();
    }
  }
});

input.addEventListener("input", () => {
  let valinp = input.value.trim().toLowerCase();
  if (valinp) {
    let result = students.filter((e) => {
      return e.toLowerCase().includes(valinp);
    });
    console.log(result);
    ul.innerHTML = "";
    result.forEach((e) => {
      let li = document.createElement("li");
      li.textContent = e;
      ul.appendChild(li);
    });
  } else if (!valinp) {
    renderstudents();
  }
});

butSort.addEventListener("click", () => {
  students.sort();
  localStorage.setItem("students", JSON.stringify(students));
  renderstudents();
});
