import React, { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';

function bidpostexample() {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior if needed

        // Format selected date
        const formattedDate = selectedDate?.toISOString();

        // Store formatted date in local storage
        localStorage.setItem('auctionEndDate', formattedDate);
    };

    console.log(selectedDate)
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