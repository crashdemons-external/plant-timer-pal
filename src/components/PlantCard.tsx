import { Plant } from "@/types/plant";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { useState, useEffect } from "react";

interface PlantCardProps {
  plant: Plant;
  onWater: (id: string) => void;
}

const PlantCard = ({ plant, onWater }: PlantCardProps) => {
  const { toast } = useToast();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const lastWatered = new Date(plant.lastWatered);
      const nextWatering = new Date(lastWatered);
      nextWatering.setDate(nextWatering.getDate() + plant.interval);

      if (now >= nextWatering) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(nextWatering, now);
      const hours = differenceInHours(nextWatering, now) % 24;
      const minutes = differenceInMinutes(nextWatering, now) % 60;
      const seconds = differenceInSeconds(nextWatering, now) % 60;

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [plant.lastWatered, plant.interval]);

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
          {!needsWater && (
            <div className="grid grid-cols-4 gap-2 text-center text-sm text-gray-600">
              <div>
                <div className="font-semibold">{timeRemaining.days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div>
                <div className="font-semibold">{timeRemaining.hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div>
                <div className="font-semibold">{timeRemaining.minutes}</div>
                <div className="text-xs">Mins</div>
              </div>
              <div>
                <div className="font-semibold">{timeRemaining.seconds}</div>
                <div className="text-xs">Secs</div>
              </div>
            </div>
          )}
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