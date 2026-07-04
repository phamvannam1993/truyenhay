import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp - TruyenChu.vn",
  description: "Tìm câu trả lời cho các câu hỏi phổ biến về TruyenChu.vn - cách sử dụng, tìm truyện, đọc tóm tắt và hơn nữa.",
  alternates: { canonical: "https://truyenchu.vn/cau-hoi-thuong-gap" },
};

const faqs = [
  {
    question: "TruyenChu.vn là gì?",
    answer: "TruyenChu.vn là nền tảng cung cấp tóm tắt, review và gợi ý đọc cho các tác phẩm tiểu thuyết, truyện chữ. Chúng tôi giúp bạn nhanh chóng nắm bắt nội dung truyện mà không phải tốn hàng giờ để đọc bản đầy đủ.",
  },
  {
    question: "Dịch vụ này có phí không?",
    answer: "Không! Tất cả nội dung trên TruyenChu.vn hoàn toàn miễn phí. Chúng tôi không yêu cầu đăng ký hay thanh toán bất kỳ khoản phí nào.",
  },
  {
    question: "Tôi có thể đọc truyện full trên TruyenChu.vn không?",
    answer: "Không, chúng tôi chỉ cung cấp tóm tắt, review và gợi ý đọc. Chúng tôi không đăng nguyên văn hoặc full text của các tác phẩm, để tôn trọng quyền tác giả và bản quyền.",
  },
  {
    question: "Làm thế nào để tìm truyện yêu thích của tôi?",
    answer: "Bạn có thể dùng tính năng Tìm kiếm (🔍) ở thanh công cụ phía trên, hoặc duyệt qua các Thể loại để khám phá truyện mới. Mỗi truyện đều có tag nội dung giúp bạn chọn được tác phẩm phù hợp.",
  },
  {
    question: "Các tóm tắt có spoil không?",
    answer: "Các bài tóm tắt của chúng tôi được viết với cẩn thận để tránh spoil quá nhiều. Chúng tôi chỉ giới thiệu bối cảnh, nhân vật chính, và điểm hấp dẫn của truyện mà không hé lộ kết cục.",
  },
  {
    question: "TruyenChu.vn cập nhật bao lâu một lần?",
    answer: "Chúng tôi liên tục cập nhật thêm truyện mới và cải thiện nội dung hiện có. Tần suất cập nhật phụ thuộc vào tiến độ của đội biên tập.",
  },
  {
    question: "Tôi có thể đề xuất truyện mới không?",
    answer: "Được! Chúng tôi rất mong nhận được đề xuất từ bạn. Vui lòng sử dụng trang Liên hệ để gửi đề xuất của bạn.",
  },
  {
    question: "Dữ liệu của tôi có được bảo vệ không?",
    answer: "Có, chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Vui lòng xem Chính sách bảo mật để biết thêm chi tiết.",
  },
  {
    question: "Tôi có thể liên hệ với ai nếu có vấn đề?",
    answer: "Bạn có thể liên hệ với chúng tôi qua trang Liên hệ. Chúng tôi sẽ cố gắng trả lời thắc mắc của bạn sớm nhất có thể.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: "Câu hỏi thường gặp" }]} />
          <h1>Câu hỏi thường gặp</h1>
          <p className="lead">Tìm câu trả lời cho những thắc mắc phổ biến về TruyenChu.vn</p>
        </div>
      </section>

      <div className="container narrow">
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">
                <span>{faq.question}</span>
                <span className="toggle-icon">+</span>
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
