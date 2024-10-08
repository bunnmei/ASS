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
let area_2: HTMLDivElement | null;

let count: HTMLDivElement | null;
let file_name: HTMLInputElement | null;
let pref_on: HTMLInputElement | null;
let format_png: HTMLInputElement | null;


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

async function screen_shot(pref: String, format: String) {
  console.log(file_name?.value)
  if (emit && area_2 && area_2.textContent !== "" && file_name) {
    console.log(file_name?.value)
    await invoke("screen_shot", {
      path: area_2.textContent,
      pref: pref,
      format: format,
      fileName: file_name.value
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
  if (file && area_2) {
    area_2.textContent = await invoke("open_filer");
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
    if (pref_on && format_png) {
      let pref: String | null
      let format: String | null
      console.log(pref_on.checked)
      if (pref_on.checked) {
        pref = "pref-on"
      } else {
        pref = "pref-off"
      }
      if (format_png.checked) {
        format = "png"
      } else {
        format = "webp"
      }
      
      screen_shot(pref, format)
    }
    // screen_shot()
  })

  file = document.querySelector(".file")
  file?.addEventListener("click", () => {
    open_filer();
  })

  area_2 = document.querySelector(".input-area-2")

  count = document.querySelector("#counter")
  pref_on = document.querySelector("#pref-on")
  format_png = document.querySelector("#format")
  file_name = document.querySelector(".file-name")

});
