'use client'

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
    
    return (
        <div className='w-max h-max border border-stone-800 bg-stone-100 
        relative overflow-hidden  duration-300 ease-in-out
        hover:shadow-lg hover:shadow-stone-500/50  
        transform  transition-all'
        >
            {children}
        </div>
    );
}