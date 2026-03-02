"use client";

interface TimelineEvent {
    time: string;
    title: string;
    description: string;
}

interface EventTimelineProps {
    timeline: TimelineEvent[];
}

export function EventTimeline({ timeline }: EventTimelineProps) {
    return (
        <div className="py-12 bg-white/5 mx-6 rounded-2xl md:mx-auto max-w-4xl px-8">
            <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Programma della Serata</h3>

            <div className="space-y-8 border-l-2 border-white/10 pl-8 ml-2">
                {timeline.map((item, index) => (
                    <div key={index} className="relative group">
                        {/* Dot */}
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-black border-2 border-gold group-hover:bg-gold transition-colors duration-300" />

                        <span className="block text-gold font-mono text-sm mb-1">{item.time}</span>
                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
