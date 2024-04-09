'use client'
export default function InteractiveCard({ children }: { children: React.ReactNode }) {
    
    return (
        <div className='w-[298px] h-[496px] border border-stone-800 bg-stone-100 
        relative overflow-hidden transition-transform duration-300 ease-in-out
        hover:shadow-lg hover:shadow-stone-500/50  
        transform hover:-translate-x-1 hover:-translate-y-1'
        >
            {children}
        </div>
    );
}