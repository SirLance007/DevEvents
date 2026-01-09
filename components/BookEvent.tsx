'use client'
import { useState } from "react";

const BookEvent = () => {
    const [email , setEmail] = useState('');
    const [sumbitted , setSumbitted] = useState(false);

    const handleSumbit = (e : React.FormEvent) => {
        e.preventDefault();

        setTimeout(() => {
            setSumbitted(true);
        } , 1000)
    }
    return (
        <div id='book-event'>
            {sumbitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ) : (
                <form onSubmit={handleSumbit} >
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                        id="email"
                        placeholder="Enter your email address"/>
                    </div>

                    <button type="submit" className="button-sumbit">Sumbit</button>

                    <div>
                        
                    </div>
                </form>
            )}
        </div>
    )
}

export default BookEvent