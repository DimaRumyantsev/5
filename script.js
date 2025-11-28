
const block2 = document.getElementById("block2");
const block5 = document.getElementById("block5");
block2.parentNode.insertBefore(block5, block2);


const r = 10;
const circleArea = Math.PI * r * r;
document.getElementById("circle-result").innerHTML =
  "<h3>Площа кола: " + circleArea.toFixed(2) + "</h3>";


const form = document.getElementById("numbers-form");
const cookieName = "maxCount";

function getCookie(n) {
  let v = document.cookie.match("(^|;) ?" + n + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function deleteCookie(n) {
  document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const existing = getCookie(cookieName);

if (existing) {
  form.style.display = "none";
  if (confirm("У cookies збережено значення: " + existing + ". Видалити?")) {
    deleteCookie(cookieName);
    location.reload();
  } else {
    alert("Cookies збережені. Перезавантажте сторінку при необхідності.");
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const nums = [...form.querySelectorAll("input")].map(i => Number(i.value));
  const max = Math.max(...nums);
  const count = nums.filter(v => v === max).length;

  alert("Кількість максимальних: " + count);
  document.cookie = cookieName + "=" + count + "; path=/;";
  document.getElementById("max-result").innerHTML =
    "<h3>Максимальних чисел: " + count + "</h3>";
});


const savedColor = localStorage.getItem("block2color");
if (savedColor) block2.style.background = savedColor;

block2.addEventListener(
  "blur",
  () => {
    const c = prompt("Введіть колір фону блока 2:");
    if (c) {
      block2.style.background = c;
      localStorage.setItem("block2color", c);
    }
  },
  true
);


const editableBlocks = {
  1: "block1",
  2: "block2",
  3: "block3",
  4: "block4",
  5: "block5",
  6: "blocky",
  7: "block6"
};

const originalContent = {};
for (let key in editableBlocks) {
  const id = editableBlocks[key];
  originalContent[id] = document.getElementById(id).innerHTML;
}

document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("dblclick", () => {
    const number = btn.dataset.block;
    const blockId = editableBlocks[number];
    const block = document.getElementById(blockId);

    const saved = localStorage.getItem("block_" + blockId);
    if (saved) block.innerHTML = saved;

    const textarea = document.createElement("textarea");
    textarea.style.width = "100%";
    textarea.style.height = "150px";
    textarea.value = block.innerHTML;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Зберегти";

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Відновити";
    resetBtn.style.marginLeft = "10px";

    block.innerHTML = "";
    block.appendChild(textarea);
    block.appendChild(saveBtn);
    block.appendChild(resetBtn);

    saveBtn.onclick = () => {
      const val = textarea.value;
      block.style.background =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      block.innerHTML = val;
      localStorage.setItem("block_" + blockId, val);
    };

    resetBtn.onclick = () => {
      block.innerHTML = originalContent[blockId];
      localStorage.removeItem("block_" + blockId);
    };
  });
});
