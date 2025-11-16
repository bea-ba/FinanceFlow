import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Pencil, Trash2, Download } from "lucide-react";
import { AddExpenseModal } from "./AddExpenseModal";
import { toast } from "sonner";
import { format } from "date-fns";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  transaction_date: string;
}

export const MoneyOutList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    filterExpenses();
  }, [expenses, searchTerm, categoryFilter]);

  const fetchExpenses = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('type', 'expense')
      .order('transaction_date', { ascending: false });

    if (error) {
      toast.error("Failed to load expenses");
      console.error(error);
    } else {
      setExpenses(data || []);
    }
    setLoading(false);
  };

  const filterExpenses = () => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(expense => expense.category === categoryFilter);
    }

    setFilteredExpenses(filtered);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete expense");
    } else {
      toast.success("Expense deleted");
      fetchExpenses();
    }
  };

  const handleExport = () => {
    toast.info("Export to Google Sheets coming soon", {
      description: "Your expenses will be formatted and ready to export",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      groceries: "bg-green-100 text-green-800 border-green-200",
      dining: "bg-orange-100 text-orange-800 border-orange-200",
      transport: "bg-blue-100 text-blue-800 border-blue-200",
      utilities: "bg-purple-100 text-purple-800 border-purple-200",
      entertainment: "bg-pink-100 text-pink-800 border-pink-200",
      shopping: "bg-yellow-100 text-yellow-800 border-yellow-200",
      health: "bg-red-100 text-red-800 border-red-200",
      education: "bg-indigo-100 text-indigo-800 border-indigo-200",
      other_expense: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatCategoryName = (category: string) => {
    const names: Record<string, string> = {
      groceries: "Groceries",
      dining: "Dining Out",
      transport: "Transportation",
      utilities: "Utilities",
      entertainment: "Entertainment",
      shopping: "Shopping",
      health: "Healthcare",
      education: "Education",
      other_expense: "Other"
    };
    return names[category] || category;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Your expense history</CardTitle>
            <div className="flex gap-2">
              <Button onClick={handleExport} variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export to Sheets
              </Button>
              <Button onClick={() => setIsAddModalOpen(true)} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add manually
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="groceries">Groceries</SelectItem>
                <SelectItem value="dining">Dining Out</SelectItem>
                <SelectItem value="transport">Transportation</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="health">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other_expense">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expense List */}
          <div className="space-y-3">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse h-20 bg-muted rounded-lg" />
                ))}
              </div>
            ) : filteredExpenses.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">No expenses here yet</p>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || categoryFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Start by importing from Google Drive or adding manually"}
                </p>
              </div>
            ) : (
              filteredExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{expense.description || "No description"}</p>
                      <Badge variant="outline" className={getCategoryColor(expense.category)}>
                        {formatCategoryName(expense.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(expense.transaction_date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-destructive">
                      ${Number(expense.amount).toFixed(2)}
                    </p>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toast.info("Edit functionality coming soon")}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <AddExpenseModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onSuccess={fetchExpenses}
      />
    </>
  );
};
