// src/data/mockData.js — Cập nhật theo tài liệu WEBSITE.docx

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { id: "info",      label: "Thông Tin",           href: "#info" },
  { id: "vat-the",   label: "Di Sản Vật Thể",      href: "#vat-the" },
  { id: "phi-vat",   label: "Di Sản Phi Vật Thể",  href: "#phi-vat" },
  { id: "model3d",   label: "Mô Hình 3D",           href: "#model3d" },
  { id: "lien-he",   label: "Liên Hệ",              href: "#lien-he" },
];

// ─── Stats (từ docx) ──────────────────────────────────────────────────────────
export const STATS = [
  { value: "55.000", label: "Dân số Cơ Tu" },
  { value: "3",       label: "Huyện (tỉnh Quảng Nam)" },
  { value: "3.600",  label: "km² diện tích" },
  { value: "300",    label: "Tổng di sản" },
];

// ─── Trang phục — 7 loại (từ docx) ───────────────────────────────────────────
export const TRANG_PHUC_ITEMS = [
  {
    id: 1,
    name: "Áo Doóh",
    tag: "Nữ phục",
    mota: "Áo dệt từ sợi bông, thân áo rộng ~50cm và dài ~100cm, gấp đôi tạo thân trước-sau. Phần cổ khoét dài ~25cm, hai bên sườn khâu lại tạo dáng cộc tay với cổ chữ V. Hoa văn trang trí ở vai, ngực và gấu áo với màu đỏ, trắng hoặc vàng trên nền chàm đen.",
    ynghia: "Phụ nữ mặc phổ biến trong sinh hoạt hằng ngày và các lễ hội cộng đồng.",
    color: "#8B3A1E",
    img:""
  },
  {
    id: 2,
    name: "Khố (G'hul)",
    tag: "Nam phục",
    mota: "Đàn ông ngày thường mặc khố dài 1,5–2m, rộng ~25cm, màu chàm đen, hoa văn đơn giản, ngắn đến đầu gối — tiện lợi cho đi rừng làm rẫy. Lễ hội mặc khố dài 3–8m, rộng ~45cm, hai mảnh trước sau dài đến mắt cá chân.",
    ynghia: "Trước đây dùng trong đời sống hằng ngày, nay chủ yếu dùng trong lễ hội và nghi lễ cộng đồng.",
    color: "#5C1F08",
    img:""
  },
  {
    id: 3,
    name: "Váy Dài (Chơđhoong)",
    tag: "Lễ phục nữ",
    mota: "Váy dệt thổ cẩm dài ~6m, khâu thành hai lớp mỗi lớp ~3m. Dây lưng quấn trên ngực giữ váy. Hoa văn cách điệu tập trung thành mảng lớn ở phần dưới — họa tiết abloom, lá trầu đứng riêng bằng các vạch sọc.",
    ynghia: "Trang phục lễ hội hoặc dịp đặc biệt — cưới hỏi, nghi lễ quan trọng, sinh hoạt cộng đồng.",
    color: "#C9821A",
    img:""
  },
  {
    id: 4,
    name: "Váy Ngắn (Doóh)",
    tag: "Nữ phục",
    mota: "Dài 80cm, rộng 70–80cm. Màu chàm đen, đính hoa văn bằng chì, ít sặc sỡ. Tấm vải khâu thành hình ống, quấn quanh hông và cố định bằng dây buộc hoặc thắt lưng.",
    ynghia: "Mặc hằng ngày đến đầu gối cho tiện lao động. Dịp lễ hội có thể dài hơn và trang trí hoa văn cầu kỳ.",
    color: "#2D5A27",
    img:""
  },
  {
    id: 5,
    name: "Thắt Lưng (Cơteng Papah)",
    tag: "Phụ kiện",
    mota: "Dệt từ sợi bông, dài ~2m, rộng ~5cm. Màu trắng sữa hoặc xám. Hoa văn hình học cách điệu, hai đầu có tua dài nhiều màu ~30cm. Khi thắt quấn hai vòng qua trước bụng ra sau lưng.",
    ynghia: "Có giá trị thẩm mỹ cao trong trang phục, tạo sự nổi bật cho người mặc.",
    color: "#E8A832",
    img:""
  },
  {
    id: 6,
    name: "Trang Phục Vỏ Cây",
    tag: "Cổ phục",
    mota: "Làm từ vỏ cây rừng như Tro ra đang, Tà coóng hoặc mít rừng. Vỏ cây bóc ra, nướng cho mềm rồi đập mỏng trước khi khâu thành áo hoặc khố.",
    ynghia: "Chống giá rét và thích nghi cho hoạt động đi rừng: khai thác mây, phát rẫy, cắt lá lợp nhà, đặc biệt là đi săn bắt rừng sâu.",
    color: "#3D7A35",
    img:""
  },
  {
    id: 7,
    name: "Khăn Trùm Đầu (Pr'nơng)",
    tag: "Phụ kiện đầu",
    mota: "Tấm khăn dài với hai kiểu vấn: (1) Vấn quanh đầu hết chiều dài, điểm kết thúc một bên đầu. (2) Quấn một vòng, múi sau gáy, hai dải buông về phía sau vừa trùm đầu vừa che lưng — thường dùng trong lễ hội.",
    ynghia: "Che chắn giữ ấm hằng ngày. Trong lễ hội, các già làng quấn kiểu che lưng — góp phần hoàn thiện trang phục và thể hiện sự chỉnh tề.",
    color: "#8B3A1E",
    img:""
  },
];

