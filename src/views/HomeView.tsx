import React from "react";
import Screenshot from "../assets/screenshot.png";

export default function HomeView() {
    return (
        <>
            <div className="text-center">
                <h1 className="mt-4 display-5 fw-bold">We are BBDash</h1>
                <div className="d-flex flex-column col-lg-8 mx-auto">
                    <p className="lead mb-4">
                    BBDash lays your course content out in an innovative and efficient format, that you can very finely customize to fit your needs.
                    </p>
                    <img src={Screenshot} />
                </div>
            </div>
            <hr />
            <h3>Our Pitch</h3>
            <p>
                Keeping track of your grades, classes, assignments, and zoom links can be a hassle. Blackboard often scatters your data across many different pages, which drains precious time. We will be creating a Chrome extension that can help keep track of all your classes and assignments in a TweetDeck-style layout. It will have columns like in Tweetdeck, with each column specialized to a different painpoint of Blackboard. There will be a column that shows all of your grades, a column that shows all of your due dates, a column that shows all of your classes for the day, and many other specialized columns. These columns can be deleted, moved around, and customized to fit each user’s needs.
            </p>
        </>
    );
}