import React, { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';

function bidpostexample() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault(); 

        const formattedDate = selectedDate?.toISOString().replace('T', ' ').split('.')[0];
        console.log(formattedDate)

        localStorage.setItem('auctionEndDate', formattedDate);
    };

    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <DateTimePicker
                    clearable
                    value={selectedDate}
                    label="Auction End Date"
                    placeholder="Pick date and time"
                    onChange={(date) => setSelectedDate(date)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default bidpostexample