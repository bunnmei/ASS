use screenshots::Screen;

pub fn test_screen_shot() {
    println!("スクショのコードが呼び出されました。");
}

pub fn area_screenshot(x: i32, y: i32, width: u32, height: u32, path: &str, pref: &str, format: &str, file_name: &str) {
    let screens = Screen::all().unwrap();
    println!("screenshot-area-{}-{}-{}-{}", x, y, width, height);

    if width > 0 && height > 0 {
        let screen = screens[0];
        let mut image = screen.capture().unwrap();
        image = screen.capture_area(x, y, width, height).unwrap();
        image
            .save(format!("{0}/{1}{3}.{2}", path, screen.display_info.id, format, file_name))
            .unwrap();
    }

}
