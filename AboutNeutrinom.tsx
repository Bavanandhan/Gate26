
import React from 'react';
import Card from '../components/Card';

const AboutNeutrinom: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <header className="text-center">
                <h1 className="text-4xl font-black text-white sm:text-5xl tracking-tighter">NEUTRINOM</h1>
                <p className="mt-3 text-xl text-cyan-300">Engineering Intelligence for a Boundless Future</p>
            </header>

            <Card>
                <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4">Our Vision</h2>
                <p className="mt-4 text-gray-300 leading-relaxed">
                    Neutrinom is more than an educational platform; it is an engineering innovation and education initiative poised to redefine the boundaries of technological advancement. We are dedicated to cultivating a new generation of engineers who are not only technically proficient but also ethically grounded and driven by a purpose to serve humanity.
                </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="text-xl font-bold text-white mb-4">Core Focus</h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                            <span><strong>Ethical Engineering:</strong> Instilling a deep sense of responsibility and integrity in every engineering endeavor.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                            <span><strong>AI + Mechanical Integration:</strong> Pioneering the synergy between artificial intelligence and core mechanical systems to create intelligent, autonomous solutions.</span>
                        </li>
                        <li className="flex items-start">
                             <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                            <span><strong>Equal Learning Opportunities:</strong> Democratizing access to high-quality, advanced engineering education for aspirants everywhere.</span>
                        </li>
                         <li className="flex items-start">
                             <span className="text-cyan-400 mr-3 mt-1">&#10148;</span>
                            <span><strong>Nation-Building through Technology:</strong> Developing indigenous technologies that solve critical national challenges and foster self-reliance.</span>
                        </li>
                    </ul>
                </Card>
                 <Card variant="accent">
                    <h3 className="text-xl font-bold text-white mb-4">The Name: NEUTRINOM</h3>
                    <p className="text-gray-200 leading-relaxed">
                        Inspired by the <strong className="text-cyan-300">Neutrino</strong> — one of the most fundamental and elusive subatomic particles in the universe.
                    </p>
                     <blockquote className="mt-4 border-l-2 border-cyan-400 pl-4 italic text-cyan-100">
                        "Like the neutrino, which possesses a tiny mass yet travels near the speed of light and holds keys to the cosmos, we believe in the <strong className="font-semibold">smallest particle, infinite potential</strong>. Every student, every idea, holds the potential to create monumental change."
                    </blockquote>
                </Card>
            </div>
        </div>
    );
};

export default AboutNeutrinom;
