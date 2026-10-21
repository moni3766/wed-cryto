import { TrendingUp, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: "Giới thiệu", href: "#about" },
      { name: "Tuyển dụng", href: "#" },
      { name: "Báo chí", href: "#" },
      { name: "Tin tức & Blog", href: "#" },
    ],
    services: [
      { name: "Giao dịch Crypto", href: "#" },
      { name: "Giao dịch Forex", href: "#" },
      { name: "Gói đầu tư", href: "#how-it-works" },
      { name: "Chương trình giới thiệu", href: "#" },
    ],
    support: [
      { name: "Trung tâm hỗ trợ", href: "#" },
      { name: "Liên hệ chúng tôi", href: "#contact" },
      { name: "Câu hỏi thường gặp (FAQ)", href: "#" },
      { name: "Trò chuyện trực tiếp", href: "#" },
    ],
    legal: [
      { name: "Chính sách bảo mật", href: "#" },
      { name: "Điều khoản dịch vụ", href: "#" },
      { name: "Chính sách Cookie", href: "#" },
      { name: "Tuyên bố miễn trừ trách nhiệm", href: "#" },
    ],
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                Apex<span className="text-gradient-gold">Trade</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Đối tác tin cậy của bạn trong đầu tư tiền điện tử và Forex. Gia tăng tài sản 
              thông qua các chiến lược giao dịch chuyên nghiệp từ năm 2019.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@apextrade.com</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Công ty</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Dịch vụ</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Hỗ trợ</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Pháp lý</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ApexTrade. Tất cả các quyền được bảo lưu.
            </p>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Cảnh báo rủi ro: Giao dịch tài chính luôn đi kèm rủi ro mất vốn. Hãy đầu tư một cách có trách nhiệm.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;