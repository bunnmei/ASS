// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use tauri::Window;
use tauri::{App, WindowBuilder, Manager};
use tauri::Size;
use tauri::PhysicalSize;
use tauri::PhysicalPosition;

mod screenshot;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}



#[tauri::command]
async fn open_window(app: tauri::AppHandle) 
{
    println!("押されたよ");
    let _webview_window = tauri::WebviewWindowBuilder::new(&app, "label", tauri::WebviewUrl::App("capture.html".into()))
        .transparent(true)
        .decorations(false)
        .shadow(false)
        .build()
        .unwrap();
} 

#[tauri::command]
fn setting_emit(x: &str, y: &str, w: &str, h: &str, app: tauri::AppHandle) {

    let x: i32 = x.parse().unwrap();
    let y: i32 = y.parse().unwrap();
    let w: u32 = w.parse().unwrap();
    let h: u32 = h.parse().unwrap();

    println!("{} - {} - {} - {}", x, y, w, h);
    let other_window = app.get_window("label");
    screenshot::area_screenshot(x, y, w, h);
    // match other_window {
    //     Some(window) => {
    //         println!("windowがみつかった");
    //         println!("{:?}", window.outer_position());
    //         let _ = window.set_size(Size::Physical(PhysicalSize {
    //         width: w,
    //         height: h,
    //         }));

    //         let _ = window.set_position(PhysicalPosition {
    //             x: x - 8,
    //             y: y -8,
    //         });

    //     },
    //     None => {
    //         println!("windowが見つかりませんでした。");
    //     }
    // }
}

#[tauri::command]
fn emit_size(size: &str, app: tauri::AppHandle) {
    // let data = window.inner_position();
    let other_window = app.get_window("label");
    match other_window {
        Some(window) => {
            println!("windowがみつかった");
            println!("{:?}", window.outer_position());
            // let _ = window.set_size(Size::Physical(PhysicalSize {
            // width: 800.0 as u32,
            // height: 600.0 as u32,
            // }));
        },
        None => {
            println!("windowが見つかりませんでした。");
        }
    }
    // screenshot::area_screenshot();
    println!("押されたよ2");
    println!("{}", size);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, open_window, emit_size,setting_emit])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
