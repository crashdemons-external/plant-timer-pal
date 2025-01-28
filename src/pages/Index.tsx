import { useState, useEffect } from "react";
import { Plant } from "@/types/plant";
import PlantCard from "@/components/PlantCard";
import AddPlantForm from "@/components/AddPlantForm";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [plants, setPlants] = useState<Plant[]>(() => {
    const saved = localStorage.getItem("plants");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const handleAddPlant = (name: string, interval: number) => {
    const newPlant: Plant = {
      id: uuidv4(),
      name,
      interval,
      lastWatered: new Date().toISOString(),
    };
    setPlants([...plants, newPlant]);
  };

  const handleWaterPlant = (id: string) => {
    setPlants(plants.map(plant => 
      plant.id === id 
        ? { ...plant, lastWatered: new Date().toISOString() }
        : plant
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Plant Watering Timer</h1>
            <p className="text-gray-600">Keep track of when to water your plants</p>
          </div>

          <AddPlantForm onAdd={handleAddPlant} />

          <div className="grid gap-6 md:grid-cols-2">
            {plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                onWater={handleWaterPlant}
              />
            ))}
          </div>

          {plants.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No plants added yet. Add your first plant above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;