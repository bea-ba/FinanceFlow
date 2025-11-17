import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Search, ArrowUpDown, AlertCircle } from "lucide-react";
import { AddIncomeModal } from "./AddIncomeModal";
import { format } from "date-fns";
import { toast } from "sonner";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  transaction_date: string;
}

export const IncomeList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchIncomeTransactions();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [transactions, searchTerm, categoryFilter, sortOrder]);

  const fetchIncomeTransactions = async () => {
    try {
      setError(null);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'income')
        .order('transaction_date', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setTransactions(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load income transactions";
      setError(errorMessage);
      toast.error("Failed to load income", {
        description: errorMessage
      });
      if (import.meta.env.DEV) {
        console.error("Error fetching income transactions:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.transaction_date).getTime();
      const dateB = new Date(b.transaction_date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredTransactions(filtered);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My income history</CardTitle>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add manually
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search my income..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
                <SelectItem value="other_income">Other Income</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={toggleSortOrder}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortOrder === "desc" ? "Newest" : "Oldest"}
            </Button>
          </div>

          {error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={fetchIncomeTransactions}>
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          ) : loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse h-20 bg-muted rounded" />
              ))}
            </div>
          ) : filteredTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No income here yet — try importing or adding manually</p>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)} • {format(new Date(transaction.transaction_date), "MMM d, yyyy")}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-primary">
                    +${Number(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddIncomeModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal}
        onSuccess={fetchIncomeTransactions}
      />
    </>
  );
};
