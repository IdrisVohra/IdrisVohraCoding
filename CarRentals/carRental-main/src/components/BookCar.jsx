import { useEffect, useState } from "react";
import Datsun from "../images/cars-big/Datsun.jpg";
import Grandi10 from "../images/cars-big/Grandi10.jpg";
import Hundai_I20Grand from "../images/cars-big/Hundai_I20Grand.jpg";
import Hundai_I20Asta from "../images/cars-big/Hundai_I20Asta.jpg";
import close from "../images/cars-big/close.jpg";
import axios from "axios";

function BookCar() {
  const [modal, setModal] = useState(false); //  class - active-modal

  // booking car
  const [carRegNumber, setcarRegNumber] = useState("");
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");

  // modal infos
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [pricePerHour, setpricePerHour] = useState("");
  const [advancePaid, setadvancePaid] = useState("");
  const [totalHours, settotalHours] = useState("");
  const [totalTripCharge, settotalTripCharge] = useState("");
  const [documentsSubmitted, setdocumentsSubmitted] = useState("1");

  // taking value of modal inputs
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZipCode(e.target.value);
  };

  const handleAdvancePaid = (e) => {
    setadvancePaid(e.target.value);
  };

  const handlePricePerHour = (e) => {
    setpricePerHour(e.target.value);
  };

  const handleTotalHours = (e) => {
    settotalHours(e.target.value);
  };

  const handleTotalTripCharges = (e) => {
    settotalTripCharge(e.target.value);
  };

  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  // confirm modal booking
  const confirmBooking = async (e) => {
    e.preventDefault();
    setModal(!modal);

    const rentalData = {
      carRegNumber,
      name,
      age,
      email,
      phone,
      pickUp,
      dropOff,
      pickTime,
      dropTime,
      address,
      carType,
      totalHours,
      pricePerHour,
      advancePaid,
      totalTripCharge,
      documentsSubmitted,
    };
    
    try {
      await axios.post('http://localhost:5000/api/rentals', rentalData);

    } catch (error) {
      console.error("Error submitting rental:", error);
    }

    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
  };

  // taking value of booking inputs
  const handleCar = (e) => {
    setCarType(e.target.value);
    setCarImg(e.target.value);
    FetchCarRegNumber(e.target.value);
  };

  const handlePick = (e) => {
    setPickUp(e.target.value);
  };

  function FetchCarRegNumber(cartype) {
    switch (cartype) {
      case "Nissan Datsun":
        setcarRegNumber("MH47AG2496");
        break;
      case "Hyundai I10":
        setcarRegNumber("MH04HU1816");
        break;
      case "Hyundai I20 Grand":
        setcarRegNumber("MH47AB5393");
        break;
      case "Hyundai I20 Asta":
        setcarRegNumber("MH03BU2822");
        break;
      default:
        setcarRegNumber("");
    }
  };

  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };

  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };

  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };

  const handleDocument = (e) => {
    setdocumentsSubmitted(e.target.value);
  }

  const handleCancleclick = async() => {
    setModal(false);
  }

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Nissan Datsun":
      imgUrl = Datsun;
      break;
    case "Hyundai I10":
      imgUrl = Grandi10;
      break;
    case "Hyundai I20 Grand":
      imgUrl = Hundai_I20Grand;
      break;
    case "Hyundai I20 Asta":
      imgUrl = Hundai_I20Asta;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select value={carType} onChange={handleCar}>
                    <option>Select your car type</option>
                    <option value="Nissan Datsun">Nissan Datsun</option>
                    <option value="Hyundai I10">Hyundai I10</option>
                    <option value="Hyundai I20 Grand">Hyundai I20 Grand</option>
                    <option value="Hyundai I20 Asta">Hyundai I20 Asta</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option>Delhi</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off{" "}
                    <b>*</b>
                  </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option>Delhi</option>
                    <option>Kolkata</option>
                    <option>Bengaluru</option>
                    <option>Mumbai</option>
                    <option>Goa</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <button onClick={handleCancleclick}>
            <img src={close}/>
          </button>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>

        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            {imgUrl && <img src={imgUrl} alt="car_img" />}
          </div>
        </div>
        {/* personal info */}
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name}
                  onChange={handleName}
                  type="text"
                  placeholder="Enter your first name"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName}
                  onChange={handleLastName}
                  type="text"
                  placeholder="Enter your last name"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone}
                  onChange={handlePhone}
                  type="tel"
                  placeholder="Enter your phone number"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input
                  value={age}
                  onChange={handleAge}
                  type="number"
                  placeholder="18"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={email}
                  onChange={handleEmail}
                  type="email"
                  placeholder="Enter your email address"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  value={address}
                  onChange={handleAddress}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input
                  value={city}
                  onChange={handleCity}
                  type="text"
                  placeholder="Enter your city"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>
              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input
                  value={zipcode}
                  onChange={handleZip}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Total Hours <b>*</b>
                </label>
                <input
                  value={totalHours}
                  onChange={handleTotalHours}
                  type="text"
                  placeholder="Enter Total Hours of Trip"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Price Per Hour <b>*</b>
                </label>
                <input
                  value={pricePerHour}
                  onChange={handlePricePerHour}
                  type="text"
                  placeholder="Enter Price Per Hour"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Advance Paid <b>*</b>
                </label>
                <input
                  value={advancePaid}
                  onChange={handleAdvancePaid}
                  type="text"
                  placeholder="Enter your Advance Paid"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Total Trip Charge <b>*</b>
                </label>
                <input
                  value={totalTripCharge}
                  onChange={handleTotalTripCharges}
                  type="text"
                  placeholder="Enter Total Trip Charges"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  DocumentSubmitted <b>*</b>
                </label>
                <input
                  value={documentsSubmitted}
                  onChange={handleDocument}
                  type="checkbox"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="reserve-button">
              <button onClick={confirmBooking}>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;
