import { invoke } from "@tauri-apps/api/core";

// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;

let open_win: HTMLDivElement | null;

let emit: HTMLElement | null;

let x: HTMLInputElement | null;
let y: HTMLInputElement | null;
let w: HTMLInputElement | null;
let h: HTMLInputElement | null;
let setting: HTMLDivElement | null;

let file: HTMLDivElement | null;

// async function greet() {
//   if (greetMsgEl && greetInputEl) {
//     // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//     greetMsgEl.textContent = await invoke("greet", {
//       name: greetInputEl.value,
//     });
//   }
// }

async function open_window() {
  if (open_win) {
    await invoke("open_window")
  }
}

async function screen_shot() {
  if (emit && file && file.textContent !== "") {
    await invoke("screen_shot", {
      path: file.textContent
    })
  }
}

async function setting_emit() {
  if (x && y && w && h) {
    await invoke("setting_emit", {
      x: x.value,
      y: y.value,
      w: w.value,
      h: h.value,
    }) 
  }
}

async function open_filer() {
  if (file) {
    file.textContent = await invoke("open_filer");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // greetInputEl = document.querySelector("#greet-input");
  // greetMsgEl = document.querySelector("#greet-msg");
  // document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   greet();
  // });

  x = document.querySelector("#x");
  y = document.querySelector("#y");
  w = document.querySelector("#w");
  h = document.querySelector("#h");
  setting = document.querySelector(".setting");
  
  setting?.addEventListener("click", () => {
    if (x?.value && y?.value && w?.value && h?.value) {
      setting_emit()
    }
  })

  open_win = document.querySelector(".open_win")
  open_win?.addEventListener("click", (e) => {
    e.preventDefault()
    open_window()
  })

  emit = document.querySelector(".emit")

  emit?.addEventListener("click", () => {
    // console.log("kamera")
    screen_shot()
  })

  file = document.querySelector(".file")
  file?.addEventListener("click", () => {
    open_filer();
  })
});
