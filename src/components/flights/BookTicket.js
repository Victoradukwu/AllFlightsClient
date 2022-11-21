import React, {useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextInput from "../common/TextInput";
import {useSelector, useDispatch} from 'react-redux'
import SelectInput from "../common/SelectInput";
import {bookTicket} from "../../redux/actions/flightActions";
import {toast} from "react-toastify";
// import Loader from "rsuite/Loader";

const BookTicket = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user?state.auth.user.user:{});
  const flight = useSelector(state => state.flight.flights.find(flt=>flt.id == id));

  const [contact, setContact] = useState({
    contactFirstName: user.firstName,
    contactLastName: user.lastName,
    contactEmail: user.email,
    contactPhone: user.phoneNumber,
    flightClass: 'Economy',
    passengerCount: 1
  });

  let [inputFields, setInputFields] = useState([{firstName: '', lastName: '', gender: '', dob:'' }])


  const [payment, setPayment] = useState({});

  const unitCost = contact.flightClass?flight.classes.find(cls=>cls.className==contact.flightClass).fare:0
  const inputCount = (number)=> {
    let arr = []
    for (let i = 1; i <= number; i++) {
      let newpass = {firstName: '', lastName: '', gender: '', dob:'' }
      arr.push(newpass)
    }
    setInputFields(arr)
    }


  // const showSavedCards = () => {
  //         const x = document.getElementById("use_saved_card")
  //         const elt = document.getElementById("payment_fieldset")
  //         if (x.checked == true) {
  //             document.getElementById("saved_card_select").style.display = "block"
  //             elt.style.display = "none"
  //         } else {
  //             document.getElementById("saved_card_select").style.display = "none"
  //             elt.style.display = "block"
  //         }
  //     }

  const generateValidYears = () =>{
    const validYears = []
    const now = new Date();
    const currentYear = now.getFullYear();
    const lastValidYear = currentYear + 4;
    for (let i = currentYear; i <= lastValidYear; i++ ) {validYears.push({text: i});
    }
    return validYears
  }

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
    if (event.target.name == 'passengerCount' && event.target.value){
      inputCount(parseInt(event.target.value))
    }
  };

  const handlePaymentFormChange = (event) => {
    const { name, value } = event.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value
    }));
  };

  const handlePassengerFormChange = (index, event) => {
   let data = [...inputFields];
   data[index][event.target.name] = event.target.value;
   setInputFields(data);
}


  const handleSubmit = (event)=>{
    event.preventDefault()
    const data = {
      "flightNumber": flight.flightNumber,
      "passengerCount": contact.passengerCount,
      "flightClass": contact.flightClass,
      "contactFirstName": contact.contactFirstName,
      "contactLastName": contact.contactLastName,
      "contactPhone": contact.contactPhone,
      "contactEmail": contact.contactEmail,
      "passengers": inputFields,
      "paymentCard": payment
    }
    dispatch(bookTicket(data))
      .then(() => toast.success("Ticket purchased")
      )
      .then(() => navigate('/own-tickets'))
      .catch((error) => {
        toast.error("Error occurred. " + error);
      });
  }

  return (
    <main>
      <div className="shadow main-outer-div container">
        <h2 style={{display: "inline"}}>Book Your Ticket</h2>
          <Tabs className="Tabs shadow">
           <TabList>
             <Tab>Contact & Seat</Tab>
             <Tab>Passenger Details</Tab>
             <Tab>Payment Information</Tab>
           </TabList>
            <hr/>
            <TabPanel>
              <h3>Contact & Seat Information</h3>
              <form id="contact_form">
                <div className="row">
                  <TextInput
                    onChange={handleContactChange}
                    name='contactFirstName'
                    label='First Name'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={contact.contactFirstName}
                  />
                  <TextInput
                    onChange={handleContactChange}
                    name='contactLastName'
                    label='Last Name'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={contact.contactLastName}
                  />
                </div>
                <div className="row">
                  <TextInput
                    onChange={handleContactChange}
                    name='contactEmail'
                    label='Email'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={contact.contactEmail}
                  />
                  <TextInput
                    onChange={handleContactChange}
                    name='contactPhone'
                    label='Phone Number'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={contact.contactPhoneNumber}
                  />
                </div>

                <div className="row mt-2">
                  <SelectInput
                    onChange={handleContactChange}
                    name='flightClass'
                    display='text'
                    identifier='text'
                    label='Flight Class'
                    extraClasses='col-md-3 form-group'
                    defaultOption=''
                    options={[{'text': 'Economy'}, {'text': 'Premium'}, {'text': 'Business'}]}
                    value={contact.flightClass}
                  />
                  <TextInput
                    onChange={handleContactChange}
                    name='unitCost'
                    label='Unit Cost'
                    placeholder=''
                    extraClasses='col-md-3 form-group'
                    value={unitCost.toString()}
                    readonly={true}
                  />
                  <TextInput
                    onChange={handleContactChange}
                    name='passengerCount'
                    label='Number of seats'
                    placeholder=''
                    extraClasses='col-md-3 form-group'
                    value={contact.passengerCount.toString()}
                  />
                  <TextInput
                    onChange={handleContactChange}
                    name='totalCost'
                    label='Total cost'
                    placeholder=''
                    extraClasses='col-md-3 form-group'
                    value={(contact.passengerCount * unitCost).toString()}
                    readonly={true}
                  />
                </div>
              </form>
            </TabPanel>
           <TabPanel>
             <h3>Passenger(s) Details</h3>
              <form id="passenger_form">
                {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <div className='row mt-2'>
                <TextInput
                    onChange={event => handlePassengerFormChange(index, event)}
                    name='firstName'
                    label='First Name'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={input.firstName}
                  />
                <TextInput
                    onChange={event => handlePassengerFormChange(index, event)}
                    name='lastName'
                    label='Last Name'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={input.lastName}
                  />
              </div>
              <div className='row mt-2'>
                <TextInput
                    onChange={event => handlePassengerFormChange(index, event)}
                    name='gender'
                    label='Gender'
                    placeholder=''
                    extraClasses='col-md-6 form-group'
                    value={input.gender}
                  />
                <TextInput
                    onChange={event => handlePassengerFormChange(index, event)}
                    name='dob'
                    label='Date of birth'
                    placeholder='YYYY-MM-dd'
                    extraClasses='col-md-6 form-group'
                    value={input.dob}
                  />
              </div>
              <hr/>
            </div>
          )
        })}
              </form>
           </TabPanel>
           <TabPanel>
             <div className="container tab-pane pb-5">
             <h3>Payment Details</h3>
             <div className="card shadow-lg mx-auto">
               <div className="card-header text-center">
                 <h4>Book a flight</h4>
                 <small>Pay: NGN{(contact.passengerCount * unitCost).toString()}</small>
               </div>
               <div className="card-body container">
                 <form id="payment_form">
                   <fieldset id="payment_fieldset">
                     <TextInput
                      onChange={handlePaymentFormChange}
                      name='cardName'
                      label='Name on the card'
                      placeholder=''
                      value={payment.cardName}
                    />
                     <TextInput
                      onChange={handlePaymentFormChange}
                      name='number'
                      label='Card number'
                      placeholder=''
                      value={payment.number}
                    />
                     <div className="row">
                       <TextInput
                          onChange={handlePaymentFormChange}
                          name='cvv'
                          label='Card CVV'
                          extraClasses='col-md-6 form-group'
                          placeholder=''
                          value={payment.cvv}
                        />
                        <TextInput
                          onChange={handlePaymentFormChange}
                          name='cardPin'
                          label='Card PIN'
                          extraClasses='col-md-6 form-group'
                          placeholder=''
                          value={payment.cardPin}
                        />
                     </div>
                     <div className="form-group">
                       <label>Card Expiry: </label>
                       <div className="row">
                         <SelectInput
                            onChange={handlePaymentFormChange}
                            name='expiryMonth'
                            display='text'
                            identifier='text'
                            label=''
                            extraClasses='col-md-6 form-group'
                            defaultOption='Expiry Month'
                            options={[{'text': '01'}, {'text': '02'}, {'text': '03'}, {'text': '04'}, {'text': '05'}, {'text': '06'}, {'text': '07'}, {'text': '08'}, {'text': '09'}, {'text': '10'}, {'text': '11'}, {'text': '12'}]}
                            value={payment.expiryMonth}
                          />
                         <SelectInput
                            onChange={handlePaymentFormChange}
                            name='expiryYear'
                            display='text'
                            identifier='text'
                            label=''
                            extraClasses='col-md-6 form-group'
                            defaultOption='Expiry Year'
                            options={generateValidYears()}
                            value={payment.expiryYear}
                          />
                       </div>
                     </div>

                    {/* <Form.Check*/}
                    {/*  type='checkbox'*/}
                    {/*  id="save_card"*/}
                    {/*  label="Save Card"*/}
                    {/*/>*/}

                   </fieldset>
                   {/*<div className="form-check form-group">*/}
                   {/*  <input className="form-check-input" id="use_saved_card" name="save_card" onClick={showSavedCards}*/}
                   {/*         type="checkbox"/>*/}
                   {/*    <label className="form-check-label"> Use Save Card</label>*/}
                   {/*</div>*/}
                   {/*<div className="form-group" id="saved_card_select" style={{display: "none"}}>*/}
                   {/*  <select className="form-control">*/}
                   {/*    <option value="1234">MasterCard ending with 1234</option>*/}
                   {/*    <option value="2345">Visa Card ending with 2345</option>*/}
                   {/*  </select>*/}
                   {/*</div>*/}
                   <div>
                     <button className="btn float-start" type="btn" onClick={handleSubmit}>Submit</button>
                   </div>
                 </form>
               </div>
             </div>
             </div>
           </TabPanel>
         </Tabs>
      </div>
    </main>
  );
};

export default BookTicket
