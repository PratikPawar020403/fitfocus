
import React from "react";

const BMRInfoSection: React.FC = () => {
  return (
    <div className="mt-10 p-6 bg-secondary/30 rounded-xl">
      <h3 className="font-medium mb-2">About BMR and Caloric Needs</h3>
      <p className="text-sm text-muted-foreground">
        BMR is just your baseline caloric need. Your Total Daily Energy Expenditure (TDEE) includes additional calories burned through daily activities and exercise. For weight maintenance, you need to consume calories equal to your TDEE. For weight loss, consume fewer calories than your TDEE; for weight gain, consume more.
      </p>
    </div>
  );
};

export default BMRInfoSection;
