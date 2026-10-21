import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Kết nối backend sau
    console.log("Yêu cầu đặt lại mật khẩu cho email:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Apex<span className="text-gradient-gold">Trade</span>
          </span>
        </Link>

        {!submitted ? (
          <>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Đặt Lai Mật Khẩu
            </h1>
            <p className="text-muted-foreground mb-8">
              Nhập email của bạn và chúng tôi sẽ gửi liên kết khôi phục mật khẩu
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Địa chỉ Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    className="pl-10 h-12 bg-secondary border-border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="hero" className="w-full h-12">
                Gửi Liên Kết Khôi Phục
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Kiểm Tra Email Của Bạn
            </h1>
            <p className="text-muted-foreground mb-8">
              Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến{" "}
              <span className="text-foreground font-medium">{email}</span>
            </p>
            <Button
              variant="hero-outline"
              onClick={() => setSubmitted(false)}
              className="mb-4"
            >
              Thử Email Khác
            </Button>
          </div>
        )}

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Đăng nhập
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;