use screenshots::Screen;

pub fn test_screen_shot() {
  println!("スクショのコードが呼び出されました。");
}

pub fn area_screenshot(
  x: i32, y: i32, width: u32, height: u32
) {
  let screens = Screen::all().unwrap();
  let screen = screens[0];
  let mut image = screen.capture().unwrap();
  image = screen.capture_area(x, y, width, height).unwrap();
      image
          .save(format!("target/{}-2.webp", screen.display_info.id))
          .unwrap();
}