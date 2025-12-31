
import React from 'react';
import Card from '../components/Card';

const skills = [
    'Artificial Intelligence', 'Machine Learning', 'Data Science', 
    'Cybersecurity', 'Mechanical Systems', 'Thermodynamics', 
    'Fluid Dynamics', 'Finite Element Analysis'
];

const timeline = [
    { year: '2021', event: 'Started BE Mechanical Engineering Journey' },
    { year: '2022', event: 'Internship in Thermal Systems Design' },
    { year: '2023', event: 'Certified in Advanced AI/ML Applications' },
    { year: 'Present', event: 'Founder of Neutrinom & GATE ME AIR-1 Aspirant' },
];

const AboutAuthor: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="flex flex-col md:flex-row items-center gap-6">
                 <img
                    src={`https://picsum.photos/seed/neutrinom/128/128`}
                    alt="Bavanandhan V"
                    className="w-32 h-32 rounded-full border-4 border-cyan-400 shadow-lg"
                />
                <div>
                    <h1 className="text-4xl font-black text-white sm:text-5xl">Bavanandhan V</h1>
                    <p className="mt-2 text-xl text-cyan-300">Founder, Neutrinom | BE Mechanical Engineering</p>
                </div>
            </header>

            <Card>
                 <blockquote className="text-center p-4 border border-gray-700 rounded-lg bg-gray-900/50">
                    <p className="text-xl italic text-gray-200">
                        “Engineering is not just problem-solving, it is responsibility towards humanity.”
                    </p>
                </blockquote>
            </Card>

             <Card>
                <h2 className="text-2xl font-bold text-white mb-4">Vision Statement</h2>
                <p className="text-gray-300 leading-relaxed">
                    My singular goal is to achieve All India Rank 1 in the GATE Mechanical Engineering examination. This pursuit is not merely for personal achievement, but to lay the foundation for Neutrinom's mission. By mastering the fundamentals at the deepest level, I aim to build educational tools and technologies that empower fellow engineers to not only excel in competitive exams but to become architects of a better, technologically advanced India.
                </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold text-white mb-4">Professional Timeline</h3>
                    <div className="relative border-l-2 border-cyan-500/30 pl-6 space-y-8">
                        {timeline.map((item, index) => (
                             <div key={index} className="relative">
                                <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-cyan-400 border-4 border-gray-800"></div>
                                <p className="font-bold text-cyan-300">{item.year}</p>
                                <p className="text-gray-300">{item.event}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="text-xl font-bold text-white mb-4">Skills & Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => (
                             <span key={skill} className="bg-gray-700 text-cyan-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                                {skill}
                            </span>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AboutAuthor;
