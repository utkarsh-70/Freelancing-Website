import React, { Component } from "react";
import "./RatingPage.css";
import Rating from 'react-rating';
import { Button } from "react-bootstrap";
import starempty from '../../Assets/star-empty.png';
//import starfull from '../../Assets/star-full.png';
import stargrey from '../../Assets/star-grey.png';
import starred from '../../Assets/star-red.png';
import staryellow from '../../Assets/star-yellow.png';
import starorange from '../../Assets/star-orange.png';
import stargreen from '../../Assets/star-green.png';
import stargreenn from '../../Assets/star-greenn.png';
import staryellow3 from '../../Assets/star-yellow3.png';
import moment from 'moment';

//import stargrey2 from '../../Assets/star-grey2.png';
//import starred2 from '../../Assets/star-red2.png';
//import staryellow2 from '../../Assets/star-yellow2.png';

class RatingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 3,
            review: "",
            star: starempty,
            tend: moment(),
            tstart: moment()
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ value: undefined });
    }
    onRatingChange = input => {
        switch (input) {
            case 0.5: this.setState({ star: starred }); break;
            case 1: this.setState({ star: starred }); break;
            case 1.5: this.setState({ star: starred }); break;
            case 2: this.setState({ star: starorange }); break;
            case 2.5: this.setState({ star: starorange }); break;
            case 3: this.setState({ star: starorange }); break;
            case 3.5: this.setState({ star: staryellow3 }); break;
            case 4: this.setState({ star: staryellow3 }); break;
            case 4.5: this.setState({ star: stargreenn }); break;
            case 5: this.setState({ star: stargreenn }); break;
            default: this.setState({ star: stargrey });
        }
        this.setState({ rate: input });
    }
    onReviewChange = input => {
        this.setState({ review: input.target.value });
    }

    ratingChange = input => {
        fetch("/rating", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                issueid: this.props.storedData.id,
                cusemail: this.props.email,
                SPemail: this.props.storedData.acceptedBy,
                rating: this.state.rate,
                review: this.state.review,
                tend: this.state.tend,
                tstart: this.state.tstart
            })
        })
            .then(res => res.json())          // convert to plain text
        this.props.setView("Feed");
    }
    
    render() {
        return (
            <div >
                <h1 id="myRating"> Feedback </h1> <br />
                <div id="ratingContainer">
                    <Rating
                        stop={5}
                        emptySymbol={<img alt="stargrey" src={stargrey} className="icon" />}
                        fullSymbol={[<img alt="starred" src={starred} className="icon" />, <img alt="starorange" src={starorange} className="icon" />, <img alt="stargreenn" src={stargreenn} className="icon" />, <img alt="stargreen" src={stargreen} className="icon" />, <img alt="staryellow" src={staryellow} className="icon" />]}
                        fractions={2}
                        initialRating={this.state.rate}
                        onChange={(rate) => this.onRatingChange(rate)}
                        fullSymbol={<img alt="star" src={this.state.star} className="icon" />}
                    />
                </div>
                <br /><br />
                <textarea
                    id="textbox"
                    name="ReviewBox"
                    cols="50"
                    rows="5"
                    placeholder="Write a review"
                    onChange={this.onReviewChange}
                />
                <br /><br />
                <Button variant="primary" onClick={this.ratingChange}>
                    Submit
                </Button>
            </div >
        );
    }
}

export default RatingPage;
