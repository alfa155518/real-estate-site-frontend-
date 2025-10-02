import { format } from "date-fns";
import { ar } from "date-fns/locale/ar";

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d MMMM yyyy", { locale: ar });
};
