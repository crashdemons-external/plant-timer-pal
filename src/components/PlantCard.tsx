import { Plant } from "@/types/plant";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { differenceInDays } from "date-fns";

interface PlantCardProps {
  plant: Plant;
  onWater: (id: string) => void;
}

const PlantCard = ({ plant, onWater }: PlantCardProps) => {
  const { toast } = useToast();
  const daysSinceWatered = differenceInDays(new Date(), new Date(plant.lastWatered));
  const daysUntilWatering = plant.interval - daysSinceWatered;
  const needsWater = daysUntilWatering <= 0;

  const handleWater = () => {
    onWater(plant.id);
    toast({
      title: "Plant Watered! 🌿",
      description: `${plant.name} has been watered. Timer reset.`,
    });
  };

  return (
    <Card className="relative p-6 hover:shadow-lg transition-shadow">
      {needsWater && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-timer-ping absolute inline-flex h-full w-full rounded-full bg-plant-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-plant-500"></span>
        </span>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{plant.name}</h3>
          <p className="text-sm text-gray-500">
            Waters every {plant.interval} day{plant.interval !== 1 ? "s" : ""}
          </p>
        </div>
        
        <div className="space-y-2">
          <p className={`text-lg font-medium ${needsWater ? "text-plant-500" : "text-gray-700"}`}>
            {needsWater
              ? "Needs water now!"
              : `Water in ${daysUntilWatering} day${daysUntilWatering !== 1 ? "s" : ""}`}
          </p>
          <Button 
            onClick={handleWater}
            className="w-full bg-plant-500 hover:bg-plant-600"
          >
            Mark as Watered
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PlantCard;