
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    phoneNumber?: string;
    role: 'admin' | 'user' | 'guest';
    verified: boolean;
    twoFactorEnabled: boolean;
    subscriptionPlan?: 'Backpacker' | 'Explorer' | 'Globetrotter';
    subscriptionExpiryDate?: string | Date;
}

interface UserRoleType extends User{
    permissions: [];
    isSuperAdmin: boolean;
}

interface SubscriptionPlan {
    id: number;
    name: 'Backpacker' | 'Explorer' | 'Globetrotter';
    pricePerMonth: number;
    features: string[];
    durationInMonths: 1 | 6 | 12;
    freeTrialDays?: number;
}

interface SubscriptionPlanType extends SubscriptionPlan{
    permissions: [];
}

interface GeneratedTrip {
    id: number;
    startDate: string | Date;
    endDate: string | Date;
    destination: string;
    flights: string[];
    accommodations: string[];
    activities: Activities[];
    transportation: string[];
    typeOfTravel: 'Solo' | 'Couple' | 'Family' | 'Group';
    typeOfTrip: 'Adventure' | 'Relaxation' | 'Cultural' | 'Nature' | 'Historical' | 'Romantic' | 'Wellness' | 'Cruise' | 'Road Trip' | 'Wildlife ' | 'Festival' | 'Culinary';
    budget: 'Economy' | 'Standard' | 'Luxury';
    averageTotalBudget: number;
    averageBudgetPerDay?: number;
    averageActivityHours: number;
    estimatedCost: number;
}    

interface Activities {
    id: number;
    name: string;
    description: string;
    location: string;
    durationInHours: number;
    price: number;
    typeOfActivity: 'Adventure' | 'Relaxation' | 'Cultural' | 'Nature' | 'Historical' | 'Romantic' | 'Wellness' | 'Cruise' | 'Road Trip' | 'Wildlife ' | 'Festival' | 'Culinary';
}    

interface Trip {
    id: number;
    destination: string;
    startDate: string | Date;
    endDate: string | Date;
    totalPrice: number;
    isPaid: boolean;
    userId: number;
    generatedTripId: number;
}    

