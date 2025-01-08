import React, { useState } from 'react';
import{ PaceCalculator, HydrationCalculator, NutritionCalculator } from './Calculation';

const RacePlanner = () => {
    const [targetTime, setTargetTime] = useState('2:30:00');
    const [distance, setDistance] = useState(21.1);
    const [weight, setWeight] = useState(78);
    const [sweatRate, setSweatRate] = useState('medium');
    const [activeTab, setActiveTab] = useState('pace');

    // Calculate duration from target time
    const duration = parseInt(targetTime.split(':')[0]) + parseInt(targetTime.split(':')[1]) / 60;

    // Get data from calculators
    const paceData = PaceCalculator({ targetTime, distance });
    const hydrationData = HydrationCalculator({ weight, duration, sweatRate });
    const nutritionData = NutritionCalculator({ weight, duration });

    const formatPace = (pace) => {
        const minutes = Math.floor(pace);
        const seconds = Math.round((pace - minutes) * 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Simple SVG icons
    const icons = {
        timer: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        droplets: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
        ),
        apple: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 6V2" />
                <path d="M15 10s-2-2-3-2-3 2-3 2" />
            </svg>
        )
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Race Parameters</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Target Time (hh:mm:ss)
                        </label>
                        <input
                            type="text"
                            value={targetTime}
                            onChange={(e) => setTargetTime(e.target.value)}
                            placeholder="2:30:00"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Distance (km)
                        </label>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Sweat Rate
                        </label>
                        <select
                            value={sweatRate}
                            onChange={(e) => setSweatRate(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b">
                    <div className="flex divide-x">
                        <button
                            onClick={() => setActiveTab('pace')}
                            className={`flex items-center gap-2 px-4 py-3 flex-1 justify-center ${activeTab === 'pace'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            {icons.timer}
                            Pace Strategy
                        </button>
                        <button
                            onClick={() => setActiveTab('hydration')}
                            className={`flex items-center gap-2 px-4 py-3 flex-1 justify-center ${activeTab === 'hydration'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            {icons.droplets}
                            Hydration Plan
                        </button>
                        <button
                            onClick={() => setActiveTab('nutrition')}
                            className={`flex items-center gap-2 px-4 py-3 flex-1 justify-center ${activeTab === 'nutrition'
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-blue-600'
                                }`}
                        >
                            {icons.apple}
                            Nutrition Plan
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'pace' && paceData && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Pace Strategy</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left p-4 font-medium text-gray-600">KM</th>
                                            <th className="text-left p-4 font-medium text-gray-600">Target Pace</th>
                                            <th className="text-left p-4 font-medium text-gray-600">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paceData.splits.map((split) => (
                                            <tr key={split.kilometer} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="p-4">{split.kilometer}</td>
                                                <td className="p-4">{formatPace(split.targetPace)}/km</td>
                                                <td className="p-4">{split.notes}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'hydration' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Hydration Strategy</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="text-2xl font-bold mb-2">{hydrationData.hourlyRate}ml</div>
                                    <div className="text-sm text-gray-600">Per Hour</div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="text-2xl font-bold mb-2">{hydrationData.totalVolume}ml</div>
                                    <div className="text-sm text-gray-600">Total Volume</div>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <div className="text-2xl font-bold mb-2">{hydrationData.perStation}ml</div>
                                    <div className="text-sm text-gray-600">Per Aid Station</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {hydrationData.recommendations.map((rec, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div>{rec}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'nutrition' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Nutrition Strategy</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Pre-Race ({nutritionData.preRace.timing})
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="font-medium">Carbohydrates</div>
                                            <div className="text-2xl font-bold">{nutritionData.preRace.carbs}g</div>
                                        </div>
                                        <div>
                                            <div className="font-medium">Hydration</div>
                                            <div className="text-2xl font-bold">{nutritionData.preRace.hydration}ml</div>
                                        </div>
                                        <div className="space-y-2">
                                            {nutritionData.preRace.recommendations.map((rec, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <div>{rec}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold mb-4">During Race</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="font-medium">Energy Gels</div>
                                            <div className="text-2xl font-bold">{nutritionData.duringRace.gels.count} gels</div>
                                            <div className="text-sm text-gray-600">
                                                Take at: {nutritionData.duringRace.gels.timing.map(t => `${t}min`).join(', ')}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">Salt Tablets</div>
                                            <div className="text-2xl font-bold">{nutritionData.duringRace.saltTablets.total} tablets</div>
                                            <div className="text-sm text-gray-600">
                                                Take every {nutritionData.duringRace.saltTablets.frequency}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-medium">Hydration Schedule</div>
                                            <div>{nutritionData.duringRace.hydration.frequency}</div>
                                            <div className="text-sm text-gray-600">
                                                {nutritionData.duringRace.hydration.volume} per station
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RacePlanner;