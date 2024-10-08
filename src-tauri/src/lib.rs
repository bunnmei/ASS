// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use tauri::{Manager, PhysicalPosition, PhysicalSize, Size};
use tauri_plugin_dialog::{DialogExt};
mod screenshot;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn open_window(app: tauri::AppHandle) {
    println!("押されたよ");
    let _webview_window = tauri::WebviewWindowBuilder::new(
        &app,
        "label",
        tauri::WebviewUrl::App("capture.html".into()),
    )
    .transparent(true)
    .shadow(true)
    .build()
    .unwrap();
}

#[tauri::command]
fn setting_emit(x: &str, y: &str, w: &str, h: &str,  app: tauri::AppHandle) {
    let x: i32 = x.parse().unwrap();
    let y: i32 = y.parse().unwrap();
    let w: u32 = w.parse().unwrap();
    let h: u32 = h.parse().unwrap();
    // println!("{} - {} - {} - {}", x, y, w, h);
    let other_window = app.get_window("label");
    match other_window {
        Some(window) => {
            println!("windowがみつかった");
            let _ = window.set_size(Size::Physical(PhysicalSize {
                width: w,
                height: h,
            }));
            let _ = window.set_position(PhysicalPosition { x: x, y: y});
        }
        None => {
            println!("windowが見つかりませんでした。");
        }
    }
}

#[tauri::command]
fn screen_shot(path: &str, pref: &str, format: &str, file_name: &str, app: tauri::AppHandle) {
    // let data = window.inner_position();
    let other_window = app.get_window("label");
    match other_window {
        Some(window) => {
            if let Ok(pos) = window.outer_position() {
                let size = window.inner_size().map(|size| tauri::PhysicalSize {
                    width: size.width,
                    height: size.height,
                });

                match size {
                    Ok(siz) => {
                        let _ = window.hide();
                        screenshot::area_screenshot(pos.x, pos.y, siz.width, siz.height, path, pref, format, file_name);
                        let _ = window.show();
                    }
                    Err(e) => {
                        println!("window_size取得失敗 e{}", e);
                    }
                }
            }
        }
        None => {
            println!("windowが見つかりませんでした。");
        }
    }
    println!("押されたよ2");
}

#[tauri::command]
fn open_filer(app: tauri::AppHandle) -> String {
    let folder_path = app.dialog().file().blocking_pick_folder();
    match folder_path {
        Some(path) => {
            format!("{}", path)
        },
        None => {
            "folderが選択されていません。".to_string()
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            open_window,
            screen_shot,
            setting_emit,
            open_filer
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
