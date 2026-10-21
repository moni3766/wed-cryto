import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Settings as SettingsIcon,
    User,
    Lock,
    Bell,
    Shield,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";

const Settings = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const [profileData, setProfileData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "United States",
    });

    useEffect(() => {
        // Đọc thông tin user từ localStorage
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        
        const computedFullName =
            storedUser.fullName ||
            storedUser.name ||
            storedUser.username ||
            `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim() ||
            "Người dùng";
        setProfileData({
            fullName: computedFullName,
            email: storedUser.email || "",
            phone: storedUser.phone || storedUser.phoneNumber || "",
            country: storedUser.country || "United States",
        });
    }, []);

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState({
        emailDeposit: true,
        emailWithdrawal: true,
        emailProfit: true,
        emailReferral: true,
        emailNews: false,
        pushAll: true,
    });

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lưu thông tin mới vào localStorage để cập nhật đồng bộ toàn giao diện
        localStorage.setItem("user", JSON.stringify(profileData));
        alert("Cập nhật thông tin thành công!");
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Cập nhật mật khẩu:", passwordData);
    };

    const tabs = [
        { id: "profile", label: "Hồ sơ", icon: User },
        { id: "security", label: "Bảo mật", icon: Lock },
        { id: "notifications", label: "Thông báo", icon: Bell },
    ];

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground flex items-center gap-3">
                        <SettingsIcon className="w-8 h-8 text-primary" />
                        Cài Đặt
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Quản lý cài đặt tài khoản và tùy chọn cá nhân của bạn
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-border pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                activeTab === tab.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="glass rounded-xl p-6">
                        <h2 className="text-lg font-display font-bold text-foreground mb-6">
                            Thông Tin Hồ Sơ
                        </h2>

                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary-foreground">
                                        {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : "U"}
                                    </span>
                                </div>
                                <div>
                                    <Button variant="hero-outline" size="sm" type="button">
                                        Đổi Ảnh Đại Diện
                                    </Button>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Định dạng JPG, PNG hoặc GIF. Tối đa 2MB.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Họ và Tên</Label>
                                    <Input
                                        id="fullName"
                                        value={profileData.fullName}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, fullName: e.target.value })
                                        }
                                        className="h-12 bg-secondary border-border"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Địa Chỉ Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, email: e.target.value })
                                        }
                                        className="h-12 bg-secondary border-border"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Số Điện Thoại</Label>
                                    <Input
                                        id="phone"
                                        value={profileData.phone}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, phone: e.target.value })
                                        }
                                        className="h-12 bg-secondary border-border"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="country">Quốc Gia</Label>
                                    <Input
                                        id="country"
                                        value={profileData.country}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, country: e.target.value })
                                        }
                                        className="h-12 bg-secondary border-border"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="hero">
                                Lưu Thay Đổi
                            </Button>
                        </form>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                    <div className="space-y-6">
                        <div className="glass rounded-xl p-6">
                            <h2 className="text-lg font-display font-bold text-foreground mb-6">
                                Đổi Mật Khẩu
                            </h2>

                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Mật Khẩu Hiện Tại</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            value={passwordData.currentPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    currentPassword: e.target.value,
                                                })
                                            }
                                            className="h-12 bg-secondary border-border pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showCurrentPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">Mật Khẩu Mới</Label>
                                    <div className="relative">
                                        <Input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            value={passwordData.newPassword}
                                            onChange={(e) =>
                                                setPasswordData({
                                                    ...passwordData,
                                                    newPassword: e.target.value,
                                                })
                                            }
                                            className="h-12 bg-secondary border-border pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showNewPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Xác Nhận Mật Khẩu Mới</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="h-12 bg-secondary border-border"
                                    />
                                </div>

                                <Button type="submit" variant="hero">
                                    Cập Nhật Mật Khẩu
                                </Button>
                            </form>
                        </div>

                        <div className="glass rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            Xác Thực Hai Yếu Tố (2FA)
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant={twoFactorEnabled ? "destructive" : "hero"}
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                >
                                    {twoFactorEnabled ? "Tắt" : "Bật"}
                                </Button>
                            </div>
                            {twoFactorEnabled && (
                                <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-lg flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-success" />
                                    <span className="text-sm text-foreground">
                                        Xác thực hai yếu tố đã được bật thành công
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                    <div className="glass rounded-xl p-6">
                        <h2 className="text-lg font-display font-bold text-foreground mb-6">
                            Tùy Chọn Thông Báo
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-medium text-foreground mb-4">
                                    Thông Báo Qua Email
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { key: "emailDeposit", label: "Xác nhận nạp tiền" },
                                        { key: "emailWithdrawal", label: "Cập nhật rút tiền" },
                                        { key: "emailProfit", label: "Báo cáo lợi nhuận hàng ngày" },
                                        { key: "emailReferral", label: "Thu nhập từ giới thiệu" },
                                        { key: "emailNews", label: "Tin tức và chương trình khuyến mãi" },
                                    ].map((item) => (
                                        <label
                                            key={item.key}
                                            className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer"
                                        >
                                            <span className="text-foreground">{item.label}</span>
                                            <input
                                                type="checkbox"
                                                checked={notifications[item.key as keyof typeof notifications] as boolean}
                                                onChange={(e) =>
                                                    setNotifications({
                                                        ...notifications,
                                                        [item.key]: e.target.checked,
                                                    })
                                                }
                                                className="w-5 h-5 rounded border-border bg-secondary accent-primary"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-foreground mb-4">
                                    Thông Báo Đẩy (Push Notifications)
                                </h3>
                                <label className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg cursor-pointer">
                                    <div>
                                        <span className="text-foreground block">
                                            Bật thông báo đẩy
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            Nhận cập nhật thời gian thực ngay trên trình duyệt của bạn
                                        </span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={notifications.pushAll}
                                        onChange={(e) =>
                                            setNotifications({
                                                ...notifications,
                                                pushAll: e.target.checked,
                                            })
                                        }
                                        className="w-5 h-5 rounded border-border bg-secondary accent-primary"
                                    />
                                </label>
                            </div>

                            <Button variant="hero">Lưu Tùy Chọn</Button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Settings;