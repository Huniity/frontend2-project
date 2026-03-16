'use client'

import { useState, useEffect } from 'react'

const FullYear = () => {
    const [year, setYear] = useState<number | null>(null);
    
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    if (year === null) return null;
    return <span>{year}</span>;
}

export default FullYear;