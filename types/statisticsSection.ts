import { Home } from 'lucide-react';


export interface StatItem {
    id: number;
    icon: typeof Home;
    number: string;
    label: string;
    description: string;
}