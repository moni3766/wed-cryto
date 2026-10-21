import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Minh Quân",
    role: "Doanh nhân",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    content: "Ban đầu tôi khá hoài nghi, nhưng ApexTrade đã vượt ngoài mọi mong đợi của tôi. Danh mục đầu tư của tôi đã tăng trưởng 40% chỉ sau ba tháng!",
    rating: 5,
  },
  {
    name: "Thanh Hằng",
    role: "Giám đốc Marketing",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    content: "Chương trình giới thiệu thực sự tuyệt vời. Tôi đã kiếm được hơn $5,000 chỉ bằng cách chia sẻ với bạn bè và người thân. Rất đáng để trải nghiệm!",
    rating: 5,
  },
  {
    name: "Gia Bảo",
    role: "Kỹ sư phần mềm",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    content: "Các chuyên gia giao dịch quản lý vốn của tôi cực kỳ hoàn hảo. Các lệnh rút tiền luôn được xử lý chỉ trong vài giờ. Dịch vụ tuyệt vời!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Đánh Giá
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6">
            Khách Hàng <span className="text-gradient-gold">Nói Gì</span> Về Chúng Tôi
          </h2>
          <p className="text-muted-foreground text-lg">
            Tham gia cùng hàng nghìn nhà đầu tư hài lòng, những người đã tin tưởng giao phó tài sản cho ApexTrade.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-8 animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;