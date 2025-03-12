import React from "react";
import DrugList from "../../components/DrugList";
export default function DrugsPage() {
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
       <div className=''>
            <h1>
                We bring the Pharmacy to <br/>
                you Future, Today
            </h1>
            <p>
            Our Mission is to provide unwavering compassionate care to every individual 
            entrust us with their health
            </p>
            <button onClick=''>Order Drugs</button>

        </div>
      <DrugList />
    </div>
  );
}
