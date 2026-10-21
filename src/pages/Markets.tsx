import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    TrendingUp,
    TrendingDown,
    Search,
    Star,
    ArrowUpDown,
} from "lucide-react";
import { marketAPI, watchlistAPI } from "@/lib/marketAPI";
import { useToast } from "@/hooks/use-toast";

interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d_in_currency: number;
    market_cap: number;
    total_volume: number;
    sparkline_in_7d: {
        price: number[];
    };
}

const Markets = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"market_cap" | "price" | "change">(
        "market_cap"
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    useEffect(() => {
        fetchMarkets();
        fetchWatchlist();
        // Tự động làm mới dữ liệu mỗi 30 giây
        const interval = setInterval(fetchMarkets, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterAndSortCoins();
    }, [coins, searchQuery, sortBy, sortOrder]);

    const fetchMarkets = async () => {
        try {
            const response = await marketAPI.getMarkets(1, 100);
            setCoins(response.data);
        } catch (error) {
            console.error("Lỗi khi tải thông tin thị trường:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchWatchlist = async () => {
        try {
            const response = await watchlistAPI.getWatchlist();
            const ids = new Set<string>(response.data.map((item: any) => item.coinId as string));
            setWatchlistIds(ids);
        } catch (error) {
            console.error("Lỗi khi tải danh sách theo dõi:", error);
        }
    };

    const toggleWatchlist = async (coin: Coin) => {
        try {
            if (watchlistIds.has(coin.id)) {
                await watchlistAPI.removeFromWatchlist(coin.id);
                setWatchlistIds((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(coin.id);
                    return newSet;
                });
                toast({
                    title: "Đã xóa khỏi danh sách theo dõi",
                    description: `${coin.name} đã được xóa khỏi danh sách theo dõi của bạn`,
                });
            } else {
                await watchlistAPI.addToWatchlist(coin.id, coin.symbol, coin.name);
                setWatchlistIds((prev) => new Set(prev).add(coin.id));
                toast({
                    title: "Đã thêm vào danh sách theo dõi",
                    description: `${coin.name} đã được thêm vào danh sách theo dõi của bạn`,
                });
            }
        } catch (error: any) {
            toast({
                title: "Lỗi",
                description: error.message || "Không thể cập nhật danh sách theo dõi",
                variant: "destructive",
            });
        }
    };

    const filterAndSortCoins = () => {
        let filtered = [...coins];

        // Lọc theo từ khóa tìm kiếm
        if (searchQuery) {
            filtered = filtered.filter(
                (coin) =>
                    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sắp xếp
        filtered.sort((a, b) => {
            let aValue = 0;
            let bValue = 0;

            switch (sortBy) {
                case "market_cap":
                    aValue = a.market_cap;
                    bValue = b.market_cap;
                    break;
                case "price":
                    aValue = a.current_price;
                    bValue = b.current_price;
                    break;
                case "change":
                    aValue = a.price_change_percentage_24h;
                    bValue = b.price_change_percentage_24h;
                    break;
            }

            return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        });

        setFilteredCoins(filtered);
    };

    const toggleSort = (column: "market_cap" | "price" | "change") => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("desc");
        }
    };

    const formatPrice = (price: number) => {
        if (price < 0.01) return `$${price.toFixed(6)}`;
        if (price < 1) return `$${price.toFixed(4)}`;
        return `$${price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const formatMarketCap = (marketCap: number) => {
        if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
        if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
        if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
        return `$${marketCap.toLocaleString()}`;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Đang tải thông tin thị trường...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-fade-in">
                {/* Header */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground flex items-center gap-3">
                        <TrendingUp className="w-8 h-8 text-primary" />
                        Thị Trường Tiền Điện Tử
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Giá tiền điện tử trực tiếp và dữ liệu thị trường chi tiết
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="glass rounded-xl p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Tìm kiếm đồng coin..."
                                className="pl-10 bg-secondary border-border h-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant={sortBy === "market_cap" ? "hero" : "hero-outline"}
                                onClick={() => toggleSort("market_cap")}
                                className="flex items-center gap-2"
                            >
                                Vốn hóa
                                <ArrowUpDown className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={sortBy === "price" ? "hero" : "hero-outline"}
                                onClick={() => toggleSort("price")}
                                className="flex items-center gap-2"
                            >
                                Giá
                                <ArrowUpDown className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={sortBy === "change" ? "hero" : "hero-outline"}
                                onClick={() => toggleSort("change")}
                                className="flex items-center gap-2"
                            >
                                24h %
                                <ArrowUpDown className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Coins Table */}
                <div className="glass rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-secondary/50 border-b border-border">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                        #
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                                        Đồng Coin
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                        Giá
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                        24h %
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                        7d %
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                        Vốn hóa thị trường
                                    </th>
                                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                                        Khối lượng (24h)
                                    </th>
                                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">
                                        Biểu đồ 7 Ngày
                                    </th>
                                    <th className="px-4 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCoins.map((coin, index) => (
                                    <tr
                                        key={coin.id}
                                        className="border-b border-border hover:bg-secondary/30 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-sm text-muted-foreground">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-4">
                                            <Link
                                                to={`/dashboard/markets/${coin.id}`}
                                                className="flex items-center gap-3 hover:text-primary transition-colors"
                                            >
                                                <img
                                                    src={coin.image}
                                                    alt={coin.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium text-foreground">
                                                        {coin.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground uppercase">
                                                        {coin.symbol}
                                                    </p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4 text-right font-medium text-foreground">
                                            {formatPrice(coin.current_price)}
                                        </td>
                                        <td
                                            className={`px-4 py-4 text-right font-medium ${
                                                coin.price_change_percentage_24h >= 0
                                                    ? "text-success"
                                                    : "text-destructive"
                                            }`}
                                        >
                                            <div className="flex items-center justify-end gap-1">
                                                {coin.price_change_percentage_24h >= 0 ? (
                                                    <TrendingUp className="w-4 h-4" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4" />
                                                )}
                                                {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                                            </div>
                                        </td>
                                        <td
                                            className={`px-4 py-4 text-right font-medium ${
                                                coin.price_change_percentage_7d_in_currency >= 0
                                                    ? "text-success"
                                                    : "text-destructive"
                                            }`}
                                        >
                                            {coin.price_change_percentage_7d_in_currency?.toFixed(2) ||
                                                "N/A"}
                                            %
                                        </td>
                                        <td className="px-4 py-4 text-right text-muted-foreground">
                                            {formatMarketCap(coin.market_cap)}
                                        </td>
                                        <td className="px-4 py-4 text-right text-muted-foreground">
                                            {formatMarketCap(coin.total_volume)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="w-24 h-12 mx-auto">
                                                {coin.sparkline_in_7d?.price && (
                                                    <MiniChart
                                                        data={coin.sparkline_in_7d.price}
                                                        positive={coin.price_change_percentage_7d_in_currency >= 0}
                                                    />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleWatchlist(coin);
                                                }}
                                                className={`transition-colors ${
                                                    watchlistIds.has(coin.id)
                                                        ? "text-primary"
                                                        : "text-muted-foreground hover:text-primary"
                                                }`}
                                            >
                                                <Star
                                                    className="w-5 h-5"
                                                    fill={watchlistIds.has(coin.id) ? "currentColor" : "none"}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredCoins.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Không tìm thấy đồng coin nào</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

// Mini sparkline chart component
const MiniChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
    if (!data || data.length === 0) return null;

    const validData = data.filter(v => typeof v === 'number' && !isNaN(v));
    if (validData.length === 0) return null;

    const max = Math.max(...validData);
    const min = Math.min(...validData);
    const range = max - min;

    if (range === 0) {
        return (
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="100" y2="50" stroke={positive ? "#10b981" : "#ef4444"} strokeWidth="2" />
            </svg>
        );
    }

    const points = validData
        .map((value, index) => {
            const x = (index / (validData.length - 1)) * 100;
            const y = 100 - ((value - min) / range) * 100;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="overflow-visible"
        >
            <polyline
                points={points}
                fill="none"
                stroke={positive ? "#10b981" : "#ef4444"}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};

export default Markets;