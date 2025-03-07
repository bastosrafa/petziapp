import { useState } from "react";
import { Button } from "../../shadcn/components/ui/button";


export default function TrainingCarousel({ lesson, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < lesson.steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {currentStep === 0 ? (
        <>
          <img
            src={lesson.image}
            alt={lesson.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-bold text-center">{lesson.title}</h2>
          <p className="text-center text-gray-600">{lesson.description}</p>
        </>
      ) : (
        <p className="text-lg text-center">{lesson.steps[currentStep - 1]}</p>
      )}
      <Button onClick={nextStep} className="mt-4">
        {currentStep < lesson.steps.length ? "Próximo" : "Concluir"}
      </Button>
    </div>
  );
}
