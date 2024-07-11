import { useQuery } from '@tanstack/react-query'
import React from 'react'

interface CoinsWidgetProps {
    coinList: string[]
}

const CoinsWidget = ({ coinList}: CoinsWidgetProps) => {
    const getCoins = async () => {
        const queryParams = coinList.join(',');
        const response = await fetch(`/api/getCoinsUSD?coinList=${queryParams}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }

    const {data, isLoading, error} = useQuery({ queryKey:['coins'], queryFn: getCoins} );

    if (isLoading) return <div className='font-mono font-semibold'>Loading...</div>
    if (error) return <div className='text-red-500 font-semibold'>Error fetching data</div>

    return (
        <div>
            <div className='font-bold font-mono'>Coins Widget</div>
            {coinList.map((coin) => (
                <div key={coin} className='flex gap-2 py-2'>
                    <div className='font-mono text-sm'>{coin}:</div>
                    <div className='font-mono text-sm'>
                        ${data && data[coin] ? data[coin].usd.toFixed(2) : 'N/A'}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default CoinsWidget;