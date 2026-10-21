import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Được tin tưởng bởi hơn 50,000+ nhà đầu tư toàn cầu
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
            Đầu tư thông minh hơn với{" "}
            <span className="text-gradient-gold">Giao dịch bởi Chuyên gia</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Mở ra cơ hội giao dịch crypto và forex chuyên nghiệp với lợi nhuận đảm bảo.
            Nạp tiền, đầu tư và gia tăng tài sản cùng đội ngũ chuyên gia của chúng tôi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/register">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Bắt đầu đầu tư ngay
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Tìm hiểu thêm
              </Button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">An toàn & Đúng quy định</h3>
              <p className="text-sm text-muted-foreground">Giao thức bảo mật cấp ngân hàng</p>
            </div>
            <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Rút tiền siêu tốc</h3>
              <p className="text-sm text-muted-foreground">Nhận tiền trong vòng 24 giờ</p>
            </div>
            <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Giới thiệu & Nhận thưởng</h3>
              <p className="text-sm text-muted-foreground">Nhận hoa hồng khi giới thiệu bạn bè</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;