// ─── Lễ hội — từ docx ─────────────────────────────────────────────────────────
export const LE_HOI_ITEMS = [
  {
    id: 1,
    name: "Lễ Mừng Lúa Mới",
    thoiGian: "Tháng 10 âm lịch, sau thu hoạch lúa rẫy",
    diaDiem: "Nhà Gươl & sân làng xung quanh cột lễ (x'nur)",
    tag: "Lễ hội nông nghiệp",
    color: "#8B3A1E",
    hoatDong: [
      "Lễ cúng Giàng và các thần linh tự nhiên",
      "Nghi thức dựng cây nêu",
      "Đâm trâu hiến sinh",
      "Hát lý, múa tung tung da dá",
      "Đánh cồng chiêng và uống rượu cần",
      "Sửa chữa nhà Gươl, chuẩn bị lễ vật cộng đồng",
    ],
    ynghia: "Lễ mừng lúa mới không chỉ là nghi lễ tín ngưỡng tạ ơn thần linh đã phù hộ mùa màng mà còn thể hiện khát vọng về cuộc sống no đủ, bình an. Đồng thời củng cố sự gắn kết xã hội, duy trì giá trị văn hóa và tái khẳng định mối quan hệ hài hòa giữa con người với tự nhiên và thế giới tâm linh.",
    quyTrinh: "Trước hết cúng riêng tại từng gia đình, sau đó lễ hội chung toàn làng khi tất cả các hộ đã thu hoạch xong.",
    image: "../../../../public/assets/image.png",
    video: "https://www.youtube.com/embed/dp_Ak9rtTVo",
  },
  {
    id: 2,
    name: "Múa Tung Tung Da Dá",
    thoiGian: "Các lễ hội lớn trong năm",
    diaDiem: "Sân làng — trước Nhà Gươl",
    tag: "Di sản phi vật thể",
    color: "#2D5A27",
    hoatDong: [
      "Nghi lễ tâm linh giao tiếp với thần linh",
      "Điệu múa cầu mùa màng tốt tươi",
      "Truyền dạy kỹ năng múa cho thế hệ trẻ",
      "Gắn kết cộng đồng qua vũ điệu tập thể",
    ],
    ynghia: "Là nghi lễ mang tính tâm linh sâu sắc, thể hiện sự giao tiếp với thần linh, cầu mong mùa màng tốt tươi, cuộc sống bình an. Đồng thời gắn kết cộng đồng và gìn giữ bản sắc văn hóa Cơ Tu.",
    quyTrinh: "Diễn ra trong lễ mừng lúa mới, lễ ăn trâu, lễ cầu mùa — chủ yếu sau thu hoạch hoặc các dịp sinh hoạt cộng đồng lớn.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/800px-Co_Tu_people.jpg",
    video: "https://www.youtube.com/embed/8sVtL0o-v7U",
  },
  {
    id: 3,
    name: "Lễ Ăn Trâu (Đâm Trâu)",
    thoiGian: "3–5 năm / lần",
    diaDiem: "Trung tâm làng — quanh cột lễ",
    tag: "Lễ hội lớn",
    color: "#C9821A",
    hoatDong: [
      "Dựng cột lễ x'nur trang trí hoa văn",
      "Nghi lễ hiến sinh trâu cho thần linh",
      "Tiếng chiêng trống vang khắp núi rừng",
      "Các làng lân cận giao lưu, kết nghĩa",
    ],
    ynghia: "Lễ hội lớn nhất của người Cơ Tu — tổ chức định kỳ để tạ ơn thần linh và cầu phúc. Thể hiện sự thịnh vượng và đoàn kết cộng đồng.",
    quyTrinh: "Cả làng cùng chuẩn bị nhiều tháng trước — từ dựng cột lễ, nuôi trâu đến mời các làng lân cận tham dự.",
    image: "https://baoangiang.com.vn/thumb/600x400/data/editor/202302/van-hoa-co-tu-1-16754063371551847898563.jpg",
    video: null,
  },
];

