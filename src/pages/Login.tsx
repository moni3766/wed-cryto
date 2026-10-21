import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn quay trở lại với ApexTrade",
      });

      // Redirect based on user role
      if (response.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.message || "Email hoặc mật khẩu không chính xác",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
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

          <h1 className="text-3xl font-display font-bold text-foreground mb-2">
            Chào Mừng Trở Lại
          </h1>
          <p className="text-muted-foreground mb-8">
            Đăng nhập để truy cập bảng điều khiển đầu tư của bạn
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
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn"
                  className="pl-10 pr-10 h-12 bg-secondary border-border"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-secondary accent-primary"
                />
                <span className="text-sm text-muted-foreground">
                  Ghi nhớ đăng nhập
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button type="submit" variant="hero" className="w-full h-12" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Tạo tài khoản ngay
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-dark items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center p-12">
          <div className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-8 shadow-gold animate-float">
            <TrendingUp className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">
            Bắt Đầu Sinh Lời Hôm Nay
          </h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Truy cập danh mục đầu tư, theo dõi sinh lời và rút tiền thu nhập của bạn bất cứ lúc nào.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;