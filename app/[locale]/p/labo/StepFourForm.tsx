import React from 'react';

interface StepFourFormProps {
  description: string;
  setDescription: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
}

const StepFourForm: React.FC<StepFourFormProps> = ({ description, setDescription, price, setPrice }) => {
  return (
    <div>
      <div className="mb-6 relative">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
          rows={4}
          required
        />
      </div>

      <div className="mb-6 relative">
        <label
          htmlFor="prix"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Prix par jour (€)
        </label>
        <input
          type="number"
          id="prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
          required
        />
      </div>
    </div>
  );
};

export default StepFourForm;
