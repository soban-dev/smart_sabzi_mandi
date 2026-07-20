"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  Users,
  AlertTriangle,
  ShoppingCart,
  Receipt,
  PlusCircle,
  TrendingUp,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Sale {
  id: number;
  date: string;
  customer: { name: string } | null;
  totalAmount: number;
}

interface Purchase {
  id: number;
  date: string;
  supplier: { name: string };
  totalAmount: number;
}

interface InventoryItem {
  id: number;
  product: { name: string; category?: { name: string } };
  quantity: number;
}

function SkeletonCard() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="h-8 w-8 bg-muted rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-16 bg-muted rounded" />
      </CardContent>
    </Card>
  );
}

function TableSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-muted rounded" />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [productsCount, setProductsCount] = useState<number | null>(null);
  const [suppliersCount, setSuppliersCount] = useState<number | null>(null);
  const [customersCount, setCustomersCount] = useState<number | null>(null);
  const [lowStockCount, setLowStockCount] = useState<number | null>(null);
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([]);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [recentPurchases, setRecentPurchases] = useState<Purchase[]>([]);
  const [todaySalesTotal, setTodaySalesTotal] = useState(0);
  const [todayPurchasesTotal, setTodayPurchasesTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const meRes = await fetch("/api/auth/me");
        if (!meRes.ok) return;
        const meData = await meRes.json();
        setUser(meData.user);

        const [productsRes, suppliersRes, customersRes, inventoryRes, salesRes, purchasesRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/suppliers"),
            fetch("/api/customers"),
            fetch("/api/inventory"),
            fetch("/api/sales"),
            fetch("/api/purchases"),
          ]);

        const products = await productsRes.json();
        const suppliers = await suppliersRes.json();
        const customers = await customersRes.json();
        const inventory: InventoryItem[] = await inventoryRes.json();
        const sales: Sale[] = await salesRes.json();
        const purchases: Purchase[] = await purchasesRes.json();

        setProductsCount(Array.isArray(products) ? products.length : 0);
        setSuppliersCount(Array.isArray(suppliers) ? suppliers.length : 0);
        setCustomersCount(Array.isArray(customers) ? customers.length : 0);

        const low = inventory.filter((item) => item.quantity < 10);
        setLowStockCount(low.length);
        setLowStockItems(low.slice(0, 10));

        const sortedSales = (Array.isArray(sales) ? sales : [])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentSales(sortedSales.slice(0, 5));

        const sortedPurchases = (Array.isArray(purchases) ? purchases : [])
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setRecentPurchases(sortedPurchases.slice(0, 5));

        const today = new Date().toISOString().split("T")[0];
        const todaySales = sortedSales.filter((s) => s.date.startsWith(today));
        const todayPurchases = sortedPurchases.filter((p) => p.date.startsWith(today));
        setTodaySalesTotal(todaySales.reduce((sum, s) => sum + s.totalAmount, 0));
        setTodayPurchasesTotal(todayPurchases.reduce((sum, p) => sum + p.totalAmount, 0));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    }
    fetchAll();
  }, []);

  if (!user) return null;

  if (user.role === "shopkeeper") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-semibold">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString("en-PK", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Sales
              </CardTitle>
              <div className="rounded-full bg-green-100 p-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">
                {formatCurrency(todaySalesTotal)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Purchases
              </CardTitle>
              <div className="rounded-full bg-orange-100 p-2">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">
                {formatCurrency(todayPurchasesTotal)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Button asChild size="lg" className="h-24 text-lg">
            <a href="/sales">
              <PlusCircle className="h-6 w-6 mr-2" />
              New Sale
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary" className="h-24 text-lg">
            <a href="/purchases">
              <PlusCircle className="h-6 w-6 mr-2" />
              New Purchase
            </a>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Receipt className="h-5 w-5 text-green-600" />
                Recent Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentSales.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  {productsCount === null ? <TableSkeleton /> : <p>No sales yet</p>}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{formatDate(sale.date)}</TableCell>
                        <TableCell>{sale.customer?.name ?? "Walk-in"}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(sale.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Recent Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentPurchases.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  {productsCount === null ? <TableSkeleton /> : <p>No purchases yet</p>}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPurchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell>{formatDate(purchase.date)}</TableCell>
                        <TableCell>{purchase.supplier.name}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(purchase.totalAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {lowStockCount === null ? (
                  <TableSkeleton rows={3} />
                ) : (
                  <p>All products are well stocked</p>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="font-medium">{item.product.name}</span>
                    <Badge variant={item.quantity === 0 ? "destructive" : "warning"}>
                      {item.quantity} in stock
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your sabzi mandi business</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Products", value: productsCount, icon: Package, color: "text-green-600", bg: "bg-green-100" },
          { label: "Total Suppliers", value: suppliersCount, icon: Truck, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Total Customers", value: customersCount, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
          { label: "Low Stock Items", value: lowStockCount, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100" },
        ].map((stat) => {
          const Icon = stat.icon;
          if (stat.value === null) return <SkeletonCard key={stat.label} />;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {[todaySalesTotal, todayPurchasesTotal].some((t) => t > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Sales
              </CardTitle>
              <DollarSign className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {formatCurrency(todaySalesTotal)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today&apos;s Purchases
              </CardTitle>
              <ShoppingCart className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {formatCurrency(todayPurchasesTotal)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Receipt className="h-5 w-5 text-green-600" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentSales.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {productsCount === null ? <TableSkeleton /> : <p>No sales recorded yet</p>}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell>{sale.customer?.name ?? "Walk-in"}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(sale.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Recent Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPurchases.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {productsCount === null ? <TableSkeleton /> : <p>No purchases recorded yet</p>}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{formatDate(purchase.date)}</TableCell>
                      <TableCell>{purchase.supplier.name}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(purchase.totalAmount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Low Stock Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lowStockItems.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              {lowStockCount === null ? (
                <TableSkeleton rows={3} />
              ) : (
                <p>All products are well stocked</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-medium">{item.product.name}</span>
                  <Badge variant={item.quantity === 0 ? "destructive" : "warning"}>
                    {item.quantity} in stock
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
