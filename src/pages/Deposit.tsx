import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowDownToLine,
  Smartphone,
  CreditCard,
  Copy,
  CheckCircle,
  Info,
  X,
  Wallet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  instructions: string | null;
  paypalEmail: string | null;
  walletAddress: string | null;
  isActive: boolean;
}

const Deposit = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/payment-methods?activeOnly=true", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentMethods(data.data);
        if (data.data.length > 0) {
          setSelectedMethod(data.data[0]);
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải phương thức thanh toán:", error);
    }
  };

  const handleCopyEmail = () => {
    if (selectedMethod?.paypalEmail) {
      navigator.clipboard.writeText(selectedMethod.paypalEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyWallet = () => {
    if (selectedMethod?.walletAddress) {
      navigator.clipboard.writeText(selectedMethod.walletAddress);
      setCopiedWallet(true);
      setTimeout(() => setCopiedWallet(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/transactions/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          method: selectedMethod?.name || "",
          walletAddress: selectedMethod?.walletAddress || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể tạo yêu cầu nạp tiền");
      }

      toast({
        title: "Đã gửi yêu cầu nạp tiền!",
        description: "Tiền gửi của bạn sẽ được cộng vào tài khoản sau khi được quản trị viên phê duyệt.",
      });

      setAmount("");
      setShowInstructions(false);
    } catch (error: any) {
      toast({
        title: "Nạp tiền thất bại",
        description: error.message || "Không thể tạo yêu cầu nạp tiền",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMethodIcon = (type: string) => {
    if (type === "MOBILE_MONEY") return Smartphone;
    if (type === "ONLINE_PAYMENT") return CreditCard;
    if (type === "CRYPTO") return Wallet;
    return Smartphone;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <ArrowDownToLine className="w-8 h-8 text-primary" />
            Nạp Tiền Vào Tài Khoản
          </h1>
          <p className="text-muted-foreground mt-1">
            Thêm tiền vào tài khoản của bạn sử dụng phương thức thanh toán nội địa hoặc tiền điện tử
          </p>
        </div>

        {/* Deposit Form */}
        <div className="glass rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label>Chọn phương thức thanh toán</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentMethods.map((method) => {
                  const Icon = getMethodIcon(method.type);
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMethod?.id === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedMethod?.id === method.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-medium text-sm">{method.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Số tiền nạp (USD)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="10"
                placeholder="Nhập số tiền"
                className="h-12 text-lg"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <p className="text-sm text-muted-foreground">
                Số tiền nạp tối thiểu: $10
              </p>
            </div>

            {/* View Instructions Button */}
            {selectedMethod && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setShowInstructions(true)}
              >
                <Info className="w-4 h-4 mr-2" />
                Xem hướng dẫn thanh toán qua {selectedMethod.name}
              </Button>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg"
              disabled={loading || !amount || !selectedMethod}
            >
              {loading ? "Đang xử lý..." : "Gửi Yêu Cầu Nạp Tiền"}
            </Button>
          </form>
        </div>

        {/* Important Notice */}
        <div className="glass rounded-xl p-6 border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Thông tin quan trọng
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Các khoản tiền nạp được xử lý trong vòng 5-30 phút sau khi xác nhận thanh toán</li>
                <li>• Hãy chắc chắn làm theo hướng dẫn thanh toán một cách cẩn thận</li>
                <li>• Giữ lại mã giao dịch hoặc ảnh chụp màn hình để xác thực khi cần thiết</li>
                <li>• Liên hệ với bộ phận hỗ trợ nếu tài khoản chưa nhận được tiền sau 24 giờ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Instructions Modal */}
      {showInstructions && selectedMethod && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Hướng dẫn thanh toán qua {selectedMethod.name}
              </h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* PayPal Email */}
              {selectedMethod.name === "PayPal" && selectedMethod.paypalEmail && (
                <div className="bg-secondary rounded-lg p-4">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Địa chỉ Email PayPal
                  </Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background px-4 py-3 rounded-md text-foreground font-mono text-sm">
                      {selectedMethod.paypalEmail}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyEmail}
                    >
                      {copiedEmail ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Crypto Wallet Address */}
              {selectedMethod.type === "CRYPTO" && selectedMethod.walletAddress && (
                <div className="bg-secondary rounded-lg p-4">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Địa chỉ ví (TRC20)
                  </Label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background px-4 py-3 rounded-md text-foreground font-mono text-sm break-all">
                      {selectedMethod.walletAddress}
                    </code>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyWallet}
                    >
                      {copiedWallet ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-orange-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    Quan trọng: Chỉ gửi USDT trên mạng TRC20. Sai mạng lưới sẽ dẫn đến mất vĩnh viễn số tiền!
                  </p>
                </div>
              )}

              {/* Instructions */}
              {selectedMethod.instructions && (
                <div className="prose prose-sm max-w-none">
                  <div
                    className="text-foreground whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html: selectedMethod.instructions
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\n/g, "<br/>")
                        .replace(/{paypalEmail}/g, selectedMethod.paypalEmail || ""),
                    }}
                  />
                </div>
              )}

              {/* Close Button */}
              <Button
                type="button"
                className="w-full"
                onClick={() => setShowInstructions(false)}
              >
                Đã hiểu, Đóng hướng dẫn
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Deposit;