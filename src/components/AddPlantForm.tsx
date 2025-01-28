import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AddPlantFormProps {
  onAdd: (name: string, interval: number) => void;
}

const AddPlantForm = ({ onAdd }: AddPlantFormProps) => {
  const [name, setName] = useState("");
  const [interval, setInterval] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !interval) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    const intervalNum = parseInt(interval);
    if (intervalNum <= 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Interval must be greater than 0",
      });
      return;
    }

    onAdd(name, intervalNum);
    setName("");
    setInterval("");
    
    toast({
      title: "Plant Added! 🌱",
      description: "Your new plant has been added successfully.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="name">Plant Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Snake Plant"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="interval">Watering Interval (days)</Label>
        <Input
          id="interval"
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          placeholder="e.g., 7"
          min="1"
        />
      </div>

      <Button type="submit" className="w-full bg-plant-500 hover:bg-plant-600">
        Add Plant
      </Button>
    </form>
  );
};

export default AddPlantForm;