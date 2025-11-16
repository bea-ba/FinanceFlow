import { useNavigate } from "react-router-dom";
import { AppIcons } from "@/config/icons";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useTransactions } from "@/contexts/TransactionsContext";

export const SummaryCards = () => {
  const navigate = useNavigate();
  const { totalIncome, totalExpenses, balance, loading } = useTransactions();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-20 bg-muted rounded" />
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "My Balance",
      value: balance,
      icon: AppIcons.financial.balance,
      color: "text-primary",
      bgColor: "bg-primary/10",
      route: "/reports",
      description: "View detailed insights",
    },
    {
      title: "Money In",
      value: totalIncome,
      icon: AppIcons.financial.income,
      color: "text-success",
      bgColor: "bg-success/10",
      route: "/income",
      description: "Track income sources",
    },
    {
      title: "Money Out",
      value: totalExpenses,
      icon: AppIcons.financial.expense,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      route: "/money-out",
      description: "View spending details",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            onClick={() => navigate(card.route)}
            className="group relative overflow-hidden p-3 sm:p-6 border-border hover:[box-shadow:var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2 sm:mb-4">
                <div className={`${card.bgColor} ${card.color} p-2 sm:p-3.5 rounded-xl sm:rounded-2xl transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                <AppIcons.actions.arrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-2">
                {card.title}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-1">
                €{formatCurrency(card.value)}
              </p>
              <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {card.description}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
          </Card>
        );
      })}
    </div>
  );
};
