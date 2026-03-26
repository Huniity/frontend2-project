import type { TripType, BudgetLevel } from "@/generated/prisma/client";

const BUDGET_GUIDES = {
  LOW: {
    perPersonPerDay: "30-60",
    hotel: "20-50 per night",
    meal: "5-15 per meal",
    activity: "0-20 per activity",
    description: "budget traveler, hostels, street food, free attractions",
  },
  MEDIUM: {
    perPersonPerDay: "100-180",
    hotel: "80-150 per night",
    meal: "20-50 per meal",
    activity: "20-60 per activity",
    description: "comfortable traveler, 3-star hotels, casual restaurants, paid attractions",
  },
  HIGH: {
    perPersonPerDay: "300-500",
    hotel: "200-400 per night",
    meal: "80-200 per meal",
    activity: "50-200 per activity",
    description: "luxury traveler, 4-5 star hotels, fine dining, premium experiences",
  },
};

export function buildTripGenerationPrompt({
  destination,
  numberOfDays,
  tripType,
  budgetLevel,
  numberOfPersons,
  departureCity,
  startDate,
}: {
  destination: string;
  numberOfDays: number;
  tripType: TripType;
  budgetLevel: BudgetLevel;
  numberOfPersons: number;
  departureCity: string;
  startDate?: string;
}) {
  const budget = BUDGET_GUIDES[budgetLevel];
  const maxTotalBudget = budgetLevel === "LOW"
    ? 60 * numberOfDays * numberOfPersons
    : budgetLevel === "MEDIUM"
    ? 180 * numberOfDays * numberOfPersons
    : 500 * numberOfDays * numberOfPersons;

  const dateInfo = startDate
    ? `- Travel start date: ${startDate} — factor in seasonal pricing, weather and local events`
    : `- Travel date: not specified — use average seasonal pricing`;

  return `
You are an expert travel planner. Generate a complete and detailed trip plan as a single valid JSON object. No explanation, no markdown, just the raw JSON.

Trip details:
- Destination: ${destination}
- Departure city: ${departureCity}
- Number of days: ${numberOfDays}
- Trip type: ${tripType}
- Budget level: ${budgetLevel} — ${budget.description}
- Number of persons: ${numberOfPersons}
${dateInfo}

STRICT BUDGET RULES — you MUST follow these exactly:
- Currency: ALL PRICES MUST BE IN EUROS (€)
- Per person per day (local expenses only): €${budget.perPersonPerDay}
- Hotel per night: €${budget.hotel}
- Per meal cost: €${budget.meal}
- Per activity cost: €${budget.activity}
- Max totalBudget for this trip: €${maxTotalBudget}
- totalBudget MUST be the SUM of all local costs: (hotel total cost + all daily activity costs + all meal costs)
- Calculate totalBudget by summing: hotel.totalCost + sum of all activities estimatedCost + meals throughout trip
- Ensure the sum of all components equals totalBudget — NO component costs should exist outside this total
- totalBudget covers ONLY local expenses (hotel + food + activities) — do NOT include flights
- Flight/transport cost from ${departureCity} to ${destination} is tracked separately in the transportation field
- All individual estimatedCost values must match the budget profile above and be in euros
- budgetPerDay = totalBudget / ${numberOfDays}
- IMPORTANT: After generating all days and activities, calculate totalBudget as the exact sum of hotel.totalCost + all activities + all meals
- REMINDER: Every single price in the response must be in euros, not any other currency

Return ONLY this JSON structure, nothing else:
{
  "title": "A creative evocative trip title",
  "summary": "2-sentence overview of the trip",
  "totalBudget": <CALCULATE as: hotel.totalCost + sum of all activity estimatedCosts across all days>,
  "budgetPerDay": <totalBudget divided by ${numberOfDays}>,
  "aiTips": [
    "Practical insider tip 1 for this destination",
    "Practical insider tip 2",
    "Practical insider tip 3"
  ],
  "hotel": {
    "name": "Hotel name",
    "address": "Full address",
    "pricePerNight": <number matching hotel budget: ${budget.hotel}>,
    "totalCost": <pricePerNight * ${numberOfDays}>,
    "stars": <1-5>,
    "notes": "Brief note about why this hotel fits the trip"
  },
  "transportation": {
    "mode": "<FLIGHT|TRAIN|BUS|CAR|FERRY|OTHER>",
    "provider": "Recommended airline or transport provider from ${departureCity} to ${destination}",
    "departureFrom": "${departureCity}",
    "arrivalTo": "${destination}",
    "estimatedCost": <realistic flight or transport cost per person from ${departureCity} to ${destination}>,
    "budgetNote": "Practical tip about getting from ${departureCity} to ${destination} and estimated total flight cost for ${numberOfPersons} person(s)",
    "dailyTransport": {
      "mode": "Main local transport mode (e.g. metro, taxi, bus, tuk-tuk)",
      "estimatedCostPerDay": <realistic daily local transport cost per person in EUR>,
      "tips": "2-3 practical tips about getting around ${destination} daily (e.g. buy metro pass, use Uber, avoid taxis at night)"
    }
  },
  "days": [
    {
      "dayNumber": 1,
      "summary": "One sentence summary of the day theme",
      "dailyCost": <realistic daily cost for ${numberOfPersons} person(s) matching budget profile>,
      "narrative": "3-4 sentence narrative of the day: where you go, how you get there, what local transport to take between spots, costs. Written like a travel guide.",
      "activities": [
        {
          "order": 1,
          "title": "Activity title",
          "description": "2-3 sentence description with practical info",
          "location": "Specific place name or address",
          "category": "<SIGHTSEEING|FOOD|ADVENTURE|CULTURE|RELAXATION|SHOPPING|TRANSPORT|OTHER>",
          "startTime": "09:00",
          "endTime": "11:00",
          "estimatedCost": <cost per person>,
          "lat": <latitude as decimal number>,
          "lng": <longitude as decimal number>
        }
      ]
    }
  ]
}

Rules:
- Generate exactly ${numberOfDays} days
- Each day must have 4-6 activities
- Include accurate GPS coordinates (lat/lng) for EVERY activity
- Group activities naturally into morning/afternoon/evening by their startTime
- aiTips must be practical and specific to ${destination}
- narrative per day must mention local transport between places and estimated costs
- dailyTransport.estimatedCostPerDay must match ${budgetLevel} budget level
- CRITICAL: totalBudget MUST equal the exact sum of (hotel.totalCost + all activities estimatedCost + all meals during trip + transportation.estimatedCost and dailyTransport.estimatedCostPerDay * ${numberOfDays} * ${numberOfPersons})
- Ensure all component costs sum correctly — every euro in components must be accounted for in totalBudget
- STRICTLY follow the budget constraints above — totalBudget must not exceed €${maxTotalBudget}
- Return ONLY the raw JSON, no markdown fences, no explanation
`.trim();
}