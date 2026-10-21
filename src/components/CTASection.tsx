import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Sẵn Sàng Bắt Đầu{" "}
            <span className="text-gradient-gold">Hành Trình Đầu Tư?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn nhà đầu tư đang gia tăng tài sản cùng ApexTrade.
            Tạo tài khoản miễn phí ngay hôm nay và bắt đầu sinh lời.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Tạo Tài Khoản Miễn Phí
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                Liên Hệ Tư Vấn
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;