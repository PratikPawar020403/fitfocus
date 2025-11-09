
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Weight, Scale, Award, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface WilksResultsProps {
  wilksScore: number;
  status: string;
  description: string;
  liftedWeight: number;
  bodyWeight: number;
  benchPress?: number;
  squat?: number;
  deadlift?: number;
  calculationMethod?: 'separate' | 'combined';
}

const WilksResults: React.FC<WilksResultsProps> = ({
  wilksScore,
  status,
  description,
  liftedWeight,
  bodyWeight,
  benchPress,
  squat,
  deadlift,
  calculationMethod
}) => {
  const isMobile = useIsMobile();
  
  // Calculate progress value based on Wilks score
  const getProgressValue = () => {
    if (wilksScore >= 550) return 100;
    if (wilksScore >= 500) return 90;
    if (wilksScore >= 450) return 80;
    if (wilksScore >= 400) return 70;
    if (wilksScore >= 300) return 50;
    if (wilksScore >= 200) return 30;
    return 10;
  };
  
  // Get status color
  const getStatusColor = () => {
    if (status === 'optimal') return 'text-green-600';
    if (status === 'warning') return 'text-yellow-600';
    if (status === 'risk') return 'text-red-600';
    return 'text-blue-600';
  };
  
  // Get classification based on Wilks score
  const getClassification = () => {
    if (wilksScore >= 500) return { text: 'Elite', color: 'bg-purple-500' };
    if (wilksScore >= 400) return { text: 'Advanced', color: 'bg-blue-500' };
    if (wilksScore >= 300) return { text: 'Intermediate', color: 'bg-green-500' };
    if (wilksScore >= 200) return { text: 'Novice', color: 'bg-yellow-500' };
    return { text: 'Beginner', color: 'bg-gray-500' };
  };
  
  const statusColor = getStatusColor();
  const progressValue = getProgressValue();
  const classification = getClassification();
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Your Wilks Coefficient Results</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold">{wilksScore.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">Wilks Score</p>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${classification.color} text-white`}>
            <Award className="w-4 h-4 mr-1" />
            {classification.text}
          </span>
        </div>
        
        <div className="text-center mb-6">
          <p className={`text-lg font-medium ${statusColor}`}>{description}</p>
        </div>
        
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs sm:text-sm">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Advanced</span>
            <span>Elite</span>
          </div>
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>200</span>
            <span>300</span>
            <span>400</span>
            <span>500+</span>
          </div>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4 mb-6`}>
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center">
              <Weight className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm">Total Weight</span>
            </div>
            <p className="font-bold">{liftedWeight} kg</p>
          </div>
          
          {calculationMethod === 'separate' && (
            <>
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="text-sm">Bench Press</span>
                </div>
                <p className="font-bold">{benchPress} kg</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-sm">Squat</span>
                </div>
                <p className="font-bold">{squat} kg</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-emerald-500 mr-2" />
                  <span className="text-sm">Deadlift</span>
                </div>
                <p className="font-bold">{deadlift} kg</p>
              </div>
            </>
          )}
          
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center">
              <Scale className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">Body Weight</span>
            </div>
            <p className="font-bold">{bodyWeight} kg</p>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center">
              <Dumbbell className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-sm">Weight to BW Ratio</span>
            </div>
            <p className="font-bold">{(liftedWeight / bodyWeight).toFixed(2)}</p>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm">Calculation Type</span>
            </div>
            <p className="font-bold">
              Total (S+B+D)
              {calculationMethod === 'separate' && ' - Separately'}
            </p>
          </div>
        </div>
        
        <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
          <p className="mb-2 font-medium">About the Wilks Coefficient:</p>
          <p>
            The Wilks Coefficient normalizes strength performance across different body weights and genders. 
            A score above 300 is considered good for recreational lifters, while elite lifters often score above 450.
            This calculation is based on your total across squat, bench press, and deadlift.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WilksResults;
