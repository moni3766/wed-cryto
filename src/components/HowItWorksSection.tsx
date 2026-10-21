import { UserPlus, Wallet, TrendingUp, Banknote } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Tạo tài khoản",
    description: "Đăng ký chỉ trong vài phút bằng email của bạn. Xác minh danh tính để mở khóa toàn bộ tính năng.",
  },
  {
    icon: Wallet,
    step: "02",
    title: "Nạp tiền vào ví",
    description: "Nạp tiền dễ dàng bằng tiền điện tử hoặc các phương thức thanh toán truyền thống. Bắt đầu chỉ từ $100.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Bắt đầu sinh lời",
    description: "Đội ngũ chuyên gia sẽ giao dịch thay bạn. Theo dõi khoản đầu tư tăng trưởng theo thời gian thực.",
  },
  {
    icon: Banknote,
    step: "04",
    title: "Rút tiền lợi nhuận",
    description: "Tạo yêu cầu rút tiền bất cứ lúc nào. Tiền sẽ về tài khoản của bạn trong vòng 24 giờ.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-dark" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">
            Bắt đầu dễ dàng
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-4 mb-6">
            Quy trình <span className="text-gradient-gold">Hoạt động</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Bắt đầu hành trình đầu tư của bạn chỉ với 4 bước đơn giản. Không yêu cầu kinh nghiệm.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="relative">
                {/* Step Number */}
                <div className="text-6xl font-display font-bold text-primary/10 absolute -top-4 -left-2">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 shadow-gold">
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-display font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;