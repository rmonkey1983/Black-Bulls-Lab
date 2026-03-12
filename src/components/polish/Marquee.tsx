interface MarqueeProps {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    className?: string;
}

export function Marquee({ children, direction = 'left', className = "" }: MarqueeProps) {
    return (
        <div className={`overflow-hidden flex whitespace-nowrap ${className}`}>
            <div className={`flex w-max ${direction === 'right' ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                <div className="flex px-4 items-center">{children}</div>
                <div className="flex px-4 items-center">{children}</div>
                <div className="flex px-4 items-center">{children}</div>
                <div className="flex px-4 items-center">{children}</div>
            </div>
        </div>
    );
}
