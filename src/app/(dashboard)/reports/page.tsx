"use client";

import { useEffect, useState, useCallback } from "react";
import { BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ReportSale {
  id: number;
  date: string;
  customer: { name: string } | null;
  items: { product: { name: string }; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

interface ReportPurchase {
  id: number;
  date: string;
  supplier: { name: string };
  items: { product: { name: string }; quantity: number; unitPrice: number }[];
  totalAmount: number;
}

interface SalesReport {
  sales: ReportSale[];
  total: number;
}

interface PurchasesReport {
  purchases: ReportPurchase[];
  total: number;
}

interface ProfitReport {
  sales: { total: number; count: number };
  purchases: { total: number; count: number };
  profit: number;
}

type ActiveTab = "sales" | "purchases" | "profit";

function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="h-5 w-32 bg-muted rounded" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="h-8 w-20 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-muted rounded" />
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const today = new Date().toISOString().split("T")[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const [from, setFrom] = useState(thirtyDaysAgo);
  const [to, setTo] = useState(today);

  const [activeTab, setActiveTab] = useState<ActiveTab>("profit");
  const [salesReport, setSalesReport] = useState<SalesReport | null>(null);
  const [purchasesReport, setPurchasesReport] = useState<PurchasesReport | null>(null);
  const [profitReport, setProfitReport] = useState<ProfitReport | null>(null);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingPurchases, setLoadingPurchases] = useState(false);
  const [loadingProfit, setLoadingProfit] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSalesReport = useCallback(async () => {
    setLoadingSales(true);
    try {
      const res = await fetch(`/api/reports?type=sales&from=${from}&to=${to}`);
      if (!res.ok) throw new Error("Failed to fetch sales report");
      setSalesReport(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingSales(false);
    }
  }, [from, to]);

  const fetchPurchasesReport = useCallback(async () => {
    setLoadingPurchases(true);
    try {
      const res = await fetch(`/api/reports?type=purchases&from=${from}&to=${to}`);
      if (!res.ok) throw new Error("Failed to fetch purchases report");
      setPurchasesReport(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingPurchases(false);
    }
  }, [from, to]);

  const fetchProfitReport = useCallback(async () => {
    setLoadingProfit(true);
    try {
      const res = await fetch(`/api/reports?type=profit&from=${from}&to=${to}`);
      if (!res.ok) throw new Error("Failed to fetch profit report");
      setProfitReport(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoadingProfit(false);
    }
  }, [from, to]);

  useEffect(() => {
    fetchSalesReport();
    fetchPurchasesReport();
    fetchProfitReport();
  }, [fetchSalesReport, fetchPurchasesReport, fetchProfitReport]);

  const tabs: { key: ActiveTab; label: string }[] = [
    { key: "profit", label: "Profit Overview" },
    { key: "sales", label: "Sales Report" },
    { key: "purchases", label: "Purchase Report" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          View sales, purchases, and profit reports
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Date Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-44"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-44"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {profitReport && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sales
              </CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {loadingProfit ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                ) : (
                  formatCurrency(profitReport.sales.total)
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {profitReport.sales.count} transactions
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Purchases
              </CardTitle>
              <div className="rounded-full bg-orange-100 p-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">
                {loadingProfit ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                ) : (
                  formatCurrency(profitReport.purchases.total)
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {profitReport.purchases.count} transactions
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Net Profit
              </CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {loadingProfit ? (
                  <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                ) : (
                  formatCurrency(profitReport.profit)
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {profitReport.profit >= 0 ? "Positive" : "Negative"} margin
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {!profitReport && !loadingProfit && !error && (
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Detailed Reports</CardTitle>
          </div>
          <div className="flex gap-1 mt-3 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {activeTab === "sales" && (
            <div>
              {loadingSales ? (
                <TableSkeleton rows={5} />
              ) : !salesReport || salesReport.sales.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No sales found in the selected date range
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-center">Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salesReport.sales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell>
                          {sale.customer?.name ?? (
                            <span className="text-muted-foreground">Walk-in</span>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {sale.items.length}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(sale.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableBody>
                    <TableRow className="font-bold">
                      <TableCell colSpan={3} className="text-right">
                        Total
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {formatCurrency(salesReport.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>
          )}

          {activeTab === "purchases" && (
            <div>
              {loadingPurchases ? (
                <TableSkeleton rows={5} />
              ) : !purchasesReport || purchasesReport.purchases.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No purchases found in the selected date range
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-center">Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchasesReport.purchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>{formatDate(purchase.date)}</TableCell>
                        <TableCell>{purchase.supplier.name}</TableCell>
                        <TableCell className="text-center">
                          {purchase.items.length}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(purchase.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableBody>
                    <TableRow className="font-bold">
                      <TableCell colSpan={3} className="text-right">
                        Total
                      </TableCell>
                      <TableCell className="text-right text-orange-600">
                        {formatCurrency(purchasesReport.total)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>
          )}

          {activeTab === "profit" && (
            <div>
              {loadingProfit ? (
                <TableSkeleton rows={3} />
              ) : !profitReport ? (
                <div className="text-center py-8 text-muted-foreground">
                  No data available for the selected date range
                </div>
              ) : (
                <div className="max-w-md mx-auto space-y-4">
                  <div className="flex justify-between items-center rounded-lg border border-green-200 bg-green-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Total Sales
                      </p>
                      <p className="text-xs text-green-600">
                        {profitReport.sales.count} transactions
                      </p>
                    </div>
                    <span className="text-xl font-bold text-green-700">
                      {formatCurrency(profitReport.sales.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center rounded-lg border border-orange-200 bg-orange-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        Total Purchases
                      </p>
                      <p className="text-xs text-orange-600">
                        {profitReport.purchases.count} transactions
                      </p>
                    </div>
                    <span className="text-xl font-bold text-orange-700">
                      {formatCurrency(profitReport.purchases.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center rounded-lg border border-green-200 bg-green-50 p-4">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Net Profit
                      </p>
                      <p className="text-xs text-green-600">
                        Sales - Purchases
                      </p>
                    </div>
                    <span className="text-xl font-bold text-green-700">
                      {formatCurrency(profitReport.profit)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
