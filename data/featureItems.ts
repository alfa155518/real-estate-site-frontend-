import { FeatureItem } from '@/types/featureItems';
import { Building2, ShieldCheck, Handshake, Award, Users, Home } from 'lucide-react';

export const features: FeatureItem[] = [
    {
        id: 'experience',
        title: 'سنوات من الخبرة',
        description: 'أكثر من 10 سنوات من الخبرة في سوق العقارات المحلي والدولي',
        icon: Building2,
        delay: 0.1
    },
    {
        id: 'trust',
        title: 'ثقة العملاء',
        description: 'نحن نكسب ثقة عملائنا من خلال الشفافية والمصداقية',
        icon: ShieldCheck,
        delay: 0.2
    },
    {
        id: 'partnerships',
        title: 'شراكات قوية',
        description: 'شراكات استراتيجية مع أكبر المطورين العقاريين',
        icon: Handshake,
        delay: 0.3
    },
    {
        id: 'awards',
        title: 'جوائز وتكريمات',
        description: 'حاصلون على عدة جوائز كأفضل شركة عقارية',
        icon: Award,
        delay: 0.4
    },
    {
        id: 'clients',
        title: 'آلاف العملاء',
        description: 'أكثر من 5000 عميل راضٍ عن خدماتنا',
        icon: Users,
        delay: 0.5
    },
    {
        id: 'properties',
        title: 'ألف عقار',
        description: 'أكثر من 1000 عقار متاح للبيع والايجار',
        icon: Home,
        delay: 0.6
    }
];