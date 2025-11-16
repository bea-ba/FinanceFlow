import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Calendar, Pencil, Trash2 } from "lucide-react";
import { AddBillModal } from "./AddBillModal";
import { format } from "date-fns";

interface Bill {
  id: number;
  name: string;
  amount: number;
  category: string;
  dueDay: number;
  frequency: string;
  status: "paid" | "unpaid";
  nextDueDate: Date;
}

export const BillsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mockup data
  const bills: Bill[] = [
    {
      id: 1,
      name: "Rent",
      amount: 1500.00,
      category: "housing",
      dueDay: 1,
      frequency: "monthly",
      status: "paid",
      nextDueDate: new Date(2025, 11, 1)
    },
    {
      id: 2,
      name: "Electric Bill",
      amount: 125.50,
      category: "utilities",
      dueDay: 15,
      frequency: "monthly",
      status: "unpaid",
      nextDueDate: new Date(2025, 10, 15)
    },
    {
      id: 3,
      name: "Internet Service",
      amount: 79.99,
      category: "utilities",
      dueDay: 10,
      frequency: "monthly",
      status: "unpaid",
      nextDueDate: new Date(2025, 10, 10)
    },
    {
      id: 4,
      name: "Netflix",
      amount: 15.99,
      category: "entertainment",
      dueDay: 5,
      frequency: "monthly",
      status: "paid",
      nextDueDate: new Date(2025, 11, 5)
    },
    {
      id: 5,
      name: "Car Insurance",
      amount: 150.00,
      category: "insurance",
      dueDay: 20,
      frequency: "monthly",
      status: "paid",
      nextDueDate: new Date(2025, 11, 20)
    },
    {
      id: 6,
      name: "Phone Bill",
      amount: 65.00,
      category: "utilities",
      dueDay: 12,
      frequency: "monthly",
      status: "unpaid",
      nextDueDate: new Date(2025, 10, 12)
    },
    {
      id: 7,
      name: "Gym Membership",
      amount: 45.00,
      category: "health",
      dueDay: 8,
      frequency: "monthly",
      status: "paid",
      nextDueDate: new Date(2025, 11, 8)
    },
    {
      id: 8,
      name: "Spotify Premium",
      amount: 10.99,
      category: "entertainment",
      dueDay: 3,
      frequency: "monthly",
      status: "paid",
      nextDueDate: new Date(2025, 11, 3)
    },
  ];

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800";
  };

  const getFrequencyBadge = (frequency: string) => {
    const colors: Record<string, string> = {
      monthly: "bg-blue-100 text-blue-800",
      weekly: "bg-purple-100 text-purple-800",
      yearly: "bg-indigo-100 text-indigo-800"
    };
    return colors[frequency] || "bg-gray-100 text-gray-800";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Bills</CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Bill
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredBills.map((bill) => (
              <div
                key={bill.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">{bill.name}</p>
                    <Badge className={getStatusColor(bill.status)}>
                      {bill.status}
                    </Badge>
                    <Badge className={getFrequencyBadge(bill.frequency)} variant="outline">
                      {bill.frequency}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="capitalize">{bill.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {format(bill.nextDueDate, "MMM d")} (Day {bill.dueDay})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-lg font-bold">${bill.amount.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddBillModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
      />
    </>
  );
};
