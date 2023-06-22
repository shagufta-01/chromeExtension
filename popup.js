console.log("this is console for index,js");
 
let arr = localStorage.getItem("color") ? JSON.parse(localStorage.getItem("color")) :[];
console.log(arr, "for")
let str = arr.map((item) => {
  console.log(item.color_val);
  return `<li class="li_color" style="background-color: ${item.color_val}"></li>`;
}).join(' ');
document.getElementById("my_div").innerHTML = str;

const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
btn.addEventListener("click", async () => {
  chrome.storage.sync.get("color", ({ color }) => {
    console.log("color", color);
  });
  console.log("this is console for btnnnnn");
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id }, //object create
      function: pickColor,
    },
    async (injectionResults) => {
      console.log(injectionResults);
      const [data] = injectionResults;
      if (data.result) {
        const color = data.result.sRGBHex;
        console.log(color);
        arr.push({
          color_val: color,
        });
        localStorage.setItem("color", JSON.stringify(arr));
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
      }
      try {
        //   await navigator.clipboard.writeText(color);
      } catch (err) {
        console.error(err);
      }

      console.log(colorGrid);
    }
  );
});
//not run in webpage

async function pickColor() {
  // alert("this is alert for my extension")
  try {
    //  picker
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    console.log(selectedColor);
  } catch (err) {
    console.error(err);
  }
}
