"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Plus,
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  currentPrice: number;
}

interface SaleItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

interface Sale {
  id: number;
  date: string;
  customer: Customer | null;
  items: { id: number; product: Product; quantity: number; unitPrice: number }[];
  totalAmount: number;
  notes: string | null;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [receiptSale, setReceiptSale] = useState<Sale | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [salesRes, customersRes, productsRes] = await Promise.all([
        fetch("/api/sales"),
        fetch("/api/customers"),
        fetch("/api/products"),
      ]);
      if (!salesRes.ok || !customersRes.ok || !productsRes.ok) {
        throw new Error("Failed to fetch data");
      }
      setSales(await salesRes.json());
      setCustomers(await customersRes.json());
      setProducts(await productsRes.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetForm = () => {
    setStep(1);
    setCustomerId("");
    setDate(new Date().toISOString().split("T")[0]);
    setNotes("");
    setItems([]);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: 0, productName: "", quantity: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    field: keyof SaleItem,
    value: string | number
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      if (field === "productId") {
        const product = products.find((p) => p.id === Number(value));
        updated[index] = {
          ...updated[index],
          productId: Number(value),
          productName: product?.name ?? "",
          unitPrice: product?.currentPrice ?? 0,
        };
      } else {
        updated[index] = { ...updated[index], [field]: value as number };
      }
      return updated;
    });
  };

  const runningTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        customerId: customerId ? Number(customerId) : null,
        date,
        notes,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      };

      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create sale");
      }

      setSubmitSuccess(true);
      await fetchData();
      setTimeout(() => {
        setDialogOpen(false);
        resetForm();
      }, 1500);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintReceipt = (sale: Sale) => {
    setReceiptSale(sale);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const filteredSales = sales.filter((s) =>
    (s.customer?.name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
          <p className="text-muted-foreground">Manage customer sales</p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Add Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {step === 1 ? "New Sale - Customer Info" : "New Sale - Add Items"}
              </DialogTitle>
              <DialogDescription>
                Step {step} of 2
              </DialogDescription>
            </DialogHeader>

            {submitSuccess && (
              <Alert variant="success">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Sale created successfully!</AlertDescription>
              </Alert>
            )}

            {submitError && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            {step === 1 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer (optional)</Label>
                  <Select value={customerId} onValueChange={setCustomerId}>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Walk-in customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((c) => (
                        <SelectItem key={c.id} value={String(c.id)}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <textarea
                    id="notes"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 py-4">
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-end gap-2 rounded-lg border p-3">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs">Product</Label>
                        <Select
                          value={String(item.productId)}
                          onValueChange={(v) => handleItemChange(index, "productId", v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem key={p.id} value={String(p.id)}>
                                {p.name} ({formatCurrency(p.currentPrice)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="w-20 space-y-1">
                        <Label className="text-xs">Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="w-24 space-y-1">
                        <Label className="text-xs">Unit Price</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(index, "unitPrice", Number(e.target.value))
                          }
                        />
                      </div>
                      <div className="w-20 space-y-1">
                        <Label className="text-xs">Total</Label>
                        <div className="flex h-9 items-center text-sm font-medium">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button variant="outline" onClick={handleAddItem} className="w-full">
                  <Package className="h-4 w-4" />
                  Add Item
                </Button>

                <div className="flex justify-between rounded-lg bg-muted p-3">
                  <span className="font-medium">Running Total</span>
                  <span className="font-bold text-lg">{formatCurrency(runningTotal)}</span>
                </div>
              </div>
            )}

            <DialogFooter>
              {step === 1 ? (
                <div className="flex w-full justify-between">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      if (items.length === 0) handleAddItem();
                      setStep(2);
                    }}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              ) : (
                <div className="flex w-full justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      submitting ||
                      items.length === 0 ||
                      items.some((i) => !i.productId || i.quantity <= 0 || i.unitPrice <= 0)
                    }
                  >
                    {submitting ? "Creating..." : "Create Sale"}
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 max-w-sm"
        />
      </div>

      {loading ? (
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded" />
          ))}
        </div>
      ) : filteredSales.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {search
            ? "No sales match your search"
            : "No sales yet. Click 'Add Sale' to get started."}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{formatDate(sale.date)}</TableCell>
                <TableCell className="font-medium">
                  {sale.customer?.name ?? (
                    <span className="text-muted-foreground">Walk-in</span>
                  )}
                </TableCell>
                <TableCell className="text-center">{sale.items.length}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(sale.totalAmount)}
                </TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate">
                  {sale.notes ?? "-"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePrintReceipt(sale)}
                  >
                    <Printer className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {receiptSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 print:bg-white print:static print:inset-auto">
          <div
            ref={receiptRef}
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full print:shadow-none print:rounded-none print:max-w-full print:p-4"
          >
            <div className="text-center border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">Smart Sabzi Mandi</h2>
              <p className="text-sm text-gray-500">Sales Receipt</p>
            </div>

            <div className="space-y-1 text-sm mb-4">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {formatDate(receiptSale.date)}
              </p>
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {receiptSale.customer?.name ?? "Walk-in"}
              </p>
              <p>
                <span className="font-medium">Receipt #:</span> {receiptSale.id}
              </p>
              {receiptSale.notes && (
                <p>
                  <span className="font-medium">Notes:</span> {receiptSale.notes}
                </p>
              )}
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1">Item</th>
                  <th className="text-center py-1">Qty</th>
                  <th className="text-right py-1">Price</th>
                  <th className="text-right py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {receiptSale.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-1">{item.product.name}</td>
                    <td className="text-center py-1">{item.quantity}</td>
                    <td className="text-right py-1">
                      {formatCurrency(item.unitPrice)}
                    </td>
                    <td className="text-right py-1">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold text-base">
                  <td colSpan={3} className="text-right py-2">
                    Total:
                  </td>
                  <td className="text-right py-2">
                    {formatCurrency(receiptSale.totalAmount)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="text-center text-xs text-gray-400 mt-4 pt-4 border-t">
              Thank you for your business!
            </div>

            <div className="flex justify-center mt-4 print:hidden">
              <Button
                variant="outline"
                onClick={() => setReceiptSale(null)}
                className="mr-2"
              >
                Close
              </Button>
              <Button onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
