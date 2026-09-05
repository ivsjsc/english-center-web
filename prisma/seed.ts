import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting realistic seed for AURA English Academy...");

  // 1. Clean existing records (respecting relations)
  await prisma.auditLog.deleteMany();
  await prisma.leadActivity.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.placementTestBooking.deleteMany();
  await prisma.contactSubmission.deleteMany();
  await prisma.centerImage.deleteMany();
  await prisma.centerCourse.deleteMany();
  await prisma.teacherCourse.deleteMany();
  await prisma.teacherQualification.deleteMany();
  await prisma.courseCurriculum.deleteMany();
  await prisma.courseOutcome.deleteMany();
  await prisma.courseFAQ.deleteMany();
  await prisma.studentAchievement.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.newsArticle.deleteMany();
  await prisma.course.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.center.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSetting.deleteMany();

  // 2. Default Users & Staff
  const passwordHash = await bcrypt.hash("Admin@2026!", 10);

  const superAdmin = await prisma.user.create({
    data: {
      email: "superadmin@aura.edu.vn",
      passwordHash,
      fullName: "Nguyễn Vũ Hoàng (Giám đốc học thuật)",
      phone: "0908123456",
      role: "SUPER_ADMIN",
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@aura.edu.vn",
      passwordHash,
      fullName: "Trần Mai Anh (Quản lý vận hành)",
      phone: "0912345678",
      role: "ADMIN",
    },
  });

  const consultant1 = await prisma.user.create({
    data: {
      email: "tuvan.minhchau@aura.edu.vn",
      passwordHash,
      fullName: "Lê Minh Châu (Chuyên viên tư vấn)",
      phone: "0987654321",
      role: "CONSULTANT",
    },
  });

  const consultant2 = await prisma.user.create({
    data: {
      email: "tuvan.quanghuy@aura.edu.vn",
      passwordHash,
      fullName: "Phạm Quang Huy (Chuyên viên tư vấn)",
      phone: "0978112233",
      role: "CONSULTANT",
    },
  });

  const centerManager = await prisma.user.create({
    data: {
      email: "manager.quan1@aura.edu.vn",
      passwordHash,
      fullName: "Đỗ Kim Ngân (Giám đốc cơ sở Q1)",
      phone: "0933445566",
      role: "CENTER_MANAGER",
    },
  });

  console.log("✅ Seeded 5 administrative & consulting users");

  // 3. Course Categories (8 categories)
  const categoriesData = [
    {
      slug: "smartkids-mam-non",
      name: "Tiếng Anh Mầm Non (4 - 6 tuổi)",
      description: "Khơi gợi đam mê ngôn ngữ từ sớm qua phương pháp thẩm thấu tự nhiên & trò chơi tương tác.",
      icon: "Baby",
      sortOrder: 1,
    },
    {
      slug: "superkids-tieu-hoc",
      name: "Tiếng Anh Tiểu Học (6 - 11 tuổi)",
      description: "Xây dựng nền tảng ngữ âm chuẩn quốc tế, tự tin chinh phục chứng chỉ Cambridge Starters, Movers, Flyers.",
      icon: "GraduationCap",
      sortOrder: 2,
    },
    {
      slug: "young-leaders-thieu-nien",
      name: "Tiếng Anh Thiếu Niên (11 - 15 tuổi)",
      description: "Phát triển tư duy phản biện, kỹ năng học thuật và làm quen chứng chỉ KET, PET, tiền IELTS.",
      icon: "BookOpen",
      sortOrder: 3,
    },
    {
      slug: "ielts-chuyen-sau",
      name: "Luyện Thi IELTS Chuyên Sâu",
      description: "Lộ trình cam kết đầu ra 6.5 - 8.0+ cùng đội ngũ giám khảo và giảng viên giàu kinh nghiệm.",
      icon: "Award",
      sortOrder: 4,
    },
    {
      slug: "tieng-anh-giao-tiep",
      name: "Tiếng Anh Giao Tiếp Quốc Tế (iTalk)",
      description: "Linh hoạt thời gian, phản xạ giao tiếp tự nhiên với 100% giáo viên bản ngữ chuẩn CELTA.",
      icon: "MessageSquare",
      sortOrder: 5,
    },
    {
      slug: "tieng-anh-doanh-nghiep",
      name: "Đào Tạo Tiếng Anh Doanh Nghiệp",
      description: "Giải pháp đào tạo ngoại ngữ chuyên biệt theo đặc thù ngành nghề của từng tập đoàn.",
      icon: "Briefcase",
      sortOrder: 6,
    },
    {
      slug: "toefl-sat-du-hoc",
      name: "Luyện Thi TOEFL & SAT Săn Học Bổng",
      description: "Chương trình chuẩn hóa dành cho học sinh chuẩn bị hồ sơ du học các trường đại học top 100 thế giới.",
      icon: "Globe",
      sortOrder: 7,
    },
    {
      slug: "lop-kem-1-on-1",
      name: "Lớp Kèm Trực Tiếp 1-kèm-1",
      description: "Lộ trình cá nhân hóa 100%, tối ưu hóa tốc độ tiến bộ theo thời gian biểu của riêng bạn.",
      icon: "UserCheck",
      sortOrder: 8,
    },
  ];

  const categories = await Promise.all(
    categoriesData.map((c) => prisma.courseCategory.create({ data: c }))
  );
  console.log(`✅ Seeded ${categories.length} course categories`);

  // Map category by slug
  const catMap = new Map(categories.map((c) => [c.slug, c.id]));

  // 4. Courses (10 comprehensive courses)
  const coursesData = [
    {
      slug: "smartkids-kindergarten-foundation",
      name: "SmartKids Foundation — Khởi Đầu Vững Chắc",
      shortDescription: "Chương trình tiếng Anh mầm non vui học, phát âm chuẩn qua phương pháp ngữ âm Phonics chuẩn Cambridge.",
      description: "SmartKids Foundation được thiết kế đặc thù cho các bé lứa tuổi 4-6 nhằm tạo dựng phản xạ ngôn ngữ thứ hai tự nhiên như tiếng mẹ đẻ. Thông qua bài hát, câu chuyện và hình ảnh minh họa sinh động, trẻ tiếp thu từ vựng một cách hào hứng không gò bó.",
      categoryId: catMap.get("smartkids-mam-non")!,
      targetAudience: "Trẻ em từ 4 đến 6 tuổi chưa từng tiếp xúc hoặc mới làm quen tiếng Anh",
      minimumAge: 4,
      maximumAge: 6,
      level: "Pre-Starters",
      CEFRLevel: "Pre-A1",
      duration: "3 tháng / Khóa (48 giờ học)",
      numberOfSessions: 24,
      teachingMethod: "Play-based Learning & TPR (Total Physical Response)",
      classSize: "10 - 12 bé",
      learningMaterials: "Giáo trình độc quyền hợp tác National Geographic Learning + Bộ flashcard tương tác",
      featuredImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: true,
      ctaText: "Đăng ký học thử miễn phí",
      seoTitle: "Khóa Học Tiếng Anh Mầm Non SmartKids (4-6 Tuổi) | AURA Academy",
      seoDescription: "Chương trình tiếng Anh mầm non 4-6 tuổi chuẩn Cambridge, phát triển toàn diện tư duy và phát âm chuẩn quốc tế từ bé.",
      curriculums: [
        { title: "Khởi động âm chuẩn Phonics", description: "Làm quen với 26 chữ cái và các âm cơ bản thông qua bài hát động tác vui nhộn.", sessionsCount: 6, orderIndex: 1 },
        { title: "Chủ đề Gia đình & Bạn bè", description: "Mở rộng vốn từ vựng gia đình, đồ chơi quen thuộc, tập chào hỏi và tự giới thiệu tên tuổi.", sessionsCount: 6, orderIndex: 2 },
        { title: "Thế giới Động vật & Màu sắc", description: "Khám phá thế giới muông thú kỳ thú, phân biệt màu sắc và kích thước bằng tiếng Anh.", sessionsCount: 6, orderIndex: 3 },
        { title: "Ngày hội Tổng kết & Tự tin Thuyết trình Nhí", description: "Bé tự tin biểu diễn bài hát tiếng Anh và chia sẻ tranh vẽ yêu thích trước phụ huynh.", sessionsCount: 6, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Nhận biết và phát âm chính xác 44 âm vị cơ bản trong bảng Phonics tiếng Anh", orderIndex: 1 },
        { description: "Ghi nhớ và phản xạ tự nhiên hơn 200 từ vựng gần gũi trong đời sống hàng ngày", orderIndex: 2 },
        { description: "Tự tin giao tiếp các câu ngắn với giáo viên bản ngữ không chút e ngại", orderIndex: 3 },
      ],
      faqs: [
        { question: "Bé chưa biết chữ tiếng Việt có học được tiếng Anh không?", answer: "Hoàn toàn học được! Trẻ 4-6 tuổi tiếp thu ngôn ngữ qua kênh nghe - nhìn - vận động theo cơ chế thẩm thấu tự nhiên tương tự như học tiếng mẹ đẻ.", orderIndex: 1 },
        { question: "Lớp học có giáo viên người Việt hỗ trợ không?", answer: "Mỗi lớp luôn có 01 Giáo viên Bản ngữ đứng lớp chính cùng 01 Trợ giảng người Việt chuyên môn cao để chăm sóc và hỗ trợ bé kịp thời.", orderIndex: 2 },
      ],
    },
    {
      slug: "superkids-cambridge-primary",
      name: "SuperKids Primary — Tiếng Anh Tiểu Học Toàn Diện",
      shortDescription: "Chương trình chuẩn bị nền tảng Cambridge Starters, Movers, Flyers vững chắc cho học sinh tiểu học.",
      description: "SuperKids Primary tích hợp công nghệ giảng dạy kỹ thuật số và bộ giáo trình chuẩn Cambridge, giúp học sinh 6-11 tuổi làm chủ 4 kỹ năng Nghe - Nói - Đọc - Viết, sẵn sàng chinh phục điểm tối đa trong các kỳ thi lấy chứng chỉ quốc tế.",
      categoryId: catMap.get("superkids-tieu-hoc")!,
      targetAudience: "Học sinh lớp 1 đến lớp 5",
      minimumAge: 6,
      maximumAge: 11,
      level: "A1 - A2",
      CEFRLevel: "A1",
      duration: "4 tháng / Khóa (64 giờ học)",
      numberOfSessions: 32,
      teachingMethod: "CLIL (Content and Language Integrated Learning)",
      classSize: "12 - 15 học viên",
      learningMaterials: "Cambridge Primary English & Phần mềm luyện thi mô phỏng AURA SmartLMS",
      featuredImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: true,
      ctaText: "Kiểm tra trình độ miễn phí",
      seoTitle: "Khóa Học Tiếng Anh Tiểu Học SuperKids Cambridge | AURA Academy",
      seoDescription: "Tiếng Anh tiểu học 6-11 tuổi luyện thi Cambridge Starters, Movers, Flyers. Học cùng giáo viên bản ngữ tại AURA.",
      curriculums: [
        { title: "Nâng cấp Ngữ pháp & Cấu trúc Câu Cơ bản", description: "Hệ thống hóa ngữ pháp tiểu học, làm chủ các thì cơ bản và mở rộng vốn từ vựng học đường.", sessionsCount: 8, orderIndex: 1 },
        { title: "Chiến thuật Đọc hiểu & Kỹ năng Viết đoạn", description: "Rèn luyện tư duy phân tích đoạn văn và kỹ thuật viết miêu tả ngắn theo chuẩn Cambridge.", sessionsCount: 8, orderIndex: 2 },
        { title: "Phản xạ Nghe - Nói Tốc độ Cao", description: "Luyện nghe các giọng bản xứ đa dạng (Anh - Mỹ - Úc) và thực hành phỏng vấn 1-1 với giáo viên nước ngoài.", sessionsCount: 8, orderIndex: 3 },
        { title: "Luyện đề Thực chiến Mô phỏng Kỳ thi Thật", description: "Làm quen với format đề thi Starters/Movers/Flyers, giải tỏa áp lực thi cử và tối ưu điểm số.", sessionsCount: 8, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Tự tin đạt từ 14-15 Khiên trong kỳ thi Cambridge Starters/Movers/Flyers", orderIndex: 1 },
        { description: "Khả năng đọc hiểu độc lập các mẩu truyện ngắn và viết đoạn văn miêu tả từ 50-80 từ", orderIndex: 2 },
        { description: "Nâng cao điểm số môn tiếng Anh tại trường phổ thông lên mức 9.0+", orderIndex: 3 },
      ],
      faqs: [
        { question: "Trung tâm có tổ chức thi lấy chứng chỉ Cambridge thật không?", answer: "AURA là đối tác đăng ký khảo thí chính thức của Cambridge Assessment English, học viên được thi ngay tại trung tâm với hội đồng thi tiêu chuẩn.", orderIndex: 1 },
      ],
    },
    {
      slug: "young-leaders-academic-english",
      name: "Young Leaders — Tiếng Anh Học Thuật & Tư Duy Phản Biện",
      shortDescription: "Bứt phá kỹ năng thuyết trình, tranh biện và xây dựng tư duy phản biện cho học sinh THCS.",
      description: "Chương trình trang bị kỹ năng thế kỷ 21: Giao tiếp, Hợp tác, Tư duy phản biện và Sáng tạo. Giúp các em chuẩn bị bước đệm vững chắc trước khi bước vào các kỳ thi quốc tế như KET, PET và tiền đề luyện IELTS.",
      categoryId: catMap.get("young-leaders-thieu-nien")!,
      targetAudience: "Học sinh THCS từ 11 đến 15 tuổi",
      minimumAge: 11,
      maximumAge: 15,
      level: "A2 - B1",
      CEFRLevel: "B1",
      duration: "4 tháng / Khóa",
      numberOfSessions: 32,
      teachingMethod: "Project-Based Learning & Academic Debate",
      classSize: "12 - 16 học viên",
      learningMaterials: "Oxford Solutions & Bộ tài liệu tranh biện học thuật AURA",
      featuredImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: true,
      ctaText: "Nhận tư vấn lộ trình học",
      seoTitle: "Tiếng Anh Thiếu Niên Young Leaders (11-15 Tuổi) | AURA Academy",
      seoDescription: "Phát triển tư duy phản biện và kỹ năng học thuật cho học sinh cấp 2, bước đệm hoàn hảo để chinh phục IELTS 7.0+.",
      curriculums: [
        { title: "Phương pháp Thuyết trình & Hùng biện tiếng Anh", description: "Làm chủ cấu trúc bài thuyết trình, ngôn ngữ cơ thể và kỹ thuật lôi cuốn người nghe.", sessionsCount: 8, orderIndex: 1 },
        { title: "Nghiên cứu Dự án Xã hội & Khoa học", description: "Làm việc nhóm giải quyết các vấn đề thực tiễn như môi trường, công nghệ và phát triển bền vững.", sessionsCount: 8, orderIndex: 2 },
        { title: "Ngữ pháp Học thuật Nâng cao & Viết Luận", description: "Khai thác bài luận nghị luận xã hội, rèn luyện mạch lạc và liên kết câu.", sessionsCount: 8, orderIndex: 3 },
        { title: "Kỹ năng Tranh biện Đối kháng (British Parliamentary)", description: "Thực hành phản biện đối kháng theo luật tranh biện quốc tế với ban giám khảo chuyên nghiệp.", sessionsCount: 8, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Đạt trình độ tương đương B1 - B2 CEFR, sẵn sàng bước vào khóa IELTS 5.5+", orderIndex: 1 },
        { description: "Tự tin nói và tranh luận trước đám đông hoàn toàn bằng tiếng Anh", orderIndex: 2 },
        { description: "Phát triển kỹ năng lãnh đạo và tư duy độc lập khi giải quyết vấn đề", orderIndex: 3 },
      ],
      faqs: [
        { question: "Khóa học có bổ trợ kiến thức thi vào lớp 10 chuyên Anh không?", answer: "Có! Nội dung khóa học bao gồm các chuyên đề ngữ pháp chuyên sâu và từ vựng nâng cao rất sát với cấu trúc đề thi tuyển sinh lớp 10 chuyên.", orderIndex: 1 },
      ],
    },
    {
      slug: "ielts-mastery-intensive",
      name: "IELTS Mastery Intensive — Cam Kết Đầu Ra 6.5 - 7.5+",
      shortDescription: "Lộ trình luyện thi IELTS cá nhân hóa, chiến thuật giải đề thông minh cùng chuyên gia luyện thi hàng đầu.",
      description: "Khóa học tập trung giải quyết triệt để điểm nghẽn ở hai kỹ năng Writing & Speaking. Học viên được sửa bài 1-1 không giới hạn, thi thử trên máy tính với hệ thống ngân hàng đề thi thật cập nhật liên tục hàng quý.",
      categoryId: catMap.get("ielts-chuyen-sau")!,
      targetAudience: "Học sinh THPT, sinh viên đại học và người đi làm mục tiêu du học hoặc định cư",
      minimumAge: 15,
      maximumAge: 45,
      level: "Intermediate to Advanced",
      CEFRLevel: "B2 - C1",
      duration: "3.5 tháng / Khóa (70 giờ)",
      numberOfSessions: 30,
      teachingMethod: "Scaffolding & Intensive 1-1 Feedback",
      classSize: "8 - 12 học viên",
      learningMaterials: "Cambridge IELTS 16-19 + Kho đề thi thật AURA IELTS Bank độc quyền",
      featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: true,
      ctaText: "Đăng ký thi thử IELTS miễn phí",
      seoTitle: "Luyện Thi IELTS Chuyên Sâu Cam Kết Đầu Ra 6.5 - 7.5+ | AURA Academy",
      seoDescription: "Khóa luyện thi IELTS chuyên sâu với đội ngũ giáo viên 8.5+ IELTS, chấm sửa Writing và Speaking 1-1 không giới hạn.",
      curriculums: [
        { title: "Writing Task 1 & Task 2 Mastery", description: "Bẻ khóa các dạng biểu đồ Task 1 và làm chủ tư duy lập luận logic 4 tiêu chí chấm điểm trong Task 2.", sessionsCount: 10, orderIndex: 1 },
        { title: "Speaking Fluency & Lexical Precision", description: "Luyện phản xạ Part 1, 2, 3 tự nhiên không cần học vẹt, nâng cấp Idioms và Collocations học thuật.", sessionsCount: 8, orderIndex: 2 },
        { title: "Listening & Reading Speed Hack", description: "Kỹ thuật Skimming, Scanning, định vị bẫy Paraphrase và quản lý thời gian thi tối ưu.", sessionsCount: 6, orderIndex: 3 },
        { title: "Full Mock Test & 1-1 Post-Exam Analysis", description: "Thi thử trọn vẹn 4 kỹ năng áp lực thời gian thật và nhận bản phân tích lỗi sai chi tiết từ giảng viên.", sessionsCount: 6, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Tăng từ 0.5 đến 1.5 Band score sau một lộ trình học có cam kết văn bản", orderIndex: 1 },
        { description: "Thành thạo chiến thuật xử lý 100% các dạng bài trong cả 4 kỹ năng IELTS", orderIndex: 2 },
        { description: "Khả năng viết bài luận chuẩn chỉnh đạt band 7.0+ mạch lạc và giàu sức thuyết phục", orderIndex: 3 },
      ],
      faqs: [
        { question: "Nếu không đạt điểm mục tiêu có được học lại không?", answer: "AURA ký hợp đồng cam kết đầu ra bằng văn bản. Nếu học viên đi học đầy đủ và làm đủ bài tập mà không đạt điểm sẽ được học lại hoàn toàn miễn phí.", orderIndex: 1 },
        { question: "Writing có được chấm chi tiết theo tiêu chuẩn giám khảo không?", answer: "Tất cả bài viết được chấm và sửa lỗi từng câu, chú giải lỗi Grammar, Vocabulary và Cohesion theo đúng Band Descriptors của Hội đồng Khảo thí Cambridge.", orderIndex: 2 },
      ],
    },
    {
      slug: "italk-business-communication",
      name: "iTalk Business — Tiếng Anh Giao Tiếp Đi Làm Đỉnh Cao",
      shortDescription: "Chủ động lịch học, tự tin đàm phán, thuyết trình và viết email công sở chuyên nghiệp.",
      description: "Chương trình thiết kế dành riêng cho người bận rộn với hơn 365 chủ đề công sở thực tiễn: Đàm phán giá, phỏng vấn xin việc, thuyết trình dự án, xử lý khiếu nại khách hàng quốc tế. Linh hoạt đặt lịch học trước 2 giờ.",
      categoryId: catMap.get("tieng-anh-giao-tiep")!,
      targetAudience: "Người đi làm, quản lý, doanh nhân cần giao tiếp đối tác quốc tế",
      minimumAge: 20,
      maximumAge: 60,
      level: "Pre-Intermediate to Upper-Intermediate",
      CEFRLevel: "B1 - B2",
      duration: "3 tháng (Linh hoạt 30 buổi)",
      numberOfSessions: 30,
      teachingMethod: "Task-Based Workplace Simulation",
      classSize: "6 - 10 học viên",
      learningMaterials: "Market Leader Pearson + Case studies từ Harvard Business Review",
      featuredImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: true,
      ctaText: "Nhận lịch học linh hoạt",
      seoTitle: "Tiếng Anh Giao Tiếp Người Đi Làm iTalk Business | AURA Academy",
      seoDescription: "Khóa học tiếng Anh công sở linh hoạt lịch học. Tự tin thuyết trình, đàm phán và gửi email chuẩn quốc tế.",
      curriculums: [
        { title: "Nghệ thuật Viết Email & Báo cáo Chuyên nghiệp", description: "Quy chuẩn viết thư tín thương mại, đề xuất dự án và xử lý từ chối khéo léo.", sessionsCount: 8, orderIndex: 1 },
        { title: "Kỹ năng Thuyết trình Dự án Trước Đối tác", description: "Bố cục bài thuyết trình lôi cuốn, giải thích biểu đồ số liệu và trả lời Q&A nhạy bén.", sessionsCount: 8, orderIndex: 2 },
        { title: "Đàm phán & Thương lượng Hợp đồng", description: "Thuật ngữ kinh doanh, chiến thuật nhượng bộ và chốt thỏa thuận có lợi.", sessionsCount: 8, orderIndex: 3 },
        { title: "Networking & Small Talk Trong Môi trường Đa văn hóa", description: "Phá băng giao tiếp trong các buổi tiệc chiêu đãi và hội nghị quốc tế.", sessionsCount: 6, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Xóa bỏ rào cản sợ nói, giao tiếp lưu loát trôi chảy với đồng nghiệp và sếp nước ngoài", orderIndex: 1 },
        { description: "Soạn thảo email và báo cáo công việc chuẩn ngữ điệu thương mại trong vòng 10 phút", orderIndex: 2 },
        { description: "Mở rộng cơ hội thăng tiến lên các vị trí quản lý cấp cao trong các tập đoàn đa quốc gia", orderIndex: 3 },
      ],
      faqs: [
        { question: "Nếu bận công tác đột xuất có bị mất buổi học không?", answer: "Hệ thống AURA Flex cho phép học viên hủy hoặc dời lịch học trước 2 giờ mà không bị trừ buổi.", orderIndex: 1 },
      ],
    },
    {
      slug: "corporate-english-solutions",
      name: "Corporate English — Giải Pháp Đào Tạo Doanh Nghiệp",
      shortDescription: "Thiết kế may đo theo đặc thù ngành hàng (Ngân hàng, IT, Logistics, Khách sạn, Bất động sản).",
      description: "Được tin dùng bởi hơn 200 doanh nghiệp hàng đầu tại Việt Nam. Chương trình khảo sát nhu cầu chuyên sâu, đo lường ROI năng lực nhân sự trước và sau khóa học rõ ràng.",
      categoryId: catMap.get("tieng-anh-doanh-nghiep")!,
      targetAudience: "Nhóm nhân sự, đội ngũ lãnh đạo và cán bộ công nhân viên các doanh nghiệp",
      minimumAge: 22,
      maximumAge: 65,
      level: "Tất cả các cấp độ",
      CEFRLevel: "A2 - C1",
      duration: "Tùy biến theo hợp đồng doanh nghiệp",
      numberOfSessions: 24,
      teachingMethod: "Industry-Tailored On-site / Online Hybrid",
      classSize: "10 - 20 nhân viên",
      learningMaterials: "Tài liệu thiết kế may đo độc quyền cho từng doanh nghiệp",
      featuredImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: false,
      ctaText: "Liên hệ tư vấn doanh nghiệp",
      seoTitle: "Đào Tạo Tiếng Anh Doanh Nghiệp May Đo Theo Ngành | AURA Academy",
      seoDescription: "Giải pháp đào tạo tiếng Anh doanh nghiệp chất lượng cao, tối ưu chi phí và nâng cao năng suất làm việc quốc tế.",
      curriculums: [
        { title: "Đánh giá Năng lực Ban đầu (Pre-Assessment)", description: "Kiểm tra trình độ toàn bộ nhân sự theo khung chuẩn CEFR và phân nhóm năng lực tối ưu.", sessionsCount: 4, orderIndex: 1 },
        { title: "Đào tạo Tiếng Anh Chuyên Ngành Cốt Lõi", description: "Học theo giáo trình thiết kế riêng sát thực tế công việc hàng ngày của công ty.", sessionsCount: 16, orderIndex: 2 },
        { title: "Đánh giá Sau Khóa & Báo cáo ROI Chi tiết", description: "Báo cáo chi tiết mức độ tiến bộ của từng nhân viên gửi cho Ban Giám đốc và phòng HR.", sessionsCount: 4, orderIndex: 3 },
      ],
      outcomes: [
        { description: "Nâng cao năng suất làm việc với đối tác quốc tế thêm ít nhất 30%", orderIndex: 1 },
        { description: "Đồng bộ hóa chuẩn mực giao tiếp tiếng Anh chuyên nghiệp trên toàn công ty", orderIndex: 2 },
      ],
      faqs: [
        { question: "Giáo viên có thể đến dạy trực tiếp tại văn phòng công ty không?", answer: "AURA cung cấp cả hai hình thức: giáo viên đến giảng dạy tại văn phòng quý công ty hoặc học viên đến các cơ sở hiện đại của AURA.", orderIndex: 1 },
      ],
    },
    {
      slug: "sat-ivy-league-preparation",
      name: "Digital SAT Ivy League — Bứt Phá Điểm Số 1500+",
      shortDescription: "Chiến thuật chinh phục kỳ thi Digital SAT với ngân hàng câu hỏi thuật toán thích ứng tiên tiến.",
      description: "Được dẫn dắt bởi thủ khoa SAT và cựu du học sinh các trường top Ivy League. Khóa học giải mã toàn bộ mẹo toán học nâng cao và kỹ năng đọc hiểu phân tích văn bản học thuật khó.",
      categoryId: catMap.get("toefl-sat-du-hoc")!,
      targetAudience: "Học sinh lớp 9 - 12 có định hướng săn học bổng du học Mỹ, Canada, Châu Âu",
      minimumAge: 14,
      maximumAge: 18,
      level: "Advanced",
      CEFRLevel: "B2 - C1",
      duration: "3 tháng (60 giờ)",
      numberOfSessions: 24,
      teachingMethod: "Adaptive Digital Problem Solving",
      classSize: "8 - 10 học viên",
      learningMaterials: "Bluebook CollegeBoard + Bộ đề độc quyền AURA SAT Experts",
      featuredImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: false,
      ctaText: "Đăng ký test SAT thử",
      seoTitle: "Luyện Thi Digital SAT 1500+ Du Học Mỹ | AURA Academy",
      seoDescription: "Chương trình luyện thi Digital SAT điểm cao săn học bổng đại học Mỹ hàng đầu thế giới cùng AURA Academy.",
      curriculums: [
        { title: "Reading & Writing Module: Rhetoric & Syntax", description: "Phân tích cấu trúc luận đề, bẫy từ vựng ngữ cảnh và logic suy luận văn bản phức tạp.", sessionsCount: 12, orderIndex: 1 },
        { title: "Math Module: Advanced Algebra & Geometry", description: "Tối ưu hóa thời gian tính toán với máy tính Desmos và bẫy đề toán khó.", sessionsCount: 12, orderIndex: 2 },
      ],
      outcomes: [
        { description: "Mục tiêu tối thiểu 1450+ đến 1550+ trên thang điểm 1600 Digital SAT", orderIndex: 1 },
        { description: "Tư vấn hồ sơ và bài luận săn học bổng du học miễn phí cùng chuyên gia", orderIndex: 2 },
      ],
      faqs: [
        { question: "Khóa học có cập nhật cấu trúc thi Digital SAT mới nhất không?", answer: "100% tài liệu và phần mềm thi thử đều bám sát định dạng Digital SAT mới nhất trên ứng dụng Bluebook của College Board.", orderIndex: 1 },
      ],
    },
    {
      slug: "private-one-on-one-mentoring",
      name: "VIP 1-on-1 Mentoring — Kèm Riêng Cá Nhân Hóa Toàn Diện",
      shortDescription: "Chương trình học một kèm một cao cấp với lộ trình và giáo viên theo yêu cầu riêng của bạn.",
      description: "Giải pháp tối ưu cho học viên cần bứt phá cấp tốc trong thời gian ngắn để đi du học, định cư hoặc bảo vệ luận án tốt nghiệp. Giờ học 100% chủ động theo quỹ thời gian của bạn.",
      categoryId: catMap.get("lop-kem-1-on-1")!,
      targetAudience: "Học viên mọi độ tuổi có mục tiêu cụ thể và thời gian eo hẹp",
      minimumAge: 6,
      maximumAge: 70,
      level: "Mọi trình độ từ Mất gốc đến Nâng cao",
      CEFRLevel: "Tùy biến",
      duration: "Linh hoạt theo gói 20, 40 hoặc 60 giờ",
      numberOfSessions: 20,
      teachingMethod: "Direct Mentorship & Real-Time Correction",
      classSize: "1 học viên / 1 thầy cô",
      learningMaterials: "May đo hoàn toàn theo mục tiêu cá nhân",
      featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: false,
      ctaText: "Đặt lịch tư vấn 1-kèm-1",
      seoTitle: "Lớp Tiếng Anh Kèm Riêng 1 Kèm 1 Cấp Tốc | AURA Academy",
      seoDescription: "Khóa học tiếng Anh kèm riêng 1 kèm 1 chất lượng cao. Học trực tiếp với giáo viên bản ngữ giàu kinh nghiệm.",
      curriculums: [
        { title: "Phỏng vấn & Thiết kế Lộ trình May đo", description: "Giám đốc học thuật trực tiếp kiểm tra và lên giáo trình riêng trong 24 giờ.", sessionsCount: 2, orderIndex: 1 },
        { title: "Học Chuyên sâu Mục tiêu Trọng tâm", description: "Tập trung giải quyết 100% điểm yếu của riêng học viên, sửa lỗi trực tiếp từng giây.", sessionsCount: 16, orderIndex: 2 },
        { title: "Tổng duyệt & Đánh giá Hoàn thành Mục tiêu", description: "Thi thử sát hạch mô phỏng kỳ thi thật và cấp chứng chỉ xác nhận năng lực.", sessionsCount: 2, orderIndex: 3 },
      ],
      outcomes: [
        { description: "Tiến bộ nhanh gấp 3 lần so với các lớp học đại trà đông người", orderIndex: 1 },
        { description: "Hoàn toàn tự tin đạt được mục tiêu ngôn ngữ trong thời gian ngắn nhất", orderIndex: 2 },
      ],
      faqs: [
        { question: "Tôi có thể yêu cầu đổi giáo viên nếu không hợp không?", answer: "Học viên được quyền trải nghiệm và yêu cầu đổi giảng viên phù hợp nhất trong 03 buổi học đầu tiên.", orderIndex: 1 },
      ],
    },
    {
      slug: "ielts-foundation-express",
      name: "IELTS Foundation — Khởi Động IELTS Từ Con Số 0",
      shortDescription: "Xây dựng lại toàn bộ nền tảng từ vựng, ngữ pháp và phát âm chuẩn học thuật cho người mất gốc.",
      description: "Thiết kế cho người mới bắt đầu hoặc học sinh mất gốc tiếng Anh. Giúp học viên vượt qua nỗi sợ tiếng Anh, lấy lại gốc rễ ngữ pháp và đạt trình độ tương đương 4.5 - 5.0 IELTS.",
      categoryId: catMap.get("ielts-chuyen-sau")!,
      targetAudience: "Người mất gốc, học sinh sinh viên cần tạo nền tảng trước khi bước vào luyện thi IELTS",
      minimumAge: 14,
      maximumAge: 40,
      level: "Beginner",
      CEFRLevel: "A2 - B1",
      duration: "3 tháng / Khóa",
      numberOfSessions: 24,
      teachingMethod: "Foundational Grammar & Phonetic Drills",
      classSize: "10 - 14 học viên",
      learningMaterials: "Grammar in Use Cambridge & AURA Pre-IELTS Vocab",
      featuredImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: false,
      ctaText: "Đăng ký xếp lớp cơ bản",
      seoTitle: "Khóa Học IELTS Foundation Cho Người Mất Gốc | AURA Academy",
      seoDescription: "Xây gốc tiếng Anh chuẩn học thuật, phát âm chuẩn IPA và tự tin đạt band 4.5-5.0 IELTS trong 3 tháng.",
      curriculums: [
        { title: "Chuẩn hóa Hệ thống Ngữ âm IPA", description: "Sửa triệt để phát âm sai, nối âm, nuốt âm và trọng âm từ cơ bản.", sessionsCount: 6, orderIndex: 1 },
        { title: "Ngữ pháp Trọng tâm 12 Thì & Mệnh đề Quan hệ", description: "Học ngữ pháp ứng dụng, không học vẹt công thức khô khan.", sessionsCount: 8, orderIndex: 2 },
        { title: "Nạp 1000 Từ vựng Học thuật Academic Word List", description: "Phương pháp ghi nhớ từ vựng qua Spaced Repetition và ngữ cảnh thực tế.", sessionsCount: 10, orderIndex: 3 },
      ],
      outcomes: [
        { description: "Nắm vững 100% ngữ pháp và cấu trúc câu nền tảng cần có của bài thi IELTS", orderIndex: 1 },
        { description: "Đạt band điểm 4.5 - 5.0 IELTS sau 3 tháng học tập nghiêm túc", orderIndex: 2 },
      ],
      faqs: [
        { question: "Mất gốc hoàn toàn có theo kịp không?", answer: "Giáo trình được thiết kế từ mức độ nhận biết dễ nhất với sự kèm cặp sát sao của trợ giảng hỗ trợ sau giờ học.", orderIndex: 1 },
      ],
    },
    {
      slug: "smartkids-kindergarten-advanced",
      name: "SmartKids Discovery — Tự Tin Khám Phá Khoa Học Bằng Tiếng Anh",
      shortDescription: "Dành cho bé 5-6 tuổi đã có phản xạ tiếng Anh, tích hợp kiến thức khoa học STEAM kỳ thú.",
      description: "Giúp trẻ mầm non không chỉ học tiếng Anh mà học khoa học, toán tư duy và nghệ thuật bằng tiếng Anh (STEAM). Phát triển khả năng quan sát và đặt câu hỏi 'Why?' tự nhiên.",
      categoryId: catMap.get("smartkids-mam-non")!,
      targetAudience: "Trẻ 5 - 6 tuổi đã học qua lớp mầm non cơ bản",
      minimumAge: 5,
      maximumAge: 6,
      level: "Starters Foundation",
      CEFRLevel: "Pre-A1",
      duration: "3 tháng / Khóa",
      numberOfSessions: 24,
      teachingMethod: "STEAM English Exploration",
      classSize: "10 - 12 học viên",
      learningMaterials: "Our World National Geographic + Bộ thí nghiệm nhí STEAM",
      featuredImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      featured: false,
      ctaText: "Đăng ký trải nghiệm STEAM",
      seoTitle: "Khóa Học SmartKids Discovery Khoa Học STEAM | AURA Academy",
      seoDescription: "Tiếng Anh mầm non kết hợp khoa học STEAM cho bé 5-6 tuổi. Khám phá thế giới tự nhiên cùng giáo viên nước ngoài.",
      curriculums: [
        { title: "Khám phá Cơ thể & Giác quan của Bé", description: "Bé học gọi tên các bộ phận và làm thí nghiệm cảm giác kỳ thú.", sessionsCount: 6, orderIndex: 1 },
        { title: "Hành tinh Xanh & Thời tiết", description: "Tìm hiểu về mây, mưa, cầu vồng và cách phân loại rác bảo vệ môi trường.", sessionsCount: 6, orderIndex: 2 },
        { title: "Toán học Vui & Hình khối Không gian", description: "Đếm số, so sánh to - nhỏ, cao - thấp và ghép các khối hình nghệ thuật.", sessionsCount: 6, orderIndex: 3 },
        { title: "Nhà Khoa Học Nhí Tự Tin Biểu Diễn Thí Nghiệm", description: "Bé mặc áo blouse trắng và tự hào thuyết minh thí nghiệm nhỏ bằng tiếng Anh.", sessionsCount: 6, orderIndex: 4 },
      ],
      outcomes: [
        { description: "Khả năng nói các câu ghép dài hơn và diễn đạt suy nghĩ một cách tự nhiên", orderIndex: 1 },
        { description: "Khơi dậy tính tò mò, tư duy logic và niềm say mê khám phá thế giới xung quanh", orderIndex: 2 },
      ],
      faqs: [
        { question: "Thí nghiệm có đảm bảo an toàn cho trẻ không?", answer: "100% dụng cụ và nguyên liệu thí nghiệm đều là sản phẩm tự nhiên, an toàn tuyệt đối dưới sự hướng dẫn tỉ mỉ của giáo viên.", orderIndex: 1 },
      ],
    },
  ];

  for (const c of coursesData) {
    const { curriculums, outcomes, faqs, ...courseData } = c;
    await prisma.course.create({
      data: {
        ...courseData,
        curriculums: {
          create: curriculums,
        },
        outcomes: {
          create: outcomes,
        },
        faqs: {
          create: faqs,
        },
      },
    });
  }
  console.log(`✅ Seeded ${coursesData.length} comprehensive courses`);

  // 5. Centers (4 strategic campuses)
  const centersData = [
    {
      slug: "aura-nguyen-thi-minh-khai-q1",
      name: "Cơ Sở AURA Quận 1 — Flagship Campus",
      province: "Hồ Chí Minh",
      district: "Quận 1",
      ward: "Phường Đa Kao",
      address: "189 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
      latitude: 10.7712,
      longitude: 106.6908,
      phone: "028 3822 6886",
      email: "q1@aura.edu.vn",
      openingHours: "07:30 - 21:30 (Thứ 2 - Chủ Nhật)",
      description: "Cơ sở cờ đầu với không gian học tập hiện đại đạt chuẩn quốc tế NEAS. Tòa nhà 7 tầng trang bị phòng lab máy tính Apple, thư viện hơn 10.000 đầu sách tiếng Anh và khu vực tương tác sáng tạo cho trẻ nhỏ.",
      facilities: "Phòng thi IELTS máy tính, Thư viện AURA Hub, Khu vui chơi SmartKids, Phòng lab Multimedia, Căng tin học viên, Bãi đỗ xe ô tô",
      GoogleMapsURL: "https://maps.google.com/?q=10.7712,106.6908",
      active: true,
      seoTitle: "Trung Tâm Tiếng Anh AURA Quận 1 TP.HCM | Flagship Campus",
      seoDescription: "Cơ sở tiếng Anh AURA Nguyễn Thị Minh Khai Quận 1. Đạt chuẩn NEAS, phòng thi IELTS máy tính hiện đại.",
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80", caption: "Sảnh đón tiếp và tư vấn AURA Flagship Quận 1", isCover: true, orderIndex: 1 },
        { imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80", caption: "Phòng học tương tác đa phương tiện", isCover: false, orderIndex: 2 },
      ],
    },
    {
      slug: "aura-cong-hoa-tan-binh",
      name: "Cơ Sở AURA Tân Bình — Cộng Hòa Campus",
      province: "Hồ Chí Minh",
      district: "Quận Tân Bình",
      ward: "Phường 13",
      address: "428 Cộng Hòa, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh",
      latitude: 10.8016,
      longitude: 106.6453,
      phone: "028 3810 6886",
      email: "tanbinh@aura.edu.vn",
      openingHours: "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
      description: "Tọa lạc ngay mặt tiền tuyến đường sầm uất Cộng Hòa, thuận tiện đưa đón học sinh các trường tiểu học và THCS lân cận. Cơ sở sở hữu khu vực luyện thi Cambridge chuyên biệt và sân chơi khoa học ngoài trời.",
      facilities: "Phòng học SmartScreen 85 inch, Góc đọc sách Reader Club, Phòng chờ phụ huynh sang trọng, Wifi tốc độ cao",
      GoogleMapsURL: "https://maps.google.com/?q=10.8016,106.6453",
      active: true,
      seoTitle: "Trung Tâm Tiếng Anh AURA Cộng Hòa Tân Bình | AURA Academy",
      seoDescription: "Trung tâm tiếng Anh trẻ em và luyện thi IELTS tại Tân Bình. Cơ sở vật chất chuẩn quốc tế, giáo viên bản ngữ giàu kinh nghiệm.",
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80", caption: "Không gian lớp học SuperKids Tân Bình", isCover: true, orderIndex: 1 },
      ],
    },
    {
      slug: "aura-cau-giay-ha-noi",
      name: "Cơ Sở AURA Cầu Giấy — Hà Nội Campus",
      province: "Hà Nội",
      district: "Quận Cầu Giấy",
      ward: "Phường Dịch Vọng",
      address: "68 Trần Đăng Ninh, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
      latitude: 21.0368,
      longitude: 105.7925,
      phone: "024 3793 6886",
      email: "caugiay@aura.edu.vn",
      openingHours: "08:00 - 21:30 (Thứ 2 - Chủ Nhật)",
      description: "Trung tâm quy mô lớn tại trung tâm giáo dục Cầu Giấy Hà Nội, phục vụ nhu cầu học tiếng Anh học thuật và săn học bổng du học của học sinh, sinh viên thủ đô.",
      facilities: "Hội trường hội thảo 150 chỗ, Phòng thi thử IELTS cách âm, Phòng STEM Maker, Khu thể thao nhỏ",
      GoogleMapsURL: "https://maps.google.com/?q=21.0368,105.7925",
      active: true,
      seoTitle: "Trung Tâm Anh Ngữ AURA Cầu Giấy Hà Nội | Luyện Thi IELTS & Trẻ Em",
      seoDescription: "Cơ sở AURA Cầu Giấy Hà Nội - Đào tạo tiếng Anh chuẩn quốc tế cho mọi lứa tuổi.",
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80", caption: "Khuôn viên học tập sáng tạo AURA Cầu Giấy", isCover: true, orderIndex: 1 },
      ],
    },
    {
      slug: "aura-hai-chau-da-nang",
      name: "Cơ Sở AURA Đà Nẵng — Hải Châu Campus",
      province: "Đà Nẵng",
      district: "Quận Hải Châu",
      ward: "Phường Thạch Thang",
      address: "155 Quang Trung, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng",
      latitude: 16.0748,
      longitude: 108.2195,
      phone: "0236 388 6886",
      email: "danang@aura.edu.vn",
      openingHours: "08:00 - 21:00 (Thứ 2 - Chủ Nhật)",
      description: "Không gian học tập xanh mát bên dòng sông Hàn, môi trường lý tưởng khơi nguồn cảm hứng học ngoại ngữ cho học viên miền Trung.",
      facilities: "Vườn tiếng Anh ngoài trời, Không gian thuyết trình AURA Talk, Phòng tự học mở 24/7 cho học viên",
      GoogleMapsURL: "https://maps.google.com/?q=16.0748,108.2195",
      active: true,
      seoTitle: "Trung Tâm Tiếng Anh AURA Hải Châu Đà Nẵng | AURA Academy",
      seoDescription: "Hệ thống trung tâm Anh ngữ AURA Đà Nẵng. Cam kết chất lượng giảng dạy hàng đầu miền Trung.",
      images: [
        { imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80", caption: "Cơ sở AURA Hải Châu Đà Nẵng", isCover: true, orderIndex: 1 },
      ],
    },
  ];

  for (const c of centersData) {
    const { images, ...centerData } = c;
    await prisma.center.create({
      data: {
        ...centerData,
        images: {
          create: images,
        },
      },
    });
  }
  console.log(`✅ Seeded ${centersData.length} educational centers`);

  // 6. Teachers (6 international & Vietnamese senior specialists)
  const teachersData = [
    {
      slug: "david-harrison",
      name: "Thầy David Harrison",
      title: "Trưởng Ban Học Thuật Bản Ngữ & Chuyên Gia IELTS",
      bio: "Hơn 12 năm kinh nghiệm giảng dạy tại Anh, Singapore và Việt Nam. Thầy từng là chuyên gia khảo thí với phong cách truyền cảm hứng hài hước, giúp hàng ngàn học viên chinh phục mục tiêu IELTS 8.0+.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 12,
      featured: true,
      qualifications: [
        { name: "Master of Arts in Applied Linguistics", issuer: "University of Edinburgh, UK", year: 2014 },
        { name: "DELTA (Diploma in Teaching English to Speakers of Other Languages)", issuer: "Cambridge Assessment", year: 2016 },
      ],
    },
    {
      slug: "nguyen-thuy-linh",
      name: "Cô Nguyễn Thùy Linh (Ms. Sarah)",
      title: "Chuyên Gia Đào Tạo Cambridge Primary & Thạc Sĩ Giáo Dục",
      bio: "Cô Thùy Linh có hơn 9 năm đồng hành cùng học sinh tiểu học, giúp các bé làm quen tiếng Anh tự nhiên, phát âm chuẩn ngay từ những ngày đầu.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 9,
      featured: true,
      qualifications: [
        { name: "Master of Education in TESOL", issuer: "Monash University, Australia", year: 2017 },
        { name: "Chứng chỉ CELTA Xuất Sắc (Pass A)", issuer: "Cambridge English", year: 2018 },
        { name: "IELTS Overall 8.5 (Listening 9.0, Reading 9.0)", issuer: "IDP Vietnam", year: 2022 },
      ],
    },
    {
      slug: "michael-obrien",
      name: "Thầy Michael O'Brien",
      title: "Giảng Viên Cấp Cao Khối Giao Tiếp Doanh Nghiệp & iTalk",
      bio: "Cựu cố vấn truyền thông doanh nghiệp tại London, thầy Michael am hiểu sâu sắc văn hóa ứng xử công sở quốc tế và kỹ thuật đàm phán hợp đồng thương mại.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 10,
      featured: true,
      qualifications: [
        { name: "Bachelor of Business Administration", issuer: "University of Manchester", year: 2013 },
        { name: "CELTA Certificate", issuer: "International House London", year: 2015 },
      ],
    },
    {
      slug: "le-thi-ngoc-mai",
      name: "Cô Lê Thị Ngọc Mai",
      title: "Chuyên Gia Ngữ Âm Phonics & Phát Triển Trí Tuệ Mầm Non",
      bio: "Với sự kiên nhẫn và tình yêu thương trẻ vô bờ bến, cô Mai là người bạn thân thiết của các học viên SmartKids, khơi dậy tình yêu ngôn ngữ trong từng tiết học.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 7,
      featured: false,
      qualifications: [
        { name: "Cử nhân Sư Phạm Tiếng Anh Xuất Sắc", issuer: "Đại học Sư Phạm TP.HCM", year: 2018 },
        { name: "TESOL for Young Learners Certificate", issuer: "Oxford Teachers Academy", year: 2020 },
      ],
    },
    {
      slug: "richard-williams",
      name: "Thầy Richard Williams",
      title: "Chuyên Gia Luyện Thi SAT & Hùng Biện Quốc Tế",
      bio: "Thầy Richard từng hướng dẫn nhiều học sinh Việt Nam đoạt giải tranh biện quốc tế WSDC và giành học bổng toàn phần các đại học danh tiếng tại Mỹ.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 11,
      featured: true,
      qualifications: [
        { name: "Juris Doctor (JD)", issuer: "University of Melbourne", year: 2015 },
        { name: "SAT & ACT Master Trainer Certified", issuer: "Princeton Review Network", year: 2017 },
      ],
    },
    {
      slug: "tran-duc-tri",
      name: "Thầy Trần Đức Trí (Mr. Eric)",
      title: "Giảng Viên Trọng Điểm IELTS Writing & Speaking",
      bio: "Được mệnh danh là 'phù thủy giải đề IELTS Writing', thầy Trí giúp học viên thoát bẫy dịch Word-by-Word và xây dựng mạch lập luận sắc sảo.",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
      yearsExperience: 8,
      featured: false,
      qualifications: [
        { name: "IELTS 8.5 Overall (Writing 8.5)", issuer: "British Council", year: 2021 },
        { name: "Master of Applied Linguistics", issuer: "University of Queensland", year: 2019 },
      ],
    },
  ];

  for (const t of teachersData) {
    const { qualifications, ...teacherData } = t;
    await prisma.teacher.create({
      data: {
        ...teacherData,
        qualifications: {
          create: qualifications,
        },
      },
    });
  }
  console.log(`✅ Seeded ${teachersData.length} international & Vietnamese teachers`);

  // 7. Student Achievements (10 inspiring stories)
  const achievementsData = [
    { studentName: "Trần Minh Anh", score: "IELTS 8.5 Overall", certificateType: "IELTS", story: "Học sinh lớp 12 chuyên Anh đạt điểm số kỷ lục (Listening 9.0, Reading 9.0) và giành học bổng 100% ĐH Sydney sau khóa IELTS Mastery.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80", year: 2025, featured: true },
    { studentName: "Lê Hoàng Gia Hưng", score: "Flyers 15/15 Khiên", certificateType: "CAMBRIDGE", story: "Cậu bé 9 tuổi đạt trọn vẹn 15 Khiên kỳ thi Cambridge Flyers nhờ phản xạ giao tiếp tự nhiên cùng thầy cô tại cơ sở Quận 1.", avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=300&auto=format&fit=crop&q=80", year: 2025, featured: true },
    { studentName: "Nguyễn Đặng Phương Thảo", score: "IELTS 8.0 (Speaking 8.5)", certificateType: "IELTS", story: "Từ người e ngại khi phát âm, Phương Thảo bứt phá Speaking 8.5 và hiện là trợ giảng học thuật tại AURA.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80", year: 2025, featured: true },
    { studentName: "Vũ Bảo Khang", score: "SAT 1540 / 1600", certificateType: "SAT", story: "Chinh phục điểm số top 1% toàn cầu trong kỳ thi Digital SAT, nhận thư mời nhập học từ 4 trường đại học Top 30 Mỹ.", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80", year: 2025, featured: true },
    { studentName: "Phạm Hải Đăng", score: "IELTS 7.5 Sau 3 Tháng", certificateType: "IELTS", story: "Người đi làm bận rộn tăng từ 5.5 lên 7.5 IELTS chỉ sau 1 khóa học chuyên sâu, xuất sắc bảo vệ luận văn Thạc sĩ quốc tế.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80", year: 2024, featured: false },
    { studentName: "Đỗ Mai Chi", score: "Movers 15/15 Khiên", certificateType: "CAMBRIDGE", story: "Học viên tiêu biểu của khóa SuperKids Primary đạt điểm số tuyệt đối kỳ thi Cambridge Movers.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80", year: 2024, featured: false },
    { studentName: "Bùi Quốc Khánh", score: "IELTS 8.0 Overall", certificateType: "IELTS", story: "Học sinh THPT Cầu Giấy đạt 8.0 ngay lần thi đầu tiên, trúng tuyển thẳng Đại học Ngoại Thương.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80", year: 2024, featured: true },
    { studentName: "Hoàng Ngọc Trâm", score: "TOEIC 960 / 990", certificateType: "TOEIC", story: "Sinh viên năm 4 mở rộng cơ hội việc làm tại tập đoàn công nghệ đa quốc gia nhờ chứng chỉ TOEIC xuất sắc.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80", year: 2024, featured: false },
    { studentName: "Đinh Tuấn Kiệt", score: "Starters 15/15 Khiên", certificateType: "CAMBRIDGE", story: "Bé 6 tuổi hồn nhiên tự tin trò chuyện cùng giám khảo bản xứ, đạt tuyệt đối 15 Khiên Starters.", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80", year: 2025, featured: false },
    { studentName: "Lâm Uyên Nhi", score: "IELTS 7.5 (Writing 7.5)", certificateType: "IELTS", story: "Vượt qua rào cản ngữ pháp để đạt 7.5 Writing ấn tượng, thành công nhận học bổng Chevening danh giá.", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&q=80", year: 2025, featured: true },
  ];

  await prisma.studentAchievement.createMany({ data: achievementsData });
  console.log(`✅ Seeded ${achievementsData.length} student achievements`);

  // 8. Testimonials (8 genuine testimonials)
  const testimonialsData = [
    {
      authorName: "Chị Hoàng Thị Bích Thủy",
      relationship: "Phụ huynh bé Gia Hưng (Cambridge Flyers 15/15 Khiên)",
      quote: "Điều tôi thích nhất ở AURA là thầy cô luôn kiên nhẫn khích lệ con tự nói. Trước đây bé rất nhút nhát, sau 2 năm học ở AURA bé đã chủ động bắt chuyện với người nước ngoài ở sân bay và đạt điểm tuyệt đối 15 Khiên.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Anh Nguyễn Quang Vinh",
      relationship: "Giám Đốc Dự Án — TechCorp Vietnam (Học viên iTalk)",
      quote: "Lịch học linh hoạt của AURA là cứu cánh cho người bận rộn như tôi. Giảng viên dạy rất thực chiến, các tình huống đàm phán hợp đồng và xử lý khủng hoảng được mô phỏng ngay trong lớp giúp tôi tự tin họp với ban điều hành Singapore.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Bạn Trần Minh Anh",
      relationship: "Cựu học viên IELTS 8.5 — Sinh viên ĐH Sydney",
      quote: "Thầy David và thầy Trí tại AURA sửa bài Writing cực kỳ chi tiết, chỉ ra từng lỗi tư duy và cách diễn đạt gượng gạo. Nhờ môi trường học thuật chuyên sâu này mà mình đạt 8.5 ngay trong lần thi đầu.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Bác Đặng Văn Hùng",
      relationship: "Phụ huynh em Vũ Bảo Khang (SAT 1540)",
      quote: "Đội ngũ chuyên gia du học của AURA đã đồng hành rất tận tâm cùng gia đình trong suốt 1 năm chuẩn bị hồ sơ. Khang không chỉ đạt điểm SAT vượt kỳ vọng mà còn trưởng thành rõ rệt về tư duy độc lập.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Chị Lê Thu Trang",
      relationship: "Phụ huynh bé Bảo Ngọc (Lớp SmartKids Mầm Non)",
      quote: "Bé nhà tôi mỗi tuần đều mong đến ngày được đi học ở AURA để gặp cô Mai và thầy Ben. Cơ sở vật chất sạch sẽ, các cô trợ giảng chăm sóc bé chu đáo như người nhà.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Bạn Lê Tuấn Phong",
      relationship: "Học sinh THPT Chuyên Hà Nội - Amsterdam",
      quote: "Khóa học Young Leaders giúp em nhận ra học tiếng Anh không phải là làm bài tập ngữ pháp mà là công cụ để tranh biện và tìm hiểu tri thức khoa học toàn cầu.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: true,
    },
    {
      authorName: "Chị Phan Ngọc Hạnh",
      relationship: "Trưởng phòng Nhân sự Công ty Cổ phần LogiTrans",
      quote: "Chương trình tiếng Anh doanh nghiệp của AURA mang lại hiệu quả rõ rệt. Năng suất xử lý email quốc tế của đội ngũ nhân viên tăng gấp đôi sau 4 tháng đào tạo.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: false,
    },
    {
      authorName: "Anh Đào Minh Quân",
      relationship: "Học viên Lớp 1-on-1 Cấp Tốc",
      quote: "Chỉ với 30 giờ kèm 1-1, thầy cô đã giúp tôi lấy lại toàn bộ kiến thức phát âm và vượt qua kỳ phỏng vấn visa định cư Mỹ xuất sắc. Vô cùng biết ơn AURA!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      rating: 5,
      featured: false,
    },
  ];

  await prisma.testimonial.createMany({ data: testimonialsData });
  console.log(`✅ Seeded ${testimonialsData.length} client testimonials`);

  // 9. Blog Categories & Posts (12 high-value educational posts)
  const blogCats = [
    { slug: "kinh-nghiem-luyen-ielts", name: "Bí Quyết Luyện Thi IELTS", description: "Chiến thuật bứt phá 4 kỹ năng từ chuyên gia và cựu giám khảo" },
    { slug: "tieng-anh-tre-em-mam-non", name: "Nuôi Dạy Con Song Ngữ", description: "Phương pháp giáo dục ngôn ngữ sớm cho cha mẹ hiện đại" },
    { slug: "tieng-anh-cong-so", name: "Tiếng Anh Công Sở & Giao Tiếp", description: "Kỹ năng viết thư tín, thuyết trình và giao tiếp chuyên nghiệp" },
    { slug: "hoc-bong-du-hoc", name: "Học Bổng & Du Học", description: "Cẩm nang chuẩn bị hồ sơ săn học bổng Mỹ, Anh, Úc, Canada" },
  ];

  const createdBlogCats = await Promise.all(blogCats.map((bc) => prisma.blogCategory.create({ data: bc })));
  const blogCatMap = new Map(createdBlogCats.map((bc) => [bc.slug, bc.id]));

  const blogPostsData = [
    {
      slug: "chien-luoc-tang-1-band-ielts-writing-task-2",
      title: "Chiến Lược Tăng 1.0 Band Score IELTS Writing Task 2 Trong 30 Ngày",
      excerpt: "Bí quyết giải mã 4 tiêu chí chấm điểm và cách phát triển ý tưởng logic giúp bài viết thoát khỏi lối mòn diễn đạt.",
      content: `
## 1. Hiểu Rõ Bốn Tiêu Chí Chấm Điểm
Writing Task 2 chiếm 2/3 tổng số điểm bài thi Viết. Giám khảo không chấm điểm theo cảm tính mà hoàn toàn căn cứ vào 4 tiêu chí:
- **Task Achievement (25%)**: Trả lời đầy đủ tất cả các phần của đề bài, lập trường rõ ràng xuyên suốt.
- **Coherence and Cohesion (25%)**: Mạch lạc trong ý tưởng và liên kết đoạn văn tự nhiên.
- **Lexical Resource (25%)**: Độ chính xác và linh hoạt của vốn từ vựng học thuật.
- **Grammatical Range and Accuracy (25%)**: Sự đa dạng của cấu trúc câu phức và tỷ lệ câu không mắc lỗi.

## 2. Phương Pháp Lập Dàn Ý P.E.E.L Chuẩn Học Thuật
Mỗi đoạn thân bài nên tuân theo mô hình **PEEL**:
1. **Point**: Câu chủ đề nêu rõ luận điểm chính.
2. **Explanation**: Giải thích nguyên nhân hoặc cơ chế tại sao vấn đề lại diễn ra như vậy.
3. **Example**: Đưa ra ví dụ cụ thể, có tính xác thực và thực tế.
4. **Link**: Câu liên kết trở lại luận đề chính của toàn bài.

## 3. Tránh Các Lỗi Sai Kinh Điển
Nhiều thí sinh quá lạm dụng từ 'khủng' mà bỏ quên tính tự nhiên (Collocation). Hãy ưu tiên sự chính xác và mạch lạc trước khi phô diễn từ vựng hiếm!
      `,
      categoryId: blogCatMap.get("kinh-nghiem-luyen-ielts")!,
      featuredImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
      tags: "IELTS Writing, Luyện thi IELTS, Kinh nghiệm thi IELTS",
      seoTitle: "Cách Tăng 1 Band IELTS Writing Task 2 Trong 30 Ngày | AURA Academy",
      seoDescription: "Hướng dẫn chi tiết chiến thuật nâng band IELTS Writing Task 2 với cấu trúc PEEL chuẩn Cambridge.",
    },
    {
      slug: "giai-ma-chung-chi-cambridge-starters-movers-flyers",
      title: "Giải Mã Hệ Thống Chứng Chỉ Cambridge: Starters, Movers, Flyers Cho Bé",
      excerpt: "Cha mẹ cần biết gì về thang đo Khiên, độ tuổi thích hợp và lộ trình ôn thi chứng chỉ Cambridge quốc tế cho trẻ.",
      content: `
## Chứng Chỉ Cambridge YLE Là Gì?
Cambridge Young Learners English (YLE) là hệ thống các bài thi tiếng Anh được thiết kế vui nhộn, không có khái niệm đậu hay rớt nhằm khích lệ tinh thần học tập của trẻ từ 6 đến 12 tuổi.

## Ba Cấp Độ Phát Triển Theo Độ Tuổi:
- **Starters (Pre-A1)**: Dành cho bé 6 - 8 tuổi (lớp 1 & 2), tập trung vào từ vựng cơ bản và phản xạ nghe nói đơn giản.
- **Movers (A1)**: Dành cho bé 8 - 10 tuổi (lớp 3 & 4), trẻ bắt đầu hiểu các chỉ dẫn dài hơn và miêu tả được sự việc.
- **Flyers (A2)**: Dành cho học sinh 10 - 12 tuổi (lớp 5 & 6), trình độ tương đương chuẩn A2 của khung tham chiếu Châu Âu CEFR.

## Ý Nghĩa Của Số Lượng 'Khiên'
Kết quả được tính bằng biểu tượng 'Khiên'. Trẻ đạt từ 10-15 Khiên được xem là đạt thành tích tốt và đủ năng lực bước lên bậc học tiếp theo.
      `,
      categoryId: blogCatMap.get("tieng-anh-tre-em-mam-non")!,
      featuredImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      tags: "Cambridge YLE, Starters, Movers, Flyers, Tiếng Anh Tiểu Học",
      seoTitle: "Chứng Chỉ Cambridge Starters Movers Flyers Là Gì? | AURA Academy",
      seoDescription: "Tìm hiểu chi tiết về kỳ thi Cambridge tiếng Anh tiểu học và cách tính điểm Khiên chuẩn xác.",
    },
    {
      slug: "10-mau-cau-tieng-anh-cong-so-dam-phan-chuyen-nghiep",
      title: "10 Mẫu Câu Tiếng Anh Công Sở Giúp Bạn Đàm Phán Chuyên Nghiệp",
      excerpt: "Cách bày tỏ quan điểm, đề xuất giải pháp và từ chối khéo léo trong các cuộc họp với đối tác quốc tế.",
      content: `
## 1. Bắt Đầu Buổi Đàm Phán Với Thái Độ Hợp Tác
- *"Before we begin, I'd like to outline the main objectives of today's meeting."*
- *"We are confident that we can reach a mutually beneficial agreement today."*

## 2. Đưa Ra Đề Xuất Một Cách Khéo Léo
- *"How flexible can you be regarding the delivery timeline?"*
- *"Would you consider offering a 5% discount if we increase the order volume?"*

## 3. Từ Chối Lịch Sự Mà Không Gây Mất Lòng
- *"Unfortunately, that falls slightly outside our current budget constraints."*
- *"I understand your position; however, we might need to explore alternative options."*
      `,
      categoryId: blogCatMap.get("tieng-anh-cong-so")!,
      featuredImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80",
      tags: "Tiếng Anh Công Sở, Đàm Phán Thương Mại, Giao Tiếp Quốc Tế",
      seoTitle: "Mẫu Câu Tiếng Anh Đàm Phán Thương Mại Chuyên Nghiệp | AURA",
      seoDescription: "Tổng hợp các mẫu câu tiếng Anh giao tiếp công sở giúp bạn tự tin đàm phán hợp đồng với đối tác.",
    },
    {
      slug: "bi-quyet-chuan-bi-ho-so-san-hoc-bong-my-toan-phan",
      title: "Bí Quyết Chuẩn Bị Hồ Sơ Săn Học Bổng Đại Học Mỹ Toàn Phần",
      excerpt: "Lộ trình 3 năm chuẩn bị từ GPA, điểm chuẩn hóa SAT/IELTS đến các hoạt động ngoại khóa mang dấu ấn cá nhân độc bản.",
      content: `
## 1. Ba Trụ Cột Trong Bộ Hồ Sơ Tuyển Sinh Mỹ
Hội đồng tuyển sinh các trường đại học Mỹ (Holistic Admissions) đánh giá ứng viên toàn diện qua 3 yếu tố cốt lõi:
1. **Thành tích Học thuật (Academic Excellence)**: GPA học bạ cấp 3 giữ mức ổn định từ 8.5+, kèm điểm thi chuẩn hóa SAT từ 1450+ hoặc ACT 32+.
2. **Bài Luận Cá Nhân (Personal Statement)**: Tiếng nói chân thật thể hiện nhân sinh quan, đam mê và bài học rút ra sau những thất bại.
3. **Hoạt Động Ngoại Khóa (Extracurriculars)**: Ưu tiên chất lượng và chiều sâu (Leadership & Impact) hơn là số lượng phong trào hời hợt.
      `,
      categoryId: blogCatMap.get("hoc-bong-du-hoc")!,
      featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      tags: "Săn Học Bổng Mỹ, Du Học, Hồ Sơ Du Học, Digital SAT",
      seoTitle: "Cẩm Nang Săn Học Bổng Đại Học Mỹ Toàn Phần | AURA Academy",
      seoDescription: "Chia sẻ kinh nghiệm chuẩn bị hồ sơ săn học bổng du học Mỹ từ chuyên gia tư vấn giáo dục AURA.",
    },
    {
      slug: "phuong-phap-day-tieng-anh-cho-tre-mam-non-khong-ap-luc",
      title: "Phương Pháp Dạy Tiếng Anh Cho Trẻ 4-6 Tuổi Tự Nhiên Không Áp Lực",
      excerpt: "Cách khơi gợi niềm yêu thích tiếng Anh của bé ngay tại nhà thông qua truyện tranh và bài hát tương tác.",
      content: `
Giai đoạn 4-6 tuổi được các nhà khoa học gọi là 'cửa sổ vàng' trong tiếp thu ngôn ngữ thứ hai. Đừng ép trẻ ngồi vào bàn học chép từ vựng! Hãy biến mỗi giờ tiếp xúc tiếng Anh thành một trò chơi sinh động.
      `,
      categoryId: blogCatMap.get("tieng-anh-tre-em-mam-non")!,
      featuredImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
      tags: "Tiếng Anh Mầm Non, Giáo Dục Sớm, Song Ngữ",
      seoTitle: "Phương Pháp Dạy Tiếng Anh Mầm Non Hiệu Quả | AURA Academy",
      seoDescription: "Bí quyết giúp trẻ mầm non yêu thích tiếng Anh một cách tự nhiên từ các chuyên gia giáo dục sớm.",
    },
    {
      slug: "lam-chu-part-3-ielts-speaking-an-tuong",
      title: "Làm Chủ Part 3 IELTS Speaking: Kỹ Thuật Trả Lời Đạt Điểm 7.5+",
      excerpt: "Cách kéo dài câu trả lời bằng phương pháp A.R.E.A và nâng cao tính học thuật của bài nói.",
      content: `
Part 3 được xem là phần thử thách nhất trong kỳ thi Speaking vì đòi hỏi thí sinh phải bàn luận về các vấn đề vĩ mô mang tính xã hội. Áp dụng ngay công thức AREA:
- **A (Answer)**: Đưa ra câu trả lời trực diện.
- **R (Reason)**: Nêu lý do vì sao.
- **E (Example)**: Đưa ra ví dụ minh họa cụ thể.
- **A (Alternative)**: Nêu mặt đối lập hoặc giải pháp thay thế.
      `,
      categoryId: blogCatMap.get("kinh-nghiem-luyen-ielts")!,
      featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
      tags: "IELTS Speaking, Part 3, Mẹo thi IELTS",
      seoTitle: "Cách Trả Lời IELTS Speaking Part 3 Đạt Điểm 7.5+ | AURA",
      seoDescription: "Chiến thuật bẻ khóa Part 3 IELTS Speaking với công thức AREA giúp bạn tự tin đạt điểm cao.",
    },
    {
      slug: "viet-email-xin-nghi-phep-chuyen-nghiep-bang-tieng-anh",
      title: "Cách Viết Email Xin Nghỉ Phép Chuẩn Chuyên Nghiệp Bằng Tiếng Anh",
      excerpt: "Các mẫu thư xin nghỉ phép hàng năm, nghỉ ốm và thông báo bàn giao công việc chi tiết.",
      content: `
Gửi một chiếc email xin phép rõ ràng và lịch sự thể hiện tác phong làm việc trách nhiệm của bạn trong môi trường công sở quốc tế. Cùng tham khảo các mẫu câu thông dụng nhất!
      `,
      categoryId: blogCatMap.get("tieng-anh-cong-so")!,
      featuredImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80",
      tags: "Tiếng Anh Công Sở, Email Tiếng Anh",
      seoTitle: "Mẫu Email Xin Nghỉ Phép Tiếng Anh Chuẩn Công Sở | AURA",
      seoDescription: "Mẫu email xin nghỉ phép bằng tiếng Anh trang trọng và lịch sự dành cho người đi làm.",
    },
    {
      slug: "so-sanh-ielts-va-toefl-nen-chon-chung-chi-nao",
      title: "So Sánh IELTS Và TOEFL: Bạn Nên Chọn Chứng Chỉ Nào Để Du Học?",
      excerpt: "Phân tích chi tiết độ khó, cấu trúc thi trên máy hay trên giấy và phạm vi công nhận toàn cầu của hai kỳ thi.",
      content: `
IELTS và TOEFL đều là hai thước đo chuẩn mực kiểm tra năng lực tiếng Anh học thuật trên toàn thế giới. Tuy nhiên, cách thức tổ chức và phong cách đề thi có những điểm khác biệt cốt lõi mà bạn cần cân nhắc trước khi ôn luyện.
      `,
      categoryId: blogCatMap.get("hoc-bong-du-hoc")!,
      featuredImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
      tags: "IELTS vs TOEFL, Du Học, Luyện Thi",
      seoTitle: "Nên Thi IELTS Hay TOEFL Để Đi Du Học? | AURA Academy",
      seoDescription: "So sánh chi tiết bài thi IELTS và TOEFL giúp bạn lựa chọn chứng chỉ phù hợp nhất với kế hoạch tương lai.",
    },
    {
      slug: "tam-quan-trong-cua-tieu-chuan-neas-trong-giao-duc",
      title: "Tiêu Chuẩn Quốc Tế NEAS Trong Giảng Dạy Ngoại Ngữ Là Gì?",
      excerpt: "Tại sao phụ huynh nên chọn các hệ thống trung tâm Anh ngữ đạt chứng nhận kiểm định chất lượng độc lập NEAS.",
      content: `
NEAS (National ELT Accreditation Scheme) là tổ chức kiểm định độc lập uy tín hàng đầu thế giới về chất lượng giảng dạy tiếng Anh. Một trung tâm được cấp chứng chỉ NEAS phải trải qua quá trình đánh giá nghiêm ngặt về chương trình học, cơ sở vật chất và trình độ đội ngũ giáo viên.
      `,
      categoryId: blogCatMap.get("tieng-anh-tre-em-mam-non")!,
      featuredImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80",
      tags: "Tiêu chuẩn NEAS, Chất Lượng Giáo Dục, AURA Academy",
      seoTitle: "Chứng Nhận NEAS Quốc Tế Trong Đào Tạo Anh Ngữ | AURA",
      seoDescription: "Tìm hiểu ý nghĩa chứng nhận kiểm định chất lượng giáo dục NEAS độc quyền tại AURA Academy.",
    },
    {
      slug: "5-ung-dung-luyen-nghe-tieng-anh-moi-ngay-cho-nguoi-ban-ron",
      title: "5 Ứng Dụng Luyện Nghe Tiếng Anh Hiệu Quả Cho Người Đi Làm",
      excerpt: "Tận dụng 15 phút rảnh rỗi trên xe bus hoặc lúc nghỉ trưa để cải thiện phản xạ nghe với các podcast chất lượng.",
      content: `
Muốn cải thiện kỹ năng nghe, bạn không cần phải dành hàng giờ liền bên bàn học. Bí quyết nằm ở tính kiên trì và 'tắm ngôn ngữ' mỗi ngày với các kênh podcast chất lượng cao như BBC 6 Minute English, TED Talks Daily và NPR News.
      `,
      categoryId: blogCatMap.get("tieng-anh-cong-so")!,
      featuredImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      tags: "Luyện Nghe Tiếng Anh, Podcast, Tự Học Tiếng Anh",
      seoTitle: "App Luyện Nghe Tiếng Anh Cho Người Đi Làm | AURA Academy",
      seoDescription: "Top 5 ứng dụng và kênh podcast luyện nghe tiếng Anh tốt nhất dành cho người bận rộn.",
    },
    {
      slug: "cach-dat-cau-hoi-thong-minh-trong-phong-van-bang-tieng-anh",
      title: "Cách Đặt Câu Hỏi Ngược Thông Minh Khi Phỏng Vấn Tuyển Dụng Tiếng Anh",
      excerpt: "Cuối buổi phỏng vấn khi nhà tuyển dụng hỏi 'Do you have any questions for us?', bạn nên trả lời thế nào để gây ấn tượng?",
      content: `
Đây là thời điểm quyết định giúp bạn chuyển từ thế bị phỏng vấn sang tư thế của một đối tác chuyên nghiệp đang tìm hiểu về cơ hội hợp tác đôi bên cùng có lợi.
      `,
      categoryId: blogCatMap.get("tieng-anh-cong-so")!,
      featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
      tags: "Phỏng Vấn Tiếng Anh, Tuyển Dụng, Kỹ Năng Nghề Nghiệp",
      seoTitle: "Mẹo Trả Lời Phỏng Vấn Tiếng Anh Xuất Sắc | AURA Academy",
      seoDescription: "Hướng dẫn cách đặt câu hỏi ngược ấn tượng với nhà tuyển dụng quốc tế ở cuối buổi phỏng vấn.",
    },
    {
      slug: "lo-trinh-on-thi-digital-sat-tu-so-0-len-1500",
      title: "Lộ Trình Tự Học Digital SAT Từ Con Số 0 Lên 1500+ Trong 6 Tháng",
      excerpt: "Chi tiết từng giai đoạn ôn tập và cách làm quen với thuật toán thích ứng trên phần mềm Bluebook.",
      content: `
Kỳ thi Digital SAT đòi hỏi tư duy giải quyết vấn đề nhanh và khả năng quản lý áp lực đồng hồ đếm ngược. Cùng xây dựng lộ trình 6 tháng bài bản cùng cựu thủ khoa AURA!
      `,
      categoryId: blogCatMap.get("hoc-bong-du-hoc")!,
      featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
      tags: "Digital SAT, Lộ Trình Ôn Thi, Du Học Mỹ",
      seoTitle: "Lộ Trình Tự Học Digital SAT 1500+ Chi Tiết | AURA Academy",
      seoDescription: "Bật mí lộ trình 6 tháng chinh phục kỳ thi Digital SAT điểm cao săn học bổng danh giá.",
    },
  ];

  for (const bp of blogPostsData) {
    await prisma.blogPost.create({ data: bp });
  }
  console.log(`✅ Seeded ${blogPostsData.length} educational blog posts`);

  // 10. News Articles (4 press & campus event releases)
  const newsData = [
    {
      slug: "aura-dat-chung-nhan-kiem-dinh-quoc-te-neas-nam-thu-5-lien-tiep",
      title: "Hệ Thống AURA Academy Được Vinh Danh Đạt Chuẩn Kiểm Định NEAS Quốc Tế Năm Thứ 5 Liên Tiếp",
      excerpt: "Tổ chức NEAS Australia chính thức tái chứng nhận chất lượng giáo dục xuất sắc trên toàn bộ hệ thống cơ sở AURA.",
      content: "Hôm nay, đại diện tổ chức NEAS Australia đã trao quyết định tái chứng nhận kiểm định chất lượng đào tạo Anh ngữ quốc tế cho Hệ thống Anh ngữ AURA Academy. Đây là minh chứng cho cam kết bền bỉ về chất lượng giảng dạy và dịch vụ học viên tiêu chuẩn cao.",
      featuredImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
      published: true,
    },
    {
      slug: "khai-truong-co-so-flagship-quan-1-khong-gian-hoc-tap-cong-nghe-cao",
      title: "Khai Trương Flagship Campus Quận 1 — Không Gian Học Tập Sáng Tạo Đa Phương Tiện",
      excerpt: "Cơ sở mới với diện tích hơn 2.500m2 sàn trang bị phòng lab máy tính Apple và thư viện mở đón chào các tân học viên.",
      content: "Nhằm đáp ứng nhu cầu học tập ngày càng tăng của học viên khu vực trung tâm TP.HCM, AURA chính thức đưa vào vận hành tòa nhà Flagship Campus tại 189 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1 với nhiều ưu đãi học bổng lên tới 35%.",
      featuredImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
      published: true,
    },
    {
      slug: "trao-quy-hoc-bong-tai-nang-tre-tri-gia-2-ty-dong-cho-hoc-sinh-viet-nam",
      title: "Quỹ Học Bổng 'AURA Young Leaders 2026' Trị Giá 2 Tỷ Đồng Dành Cho Học Sinh Tài Năng",
      excerpt: "Chương trình tài trợ 100% học phí các khóa luyện thi IELTS và SAT cho học sinh có thành tích xuất sắc và hoàn cảnh hiếu học.",
      content: "Nhằm ươm mầm tài năng trẻ và chắp cánh ước mơ du học, AURA Foundation công bố khởi động chương trình học bổng thường niên dành cho học sinh THCS và THPT trên toàn quốc.",
      featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
      published: true,
    },
    {
      slug: "ngay-hoi-hoi-thao-phuong-phap-day-con-song-ngu-cung-chuyen-gia-uc",
      title: "Ngày Hội Hội Thảo: 'Bí Quyết Nuôi Con Song Ngữ Tự Nhiên' Cùng Chuyên Gia Giáo Dục Úc",
      excerpt: "Hơn 300 phụ huynh đã tham gia buổi tọa đàm bổ ích và nhận những lời khuyên thực tiễn từ chuyên gia ngôn ngữ học.",
      content: "Sáng ngày 15/08, hội trường AURA Cầu Giấy Hà Nội đã diễn ra buổi tọa đàm chuyên đề cùng Giáo sư David Harrison và Thạc sĩ Nguyễn Thùy Linh, chia sẻ phương pháp tương tác tiếng Anh cùng con tại nhà.",
      featuredImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
      published: true,
    },
  ];

  for (const n of newsData) {
    await prisma.newsArticle.create({ data: n });
  }
  console.log(`✅ Seeded ${newsData.length} news & press releases`);

  // 11. Initial Sample Leads & Activity Log
  const sampleLeads = [
    {
      fullName: "Nguyễn Thu Trang",
      phone: "0912889900",
      email: "thutrang.nguyen@gmail.com",
      studentAge: 8,
      status: "NEW",
      source: "WEBSITE",
      UTMSource: "google",
      UTMMedium: "cpc",
      UTMCampaign: "cambridge_primary_2026",
      message: "Tôi muốn tìm hiểu khóa SuperKids cho bé gái đang học lớp 3 tại cơ sở Quận 1.",
    },
    {
      fullName: "Hoàng Văn Tuấn",
      phone: "0988776655",
      email: "tuan.hoangvan@fpt.com",
      studentAge: 27,
      status: "CONTACTED",
      source: "FACEBOOK",
      UTMSource: "facebook",
      UTMMedium: "social",
      UTMCampaign: "italk_business",
      message: "Cần tư vấn lớp tiếng Anh giao tiếp buổi tối sau 18h30.",
      assignedUserId: consultant1.id,
    },
    {
      fullName: "Đỗ Phương Linh",
      phone: "0909112233",
      email: "linh.dp@gmail.com",
      studentAge: 16,
      status: "APPOINTMENT",
      source: "WEBSITE",
      UTMSource: "organic",
      message: "Cần tư vấn lộ trình luyện thi IELTS từ 5.0 lên 7.0 để nộp hồ sơ du học.",
      assignedUserId: consultant2.id,
    },
    {
      fullName: "Bùi Quốc Đạt",
      phone: "0934567890",
      email: "dat.bq@gmail.com",
      studentAge: 11,
      status: "PLACEMENT_TEST",
      source: "DIRECT",
      message: "Đã đăng ký thi xếp lớp ngày thứ 7 tới tại cơ sở Cầu Giấy.",
      assignedUserId: consultant1.id,
    },
    {
      fullName: "Lê Mỹ Duyên",
      phone: "0977223344",
      email: "duyen.le@outlook.com",
      studentAge: 5,
      status: "ENROLLED",
      source: "WEBSITE",
      message: "Bé đã hoàn tất thủ tục nhập học lớp SmartKids Foundation.",
      assignedUserId: consultant1.id,
    },
  ];

  for (const l of sampleLeads) {
    const lead = await prisma.lead.create({ data: l });
    await prisma.leadActivity.create({
      data: {
        leadId: lead.id,
        userId: l.assignedUserId || superAdmin.id,
        action: l.assignedUserId ? "STATUS_CHANGE" : "LEAD_CREATED",
        previousStatus: null,
        newStatus: l.status,
        note: `Khách hàng đăng ký tư vấn qua website. Trạng thái khởi tạo: ${l.status}.`,
      },
    });
  }
  console.log(`✅ Seeded ${sampleLeads.length} initial CRM leads with activity history`);

  // 12. Site Settings
  const siteSettings = [
    { key: "SITE_NAME", value: "AURA English Academy", description: "Tên thương hiệu trung tâm" },
    { key: "HOTLINE", value: "1900 6886", description: "Tổng đài tư vấn miễn phí" },
    { key: "EMAIL_CONTACT", value: "contact@aura.edu.vn", description: "Email tiếp nhận liên hệ" },
    { key: "ZALO_URL", value: "https://zalo.me/auraenglish", description: "Kênh chat Zalo Official" },
    { key: "MESSENGER_URL", value: "https://m.me/auraenglishacademy", description: "Kênh chat Facebook Messenger" },
    { key: "ANNOUNCEMENT_BANNER", value: "Ưu đãi mừng năm học mới: Tặng ngay học bổng 25% + Bộ quà tặng nhập học khi đăng ký trước ngày 30/09!", description: "Thông báo thanh thông tin đầu trang" },
  ];

  for (const s of siteSettings) {
    await prisma.siteSetting.create({ data: s });
  }
  console.log(`✅ Seeded ${siteSettings.length} site settings`);

  console.log("🎉 SEED COMPLETED SUCCESSFULLY!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
