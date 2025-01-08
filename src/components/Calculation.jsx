import  { useState, useEffect } from 'react';

// Pace Calculator Component
const PaceCalculator = ({ targetTime = '2:30:00', distance = 21.1 }) => {
    const [paceData, setPaceData] = useState(null);

    useEffect(() => {
        const [hours, minutes] = targetTime.split(':').map(Number);
        const totalMinutes = (hours * 60) + minutes;
        const pacePerKm = totalMinutes / distance;

        // Conservative pacing for beginner with cramps history
        const splits = Array.from({ length: Math.ceil(distance) }, (_, i) => {
            let adjustedPace = pacePerKm;

            // First 5K slower
            if (i < 5) {
                adjustedPace *= 1.05; // 5% slower
            }

            // Hills at Peddar Road (around 15km)
            if (i >= 14 && i <= 16) {
                adjustedPace *= 1.1; // 10% slower
            }

            return {
                kilometer: i + 1,
                targetPace: adjustedPace,
                splitTime: adjustedPace,
                notes: getSplitNotes(i + 1, distance)
            };
        });

        setPaceData({
            averagePace: pacePerKm,
            splits,
            totalTime: totalMinutes
        });
    }, [targetTime, distance]);

    return paceData;
};

// Hydration Calculator Component
const HydrationCalculator = ({ weight = 78, duration = 2.5, sweatRate = 'low' }) => {
    const baseRates = {
        low: 400,    // ml per hour
        medium: 600, // ml per hour
        high: 800    // ml per hour
    };

    const hourlyRate = Math.round(baseRates[sweatRate] * 1.15); // 15% extra for Mumbai humidity
    const totalVolume = Math.round(hourlyRate * duration);
    const aidStations = Math.floor(21.1 / 2.5); // Every 2.5km

    return {
        hourlyRate,
        totalVolume,
        perStation: Math.round(totalVolume / aidStations),
        recommendations: [
            'Drink 150-200ml at each aid station',
            'Take electrolytes every 45 minutes',
            'Monitor bathroom urges - reduce intake if too frequent'
        ]
    };
};

// Nutrition Calculator Component
const NutritionCalculator = ({ weight = 78, duration = 2.5 }) => {
    // Based on 30-60g carbs per hour for beginner
    const carbsPerHour = 45; // Conservative approach
    const totalCarbs = Math.round(carbsPerHour * duration);
    const gelsNeeded = Math.ceil(totalCarbs / 22); // 22g carbs per gel

    return {
        preRace: {
            timing: '2 hours before',
            carbs: Math.round(weight * 1.5), // 1.5g/kg
            hydration: Math.round(weight * 10), // 10ml/kg
            recommendations: [
                'Light, familiar breakfast',
                'Small sips of water',
                'Avoid new foods'
            ]
        },
        duringRace: {
            gels: {
                count: gelsNeeded,
                timing: Array.from({ length: gelsNeeded }, (_, i) =>
                    30 + (i * 45) // First at 30 min, then every 45 min
                )
            },
            hydration: {
                frequency: 'Every 2.5km at aid stations',
                volume: '150-200ml'
            },
            saltTablets: {
                frequency: 'Every 45 minutes',
                total: Math.ceil(duration / 0.75)
            }
        }
    };
};

// Helper function for split notes
const getSplitNotes = (km, distance) => {
    if (km <= 5) return 'Start easy, find rhythm';
    if (km >= 14 && km <= 16) return 'Peddar Road - take it easy';
    if (km > distance - 3) return 'Final push if feeling good';
    return 'Maintain steady effort';
};

export { PaceCalculator, HydrationCalculator, NutritionCalculator };