import { 
  Wallet, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Shield, 
  Headphones 
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Nạp tiền dễ dàng",
    description: "Nạp tiền vào tài khoản tức thì bằng tiền điện tử hoặc tiền pháp định. Hỗ trợ nhiều phương thức thanh toán.",
  },
  {
    icon: TrendingUp,
    title: "Giao dịch chuyên gia",
    description: "Các chuyên gia giàu kinh nghiệm quản lý danh mục đầu tư của bạn với chiến lược tối ưu lợi nhuận.",
  },
  {
    icon: CreditCard,
    title: "Rút tiền siêu tốc",
    description: "Rút thu nhập của bạn bất cứ lúc nào. Đảm bảo hoàn thành giao dịch trong vòng 24 giờ.",
  },
  {
    icon: Users,
    title: "Chương trình giới thiệu",
    description: "Nhận hoa hồng hấp dẫn khi giới thiệu bạn bè. Tiềm năng thu nhập không giới hạn.",
  },
  {
    icon: Shield,
    title: "Nền tảng bảo mật",
    description: "Mã hóa tiêu chuẩn quân sự và xác thực 2 lớp (2FA) bảo vệ khoản đầu tư của bạn suốt ngày đêm.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ chăm sóc khách hàng tận tâm luôn sẵn sàng hỗ trợ bạn giải đáp mọi thắc mắc.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Dịch Vụ Của Chúng Tôi
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6">
            Mọi Thứ Bạn Cần Để{" "}
            <span className="text-gradient-gold">Gia Tăng Tài Sản</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Hệ thống công cụ đầu tư toàn diện được thiết kế để tối ưu hóa lợi nhuận
            của bạn với sự tham gia tối thiểu từ phía bạn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group glass rounded-2xl p-8 hover:shadow-gold transition-all duration-500 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;