// ─── Làng & kiến trúc ─────────────────────────────────────────────────────────
export const LANG_ITEMS = [
  {
    id: 1,
    name: "Nhà Gươl",
    subtitle: "Ngôi nhà cộng đồng",
    tag: "Di sản vật thể",
    desc: "Nhà Gươl là công trình kiến trúc đặc sắc nhất — mái nhọn vút cao, chạm khắc hoa văn tinh tế. Đây là trung tâm sinh hoạt, hội họp và tín ngưỡng của toàn làng.",
    color: "#8B3A1E",
    image: "https://statics.vinpearl.com/nha-guol-cua-nguoi-co-tu-1_1626227529.jpg",
  },
  {
    id: 2,
    name: "Nhà Sàn Truyền Thống",
    subtitle: "Không gian sinh hoạt gia đình",
    tag: "Di sản vật thể",
    desc: "Nhà sàn xây dựng từ gỗ rừng, tre nứa — thích nghi hoàn hảo với địa hình núi cao và khí hậu ẩm ướt Trường Sơn, đồng thời bảo vệ gia đình khỏi thú dữ.",
    color: "#2D5A27",
    image: "https://images.baodanang.vn/uploaded/nguyenthitam/2023_08_15/co_tu/co-tu_MFVO.jpg",
  },
];

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const GALLERY = [
  { id:1, src:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Co_Tu_people.jpg/800px-Co_Tu_people.jpg", caption:"Cộng đồng Cơ Tu", tag:"Con người" },
  { id:2, src:"https://statics.vinpearl.com/nha-guol-cua-nguoi-co-tu-1_1626227529.jpg", caption:"Nhà Gươl truyền thống", tag:"Kiến trúc" },
  { id:3, src:"https://images.baodanang.vn/uploaded/nguyenthitam/2023_08_15/co_tu/co-tu2.jpg", caption:"Lễ hội Cơ Tu", tag:"Lễ hội" },
  { id:4, src:"https://baoangiang.com.vn/thumb/600x400/data/editor/202302/van-hoa-co-tu-1-16754063371551847898563.jpg", caption:"Văn hóa truyền thống", tag:"Văn hóa" },
  { id:5, src:"https://images.baodanang.vn/uploaded/nguyenthitam/2023_08_15/co_tu/co-tu_MFVO.jpg", caption:"Bản làng Cơ Tu", tag:"Làng xã" },
  { id:6, src:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nha_Guol_Co_Tu.jpg/800px-Nha_Guol_Co_Tu.jpg", caption:"Nhà Gươl linh thiêng", tag:"Kiến trúc" },
];