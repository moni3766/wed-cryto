import { useState, useEffect } from 'react';
import { Bot, TrendingUp, Shield, Target, Zap, MessageCircle, Send } from 'lucide-react';

interface Strategy {
    id: string;
    name: string;
    description: string;
    howItWorks: string;
    bestFor: string;
    riskLevel: string;
    expectedReturn: string;
}

const ADMIN_WHATSAPP = import.meta.env.VITE_ADMIN_WHATSAPP || '+1234567890';
const ADMIN_TELEGRAM = import.meta.env.VITE_ADMIN_TELEGRAM || '@apex_admin';

const Bots = () => {
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStrategies();
    }, []);

    const fetchStrategies = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bots/strategies');
            const data = await response.json();
            if (data.success) {
                setStrategies(data.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải chiến lược:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleContactWhatsApp = (strategyName: string) => {
        const message = encodeURIComponent(
            `Xin chào! Tôi quan tâm đến việc kích hoạt chiến lược ${strategyName}. Bạn có thể hỗ trợ tôi bắt đầu không?`
        );
        window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
    };

    const handleContactTelegram = () => {
        window.open(`https://t.me/${ADMIN_TELEGRAM}`, '_blank');
    };

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'LOW': return 'text-green-600 bg-green-100';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
            case 'HIGH': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStrategyIcon = (id: string) => {
        switch (id) {
            case 'GRID': return <Target className="w-8 h-8" />;
            case 'DCA': return <TrendingUp className="w-8 h-8" />;
            case 'MOMENTUM': return <Zap className="w-8 h-8" />;
            case 'MEAN_REVERSION': return <Shield className="w-8 h-8" />;
            default: return <Bot className="w-8 h-8" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải chiến lược...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Bot className="w-16 h-16 mx-auto mb-4" />
                        <h1 className="text-4xl font-bold mb-4">Bot Giao Dịch Tự Động</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Để các bot giao dịch tiên tiến làm việc thay bạn 24/7. Lựa chọn từ nhiều chiến lược khác nhau
                            được thiết kế để tối ưu hóa lợi nhuận đồng thời quản lý rủi ro hiệu quả.
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Admin Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Sẵn Sàng Bắt Đầu?
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Liên hệ với đội ngũ quản trị viên của chúng tôi để kích hoạt bot giao dịch của bạn
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => handleContactWhatsApp('bot giao dịch')}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Liên hệ qua WhatsApp
                            </button>
                            <button
                                onClick={handleContactTelegram}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-5 h-5" />
                                Liên hệ qua Telegram
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategies Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Các Chiến Lược Khả Dụng</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {strategies.map((strategy) => (
                        <div
                            key={strategy.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-600">
                                        {getStrategyIcon(strategy.id)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {strategy.name}
                                        </h3>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mt-1 ${getRiskColor(strategy.riskLevel)}`}>
                                            RỦI RO {strategy.riskLevel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-600 mb-4">{strategy.description}</p>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Cách hoạt động:</h4>
                                    <p className="text-sm text-gray-600">{strategy.howItWorks}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Phù hợp nhất cho:</h4>
                                    <p className="text-sm text-gray-600">{strategy.bestFor}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Lợi nhuận kỳ vọng:</h4>
                                    <p className="text-sm font-semibold text-green-600">{strategy.expectedReturn}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleContactWhatsApp(strategy.name)}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Yêu Cầu Bot Này
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quy Trình Hoạt Động</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                1
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Chọn Chiến Lược</h3>
                            <p className="text-sm text-gray-600">Lựa chọn bot giao dịch phù hợp với mục tiêu của bạn</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                2
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Liên Hệ Quản Trị Viên</h3>
                            <p className="text-sm text-gray-600">Kết nối qua WhatsApp hoặc Telegram</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                3
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Nhận Phê Duyệt</h3>
                            <p className="text-sm text-gray-600">Quản trị viên xem xét và kích hoạt bot</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                4
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Bắt Đầu Giao Dịch</h3>
                            <p className="text-sm text-gray-600">Bot tự động giao dịch 24/7 cho bạn</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Câu Hỏi Thường Gặp</h2>

                <div className="space-y-4 max-w-3xl mx-auto">
                    <details className="bg-white rounded-lg shadow p-4">
                        <summary className="font-semibold text-gray-900 cursor-pointer">
                            Làm thế nào để bắt đầu sử dụng bot giao dịch?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Chỉ cần nhấp vào nút "Yêu Cầu Bot Này" ở chiến lược bạn chọn và liên hệ với đội ngũ quản trị qua WhatsApp hoặc Telegram. Họ sẽ hướng dẫn bạn quy trình thiết lập chi tiết.
                        </p>
                    </details>

                    <details className="bg-white rounded-lg shadow p-4">
                        <summary className="font-semibold text-gray-900 cursor-pointer">
                            Mức đầu tư tối thiểu là bao nhiêu?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Mức vốn đầu tư tối thiểu sẽ khác nhau tùy theo từng chiến lược. Hãy liên hệ với đội ngũ quản trị viên để thảo luận về ngân sách và tìm ra lựa chọn tốt nhất.
                        </p>
                    </details>

                    <details className="bg-white rounded-lg shadow p-4">
                        <summary className="font-semibold text-gray-900 cursor-pointer">
                            Tôi có thể dừng bot bất cứ lúc nào không?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Có! Bạn có thể yêu cầu tạm dừng hoặc dừng bot bất cứ lúc nào bằng cách liên hệ với đội ngũ quản trị viên.
                        </p>
                    </details>

                    <details className="bg-white rounded-lg shadow p-4">
                        <summary className="font-semibold text-gray-900 cursor-pointer">
                            Lợi nhuận có được đảm bảo không?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Không. Mọi hoạt động giao dịch đều đi kèm rủi ro và hiệu suất trong quá khứ không đảm bảo cho kết quả trong tương lai. Lợi nhuận kỳ vọng chỉ là ước tính dựa trên dữ liệu lịch sử.
                        </p>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default Bots;