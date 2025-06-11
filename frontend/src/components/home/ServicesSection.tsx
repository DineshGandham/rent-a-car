import { ShieldCheck, Car, Wrench } from 'lucide-react';

const services = [
  { icon: <ShieldCheck size={32} />, title: 'Insurance Covered', description: 'All rentals come with full insurance for peace of mind.' },
  { icon: <Car size={32} />, title: 'Luxury Fleet', description: 'Choose from top brands like BMW, Audi, and Mercedes.' },
  { icon: <Wrench size={32} />, title: '24/7 Roadside Help', description: 'We provide instant support in case of emergencies.' },
];

const ServicesSection = () => (
  <section className="py-16 px-6 bg-gray-800">
    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
    <div className="flex flex-col md:flex-row justify-center items-center gap-8">
      {services.map((s, index) => (
        <div key={index} className="bg-gray-900 rounded-xl p-6 text-center w-full max-w-sm shadow-md hover:scale-105 transition">
          <div className="text-red-500 mb-4">{s.icon}</div>
          <h4 className="text-xl font-semibold mb-2">{s.title}</h4>
          <p className="text-gray-300">{s.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ServicesSection;