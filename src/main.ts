import { invoke } from "@tauri-apps/api/core";

let greetInputEl: HTMLInputElement | null;
let greetMsgEl: HTMLElement | null;

let open_win: HTMLDivElement | null;

let text: HTMLInputElement | null;
let emit: HTMLElement | null;

async function greet() {
  if (greetMsgEl && greetInputEl) {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsgEl.textContent = await invoke("greet", {
      name: greetInputEl.value,
    });
  }
}

async function open_window() {
  if (open_win) {
    await invoke("open_window")
  }
}

async function emit_size() {
  if (emit && text) {
    await invoke("emit_size", {
      size: text.value
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  open_win = document.querySelector(".open_btn")
  open_win?.addEventListener("click", (e) => {
    e.preventDefault()
    open_window()
  })
  text = document.querySelector("#window_size")
  emit = document.querySelector(".emit")

  emit?.addEventListener("click", (e) => {
    console.log(text)
    emit_size()
  })
});
